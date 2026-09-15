import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSave,
  FaTrash,
} from "react-icons/fa";

const MemberModal = ({
  member,
  onClose,
  onDelete,
  refreshMembers,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    gender: "",
    howDidYouHear: "",
    spiritualJourneyStage: "",
    prayerRequest: "",
  });

  const [saving, setSaving] = useState(false);

  // ===========================
  // Load Member Data
  // ===========================

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || "",
        email: member.email || "",
        phoneNumber: member.phoneNumber || "",
        address: member.address || "",
        gender: member.gender || "",
        howDidYouHear: member.howDidYouHear || "",
        spiritualJourneyStage:
          member.spiritualJourneyStage || "",
        prayerRequest: member.prayerRequest || "",
      });
    }
  }, [member]);

  if (!member) return null;

  // ===========================
  // Handle Input Changes
  // ===========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===========================
  // Save Member
  // ===========================

  const handleSave = async () => {
    try {
      setSaving(true);

      await API.put(
        `/api/submissions/admin/new-member/${member._id}`,
        formData
      );

      toast.success(
        "Member updated successfully."
      );

      await refreshMembers();

      onClose();

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
        "Failed to update member."
      );

    } finally {
      setSaving(false);
    }
  };

  // ===========================
  // Delete Member
  // ===========================

  const handleDeleteClick = () => {
    onDelete(member._id);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-[850px] max-w-[95%] max-h-[90vh] overflow-y-auto">

        {/* ===========================
            Header
        =========================== */}

        <div className="flex justify-between items-center border-b p-5">

          <h2 className="text-2xl font-bold">
            Member Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 transition"
            title="Close"
          >
            <FaTimes size={22} />
          </button>

        </div>

        {/* ===========================
            Body
        =========================== */}

        <div className="p-6 space-y-5">

          {/* Name + Email */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Full Name */}

            <div>

              <label className="font-semibold flex items-center gap-2 mb-2">
                <FaUser />
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Email */}

            <div>

              <label className="font-semibold flex items-center gap-2 mb-2">
                <FaEnvelope />
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Phone */}

            <div>

              <label className="font-semibold flex items-center gap-2 mb-2">
                <FaPhone />
                Phone Number
              </label>

              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Gender */}

            <div>

              <label className="font-semibold mb-2 block">
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Prefer not to say">
                  Prefer not to say
                </option>

              </select>

            </div>

          </div>

          {/* ===========================
              Address
          =========================== */}

          <div>

            <label className="font-semibold flex items-center gap-2 mb-2">
              <FaMapMarkerAlt />
              Address
            </label>

            <textarea
              rows="3"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* ===========================
              How Did You Hear + Spiritual Journey
          =========================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* How Did You Hear */}

            <div>

              <label className="font-semibold mb-2 block">
                How did you hear about us?
              </label>

              <input
                type="text"
                name="howDidYouHear"
                value={formData.howDidYouHear}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Spiritual Journey */}

            <div>

              <label className="font-semibold mb-2 block">
                Spiritual Journey
              </label>

              <input
                type="text"
                name="spiritualJourneyStage"
                value={formData.spiritualJourneyStage}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

          </div>

          {/* ===========================
              Prayer Request
          =========================== */}

          <div>

            <label className="font-semibold mb-2 block">
              Prayer Request
            </label>

            <textarea
              rows="4"
              name="prayerRequest"
              value={formData.prayerRequest}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* ===========================
              Registration Date
          =========================== */}

          <div className="border rounded-lg p-4 bg-gray-50">

            <p className="font-semibold flex items-center gap-2">

              <FaCalendarAlt />

              Registered On

            </p>

            <p className="mt-2 text-gray-700">

              {member.createdAt
                ? new Date(
                    member.createdAt
                  ).toLocaleString()
                : "N/A"}

            </p>

          </div>

        </div>

        {/* ===========================
            Footer
        =========================== */}

        <div className="border-t p-5 flex justify-between">

          {/* Delete */}

          <button
            onClick={handleDeleteClick}
            disabled={saving}
            className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition"
          >

            <FaTrash />

            Delete

          </button>

          {/* Right Side */}

          <div className="flex gap-3">

            {/* Close */}

            <button
              onClick={onClose}
              disabled={saving}
              className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-5 py-2 rounded-lg transition"
            >
              Close
            </button>

            {/* Save */}

            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition"
            >

              <FaSave />

              {saving
                ? "Saving..."
                : "Save Changes"}

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default MemberModal;