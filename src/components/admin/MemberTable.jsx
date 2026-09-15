import React, { useEffect, useMemo, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import MemberModal from "./MemberModal";

import {
  FaSearch,
  FaEye,
  FaTrash,
  FaEdit,
  FaSyncAlt,
} from "react-icons/fa";

const MemberTable = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);

  // ==========================================
  // Fetch New Member Applications
  // ==========================================
  useEffect(() => {
    fetchMembers();
  }, []);

  // ==========================================
  // Fetch Members
  // ==========================================
  const fetchMembers = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        "/api/submissions/admin/new-member"
      );

      console.log("NEW MEMBER API RESPONSE:", res.data);

      // ==========================================
      // Normalize API response into an array
      // ==========================================
      const responseData = res?.data;

      let memberList = [];

      if (Array.isArray(responseData)) {
        memberList = responseData;
      } else if (Array.isArray(responseData?.data)) {
        memberList = responseData.data;
      } else if (Array.isArray(responseData?.members)) {
        memberList = responseData.members;
      } else if (Array.isArray(responseData?.submissions)) {
        memberList = responseData.submissions;
      }

      console.log("MEMBER ARRAY:", memberList);
      console.log(
        "IS MEMBER ARRAY:",
        Array.isArray(memberList)
      );

      setMembers(memberList);
    } catch (err) {
      console.error(
        "FETCH MEMBERS ERROR:",
        err
      );

      setMembers([]);

      toast.error(
        err.response?.data?.message ||
          "Unable to load new member applications."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Filter Members
  // ==========================================
  const filteredMembers = useMemo(() => {
    // Always make sure members is an array
    const memberList = Array.isArray(members)
      ? members
      : [];

    const searchTerm = search
      .toLowerCase()
      .trim();

    // If search box is empty, return everything
    if (!searchTerm) {
      return memberList;
    }

    return memberList.filter((member) => {
      const name = String(
        member?.name || ""
      ).toLowerCase();

      const email = String(
        member?.email || ""
      ).toLowerCase();

      const phoneNumber = String(
        member?.phoneNumber || ""
      ).toLowerCase();

      const address = String(
        member?.address || ""
      ).toLowerCase();

      const gender = String(
        member?.gender || ""
      ).toLowerCase();

      const howDidYouHear = String(
        member?.howDidYouHear || ""
      ).toLowerCase();

      const spiritualJourneyStage = String(
        member?.spiritualJourneyStage || ""
      ).toLowerCase();

      return (
        name.includes(searchTerm) ||
        email.includes(searchTerm) ||
        phoneNumber.includes(searchTerm) ||
        address.includes(searchTerm) ||
        gender.includes(searchTerm) ||
        howDidYouHear.includes(searchTerm) ||
        spiritualJourneyStage.includes(searchTerm)
      );
    });
  }, [members, search]);

  // ==========================================
  // Make Absolutely Sure We Have an Array
  // ==========================================
  const membersToDisplay = Array.isArray(
    filteredMembers
  )
    ? filteredMembers
    : [];

  // ==========================================
  // Debugging Logs
  // ==========================================
  console.log(
    "FILTERED MEMBERS:",
    filteredMembers
  );

  console.log(
    "MEMBERS TO DISPLAY:",
    membersToDisplay
  );

  console.log(
    "IS MEMBERS ARRAY:",
    Array.isArray(membersToDisplay)
  );

  // ==========================================
  // Delete Member Application
  // ==========================================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this new member application permanently?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await API.delete(
        `/api/submissions/admin/new-member/${id}`
      );

      toast.success(
        "New member application deleted successfully."
      );

      // Remove deleted member from local state
      setMembers((previousMembers) => {
        if (!Array.isArray(previousMembers)) {
          return [];
        }

        return previousMembers.filter(
          (member) => member._id !== id
        );
      });

      // Close modal if the deleted member was open
      if (
        selectedMember &&
        selectedMember._id === id
      ) {
        setSelectedMember(null);
      }
    } catch (err) {
      console.error(
        "DELETE MEMBER ERROR:",
        err
      );

      toast.error(
        err.response?.data?.message ||
          "Unable to delete member application."
      );
    }
  };

  // ==========================================
  // View Member
  // ==========================================
  const handleView = (member) => {
    setSelectedMember(member);
  };

  // ==========================================
  // Refresh Members
  // ==========================================
  const handleRefresh = async () => {
    await fetchMembers();

    toast.info(
      "New member applications refreshed."
    );
  };

  // ==========================================
  // Render
  // ==========================================
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      {/* ==========================================
          Header
      ========================================== */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

        <h2 className="text-2xl font-bold">
          New Member Applications
        </h2>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />

            <input
              type="text"
              placeholder="Search members..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          {/* Refresh */}
          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <FaSyncAlt
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            {loading
              ? "Loading..."
              : "Refresh"}
          </button>
        </div>
      </div>

      {/* ==========================================
          Loading State
      ========================================== */}
      {loading ? (
        <div className="text-center py-12">

          <FaSyncAlt className="animate-spin text-blue-600 text-3xl mx-auto mb-3" />

          <p className="text-gray-500">
            Loading new member applications...
          </p>

        </div>
      ) : (

        /* ==========================================
           Table
        ========================================== */
        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead>
              <tr className="bg-gray-100">

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Phone
                </th>

                <th className="p-4 text-left">
                  Address
                </th>

                <th className="p-4 text-left">
                  Gender
                </th>

                <th className="p-4 text-left">
                  Journey Stage
                </th>

                <th className="p-4 text-left">
                  Registered
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {/* ==========================================
                  Empty State
              ========================================== */}
              {membersToDisplay.length === 0 ? (

                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-10 text-gray-500"
                  >
                    {search
                      ? "No new member applications match your search."
                      : "No new member applications found."}
                  </td>
                </tr>

              ) : (

                /* ==========================================
                   Member Rows
                ========================================== */
                membersToDisplay.map((member) => (

                  <tr
                    key={member._id}
                    className="border-b hover:bg-gray-50"
                  >

                    {/* Name */}
                    <td className="p-4 font-medium">
                      {member?.name || "N/A"}
                    </td>

                    {/* Email */}
                    <td className="p-4">
                      {member?.email || "N/A"}
                    </td>

                    {/* Phone */}
                    <td className="p-4">
                      {member?.phoneNumber ||
                        "N/A"}
                    </td>

                    {/* Address */}
                    <td className="p-4">
                      {member?.address ||
                        "N/A"}
                    </td>

                    {/* Gender */}
                    <td className="p-4">
                      {member?.gender ||
                        "N/A"}
                    </td>

                    {/* Journey Stage */}
                    <td className="p-4">
                      {member?.spiritualJourneyStage ||
                        "N/A"}
                    </td>

                    {/* Registered */}
                    <td className="p-4">
                      {member?.createdAt
                        ? new Date(
                            member.createdAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>

                    {/* Actions */}
                    <td className="p-4">

                      <div className="flex justify-center gap-4">

                        {/* View */}
                        <button
                          type="button"
                          onClick={() =>
                            handleView(member)
                          }
                          className="text-blue-600 hover:text-blue-800"
                          title="View"
                        >
                          <FaEye />
                        </button>

                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() =>
                            handleView(member)
                          }
                          className="text-green-600 hover:text-green-800"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              member._id
                            )
                          }
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))
              )}

            </tbody>
          </table>
        </div>
      )}

      {/* ==========================================
          Member Modal
      ========================================== */}
      {selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={() =>
            setSelectedMember(null)
          }
          onDelete={handleDelete}
          refreshMembers={fetchMembers}
        />
      )}

    </div>
  );
};

export default MemberTable;