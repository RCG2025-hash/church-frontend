import React from "react";
import {
  FaTimes,
  FaEnvelope,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";

const ContactModal = ({
  contact,
  onClose,
  onDelete,
  onStatusChange,
}) => {
  if (!contact) return null;

  // ===========================
  // Status Color
  // ===========================

  const getStatusColor = (status) => {
    switch (status) {
      case "replied":
        return "bg-green-100 text-green-700";

      case "closed":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const currentStatus = contact.status || "pending";

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

        {/* ===========================
            Header
        =========================== */}

        <div className="flex justify-between items-center border-b px-6 py-4 sticky top-0 bg-white">

          <h2 className="text-2xl font-bold text-gray-800">
            Contact Details
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 transition"
            title="Close"
          >
            <FaTimes size={24} />
          </button>

        </div>

        {/* ===========================
            Body
        =========================== */}

        <div className="p-6 space-y-6">

          {/* Name & Email */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name */}

            <div>

              <p className="flex items-center gap-2 font-semibold text-gray-700">
                <FaUser />
                Name
              </p>

              <p className="mt-2 text-gray-900">
                {contact.name || "N/A"}
              </p>

            </div>

            {/* Email */}

            <div>

              <p className="flex items-center gap-2 font-semibold text-gray-700">
                <FaEnvelope />
                Email
              </p>

              <p className="mt-2 break-all text-gray-900">
                {contact.email || "N/A"}
              </p>

            </div>

          </div>

          {/* ===========================
              Message
          =========================== */}

          <div>

            <p className="font-semibold text-gray-700">
              Message
            </p>

            <div className="mt-2 bg-gray-100 rounded-lg p-4 whitespace-pre-wrap max-h-60 overflow-y-auto text-gray-800">

              {contact.message || "No message provided."}

            </div>

          </div>

          {/* ===========================
              Status & Date
          =========================== */}

          <div className="flex flex-col md:flex-row md:justify-between gap-6">

            {/* Status */}

            <div>

              <p className="font-semibold text-gray-700">
                Status
              </p>

              <span
                className={`inline-block mt-2 px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                  currentStatus
                )}`}
              >
                {currentStatus}
              </span>

            </div>

            {/* Date */}

            <div>

              <p className="flex items-center gap-2 font-semibold text-gray-700">
                <FaCalendarAlt />
                Date Submitted
              </p>

              <p className="mt-2 text-gray-900">

                {contact.createdAt
                  ? new Date(
                      contact.createdAt
                    ).toLocaleString()
                  : "N/A"}

              </p>

            </div>

          </div>

        </div>

        {/* ===========================
            Footer
        =========================== */}

        <div className="border-t px-6 py-4 flex flex-col md:flex-row md:justify-between gap-4 bg-gray-50">

          {/* Status Actions */}

          <div className="flex flex-wrap gap-3">

            {/* Mark Replied */}

            <button
              type="button"
              onClick={() =>
                onStatusChange(
                  contact._id,
                  "replied"
                )
              }
              disabled={currentStatus === "replied"}
              className={`px-5 py-2 rounded-lg text-white transition ${
                currentStatus === "replied"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {currentStatus === "replied"
                ? "Already Replied"
                : "Mark Replied"}
            </button>

            {/* Close Message */}

            <button
              type="button"
              onClick={() =>
                onStatusChange(
                  contact._id,
                  "closed"
                )
              }
              disabled={currentStatus === "closed"}
              className={`px-5 py-2 rounded-lg text-white transition ${
                currentStatus === "closed"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-amber-600 hover:bg-amber-700"
              }`}
            >
              {currentStatus === "closed"
                ? "Already Closed"
                : "Close Message"}
            </button>

          </div>

          {/* Delete & Close */}

          <div className="flex flex-wrap gap-3">

            {/* Delete */}

            <button
              type="button"
              onClick={() =>
                onDelete(contact._id)
              }
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
            >
              Delete
            </button>

            {/* Close Modal */}

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg transition"
            >
              Close
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ContactModal;