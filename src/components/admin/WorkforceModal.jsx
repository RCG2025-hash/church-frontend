import React, { useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUsers,
  FaComment,
  FaCalendarAlt,
  FaSave,
  FaTrash,
} from "react-icons/fa";

const WorkforceModal = ({
  workforce,
  onClose,
  onDelete,
  refreshWorkforce,
}) => {
  const [formData, setFormData] = useState({
    name: workforce?.name || "",
    email: workforce?.email || "",
    phoneNumber: workforce?.phoneNumber || "",
    department: workforce?.department || "",
    message: workforce?.message || "",
  });

  const [saving, setSaving] = useState(false);

  // ==========================
  // Handle Input Changes
  // ==========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================
  // Save Workforce Application
  // ==========================

  const handleSave = async () => {
    if (!workforce?._id) {
      toast.error("Workforce application not found.");
      return;
    }

    try {
      setSaving(true);

      await API.put(
        `/api/submissions/admin/workforce/${workforce._id}`,
        formData
      );

      toast.success(
        "Workforce application updated successfully."
      );

      await refreshWorkforce();

      onClose();
    } catch (err) {
      console.error("Update workforce error:", err);

      toast.error(
        err.response?.data?.message ||
          "Unable to update workforce application."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================
  // Handle Delete
  // ==========================

  const handleDelete = () => {
    if (!workforce?._id) {
      toast.error("Workforce application not found.");
      return;
    }

    onDelete(workforce._id);
  };

  // ==========================
  // If No Workforce
  // ==========================

  if (!workforce) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-xl shadow-xl w-[750px] max-w-[95%] max-h-[90vh] overflow-y-auto">

        {/* ==========================
            Header
        ========================== */}

        <div className="flex justify-between items-center border-b p-5">

          <h2 className="text-2xl font-bold">
            Workforce Application
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 transition"
            title="Close"
          >
            <FaTimes size={22} />
          </button>

        </div>

        {/* ==========================
            Body
        ========================== */}

        <div className="p-6 space-y-6">

          {/* Name & Email */}

          <div className="grid md:grid-cols-2 gap-6">

            {/* Name */}

            <div>
              <label className="font-semibold flex items-center gap-2 mb-2">
                <FaUser />
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

          {/* Phone & Department */}

          <div className="grid md:grid-cols-2 gap-6">

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
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Department */}

            <div>
              <label className="font-semibold flex items-center gap-2 mb-2">
                <FaUsers />
                Department
              </label>

              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

          {/* Message */}

          <div>

            <label className="font-semibold flex items-center gap-2 mb-2">
              <FaComment />
              Message
            </label>

            <textarea
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Submitted Date */}

          <div className="flex justify-between">

            <div>

              <p className="font-semibold flex items-center gap-2">
                <FaCalendarAlt />
                Submitted
              </p>

              <p className="mt-2 text-gray-700">

                {workforce.createdAt
                  ? new Date(
                      workforce.createdAt
                    ).toLocaleString()
                  : "N/A"}

              </p>

            </div>

          </div>

        </div>

        {/* ==========================
            Footer
        ========================== */}

        <div className="border-t p-5 flex justify-between">

          {/* Delete */}

          <button
            type="button"
            onClick={handleDelete}
            disabled={saving}
            className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition"
          >
            <FaTrash />
            Delete
          </button>

          {/* Right Buttons */}

          <div className="flex gap-3">

            {/* Close */}

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="bg-gray-700 hover:bg-gray-800 disabled:bg-gray-400 text-white px-5 py-2 rounded-lg transition"
            >
              Close
            </button>

            {/* Save */}

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition"
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

export default WorkforceModal;