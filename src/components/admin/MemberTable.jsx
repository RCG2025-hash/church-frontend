
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
  FaUsers,
  FaUserPlus,
  FaTimes,
  FaInbox,
  FaCalendarAlt,
} from "react-icons/fa";

const MemberTable = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);

      const res = await API.get("/api/submissions/admin/new-member");
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

      setMembers(memberList);
    } catch (err) {
      console.error("FETCH MEMBERS ERROR:", err);
      setMembers([]);

      toast.error(
        err.response?.data?.message ||
          "Unable to load new member applications."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    if (!searchTerm) return members;

    return members.filter((member) =>
      [
        member?.name,
        member?.email,
        member?.phoneNumber,
        member?.address,
        member?.gender,
        member?.howDidYouHear,
        member?.spiritualJourneyStage,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(searchTerm)
      )
    );
  }, [members, search]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this new member application permanently?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/api/submissions/admin/new-member/${id}`);

      setMembers((previous) =>
        previous.filter((member) => member._id !== id)
      );

      if (selectedMember?._id === id) {
        setSelectedMember(null);
      }

      toast.success(
        "New member application deleted successfully."
      );
    } catch (err) {
      console.error("DELETE MEMBER ERROR:", err);

      toast.error(
        err.response?.data?.message ||
          "Unable to delete member application."
      );
    }
  };

  const handleRefresh = async () => {
    await fetchMembers();
    toast.info("New member applications refreshed.");
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "N/A";

    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = (name) => {
    if (!name?.trim()) return "?";

    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-100 p-5 sm:p-6 lg:p-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1 w-7 rounded-full bg-red-600" />
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">
                Membership
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0b1f46]">
                <FaUsers className="text-lg" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#0b1f46] sm:text-2xl">
                  New Member Applications
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Review and manage people joining your church.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative min-w-0 flex-1 sm:min-w-[240px]">
              <FaSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="search"
                aria-label="Search member applications"
                placeholder="Search members..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0b1f46] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#163567] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaSyncAlt className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Total Applications
              </p>
              <p className="mt-1 text-2xl font-bold text-[#0b1f46]">
                {members.length.toLocaleString("en-NG")}
              </p>
            </div>

            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-[#0b1f46]">
              <FaUserPlus />
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Matching Results
              </p>
              <p className="mt-1 text-2xl font-bold text-red-600">
                {filteredMembers.length.toLocaleString("en-NG")}
              </p>
            </div>

            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <FaSearch />
            </span>
          </div>
        </div>
      </div>

      {/* Results heading */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-4 sm:px-6">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-bold text-[#0b1f46]">
            {filteredMembers.length}
          </span>{" "}
          of{" "}
          <span className="font-bold text-[#0b1f46]">
            {members.length}
          </span>{" "}
          applications
        </p>

        {search && (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
            Search active
          </span>
        )}
      </div>

      {/* Loading */}
      {loading ? (
        <div className="px-6 py-16 text-center">
          <FaSyncAlt className="mx-auto mb-4 animate-spin text-2xl text-[#0b1f46]" />
          <p className="font-semibold text-slate-700">
            Loading member applications...
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Please wait while we retrieve the records.
          </p>
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            {search ? (
              <FaSearch className="text-2xl" />
            ) : (
              <FaInbox className="text-2xl" />
            )}
          </div>

          <h3 className="mt-4 font-bold text-[#0b1f46]">
            {search
              ? "No matching applications"
              : "No member applications yet"}
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
            {search
              ? "Try another name, email, phone number, address, or journey stage."
              : "New member registrations from your church website will appear here."}
          </p>

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-4 rounded-lg px-4 py-2 text-sm font-semibold text-[#0b1f46] hover:bg-blue-50"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse text-left">
            <thead>
              <tr className="border-y border-slate-100 bg-slate-50">
                {[
                  "Member",
                  "Phone",
                  "Address",
                  "Gender",
                  "Journey Stage",
                  "Registered",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className={`px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 ${
                      heading === "Actions" ? "text-center" : ""
                    }`}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredMembers.map((member) => (
                <tr
                  key={member._id}
                  className="transition-colors hover:bg-blue-50/40"
                >
                  {/* Member identity */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b1f46] text-sm font-bold text-white">
                        {getInitials(member?.name)}
                      </div>

                      <div className="min-w-0">
                        <p className="max-w-[190px] truncate text-sm font-bold text-[#0b1f46]">
                          {member?.name || "Unnamed member"}
                        </p>
                        <p className="mt-1 max-w-[210px] truncate text-xs text-slate-500">
                          {member?.email || "No email provided"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                    {member?.phoneNumber || "N/A"}
                  </td>

                  <td className="px-5 py-4">
                    <p
                      className="max-w-[190px] truncate text-sm text-slate-600"
                      title={member?.address || ""}
                    >
                      {member?.address || "N/A"}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-700">
                      {member?.gender || "N/A"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className="inline-block max-w-[190px] truncate rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#0b1f46]"
                      title={member?.spiritualJourneyStage || ""}
                    >
                      {member?.spiritualJourneyStage || "N/A"}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <FaCalendarAlt className="text-slate-400" />
                      {formatDate(member?.createdAt)}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedMember(member)}
                        aria-label={`View ${member?.name || "member"}`}
                        title="View member"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-[#0b1f46] transition hover:border-blue-200 hover:bg-[#0b1f46] hover:text-white"
                      >
                        <FaEye />
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedMember(member)}
                        aria-label={`Edit ${member?.name || "member"}`}
                        title="Edit member"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-700 transition hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
                      >
                        <FaEdit />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(member._id)}
                        aria-label={`Delete ${member?.name || "member"}`}
                        title="Delete application"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 transition hover:border-red-600 hover:bg-red-600 hover:text-white"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      {!loading && members.length > 0 && (
        <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-xs text-slate-500">
            Church administration · Membership management
          </p>
          <p className="text-xs font-medium text-slate-500">
            {filteredMembers.length} result
            {filteredMembers.length === 1 ? "" : "s"}
          </p>
        </div>
      )}

      {/* Member modal */}
      {selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          onDelete={handleDelete}
          refreshMembers={fetchMembers}
        />
      )}
    </section>
  );
};

export default MemberTable;