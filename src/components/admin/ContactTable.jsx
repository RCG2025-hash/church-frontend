import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import ContactModal from "./ContactModal";

import {
  FaSearch,
  FaEye,
  FaTrash,
  FaSyncAlt,
} from "react-icons/fa";

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  // ===========================
  // Fetch Contacts on Load
  // ===========================

  useEffect(() => {
    fetchContacts();
  }, []);

  // ===========================
  // Search / Filter
  // ===========================

  useEffect(() => {
    const searchTerm = search.toLowerCase();

    const filtered = contacts.filter((contact) => {
      return (
        contact.name?.toLowerCase().includes(searchTerm) ||
        contact.email?.toLowerCase().includes(searchTerm) ||
        contact.message?.toLowerCase().includes(searchTerm) ||
        contact.status?.toLowerCase().includes(searchTerm)
      );
    });

    setFilteredContacts(filtered);
  }, [search, contacts]);

  // ===========================
  // Fetch Contacts
  // ===========================

  const fetchContacts = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        "/api/submissions/admin/contact"
      );

      // Your backend currently returns the array directly.
      const contactData = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      setContacts(contactData);
      setFilteredContacts(contactData);
    } catch (err) {
      console.error("Fetch contacts error:", err);

      toast.error(
        err.response?.data?.message ||
          "Unable to load contact messages."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // Delete Contact
  // ===========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(
        `/api/submissions/admin/contact/${id}`
      );

      // Refresh list
      await fetchContacts();

      // Close modal if deleted contact is open
      if (
        selectedContact &&
        selectedContact._id === id
      ) {
        setSelectedContact(null);
      }

      // SUCCESS TOAST
      toast.success(
        "Contact message deleted successfully."
      );
    } catch (err) {
      console.error("Delete contact error:", err);

      toast.error(
        err.response?.data?.message ||
          "Unable to delete message."
      );
    }
  };

  // ===========================
  // Update Contact Status
  // ===========================

  const handleStatusChange = async (
    id,
    status
  ) => {
    try {
      await API.patch(
        `/api/submissions/admin/contact/${id}/status`,
        { status }
      );

      // Refresh contacts
      await fetchContacts();

      // Update selected contact inside modal
      if (
        selectedContact &&
        selectedContact._id === id
      ) {
        setSelectedContact({
          ...selectedContact,
          status,
        });
      }

      // SUCCESS TOAST
      toast.success(
        `Message status changed to ${status}.`
      );
    } catch (err) {
      console.error(
        "Update status error:",
        err
      );

      toast.error(
        err.response?.data?.message ||
          "Unable to update status."
      );
    }
  };

  // ===========================
  // Refresh Contacts
  // ===========================

  const handleRefresh = async () => {
    await fetchContacts();

    toast.info(
      "Contact messages refreshed."
    );
  };

  // ===========================
  // Badge Color
  // ===========================

  const badgeColor = (status) => {
    switch (status) {
      case "replied":
        return "bg-green-100 text-green-700";

      case "closed":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  // ===========================
  // JSX
  // ===========================

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6">

        {/* ===========================
            Header
        =========================== */}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">

          <h2 className="text-2xl font-bold">
            Contact Messages
          </h2>

          <div className="flex items-center gap-3 w-full md:w-auto">

            {/* Search */}

            <div className="relative flex-1 md:flex-none">

              <FaSearch
                className="absolute left-3 top-3.5 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            {/* Refresh */}

            <button
              onClick={handleRefresh}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
              title="Refresh"
            >
              <FaSyncAlt
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />

              <span className="hidden sm:inline">
                Refresh
              </span>
            </button>

          </div>

        </div>

        {/* ===========================
            Loading
        =========================== */}

        {loading ? (

          <div className="text-center py-12 text-gray-600">

            <FaSyncAlt
              className="animate-spin mx-auto mb-3 text-blue-600"
              size={25}
            />

            Loading contact messages...

          </div>

        ) : (

          /* ===========================
             Table
          =========================== */

          <div className="overflow-x-auto">

            <table className="min-w-full border-collapse">

              <thead>

                <tr className="bg-gray-100">

                  <th className="text-left p-4">
                    Name
                  </th>

                  <th className="text-left p-4">
                    Email
                  </th>

                  <th className="text-left p-4">
                    Message
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>

                  <th className="text-left p-4">
                    Date
                  </th>

                  <th className="text-center p-4">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredContacts.length === 0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center py-10 text-gray-500"
                    >
                      {search
                        ? "No contact messages match your search."
                        : "No contact messages found."}
                    </td>

                  </tr>

                ) : (

                  filteredContacts.map(
                    (contact) => (

                      <tr
                        key={contact._id}
                        className="border-b hover:bg-gray-50 transition"
                      >

                        {/* Name */}

                        <td className="p-4 font-medium">
                          {contact.name}
                        </td>

                        {/* Email */}

                        <td className="p-4">
                          {contact.email}
                        </td>

                        {/* Message */}

                        <td className="p-4 max-w-sm">

                          <div
                            className="truncate"
                            title={contact.message}
                          >
                            {contact.message}
                          </div>

                        </td>

                        {/* Status */}

                        <td className="p-4">

                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${badgeColor(
                              contact.status
                            )}`}
                          >
                            {contact.status ||
                              "pending"}
                          </span>

                        </td>

                        {/* Date */}

                        <td className="p-4">

                          {contact.createdAt
                            ? new Date(
                                contact.createdAt
                              ).toLocaleDateString()
                            : "N/A"}

                        </td>

                        {/* Actions */}

                        <td className="p-4">

                          <div className="flex justify-center gap-4">

                            {/* View */}

                            <button
                              onClick={() =>
                                setSelectedContact(
                                  contact
                                )
                              }
                              className="text-blue-600 hover:text-blue-800 transition"
                              title="View Message"
                            >
                              <FaEye />
                            </button>

                            {/* Delete */}

                            <button
                              onClick={() =>
                                handleDelete(
                                  contact._id
                                )
                              }
                              className="text-red-600 hover:text-red-800 transition"
                              title="Delete Message"
                            >
                              <FaTrash />
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )

                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* ===========================
          Contact Modal
      =========================== */}

      {selectedContact && (

        <ContactModal
          contact={selectedContact}

          onClose={() =>
            setSelectedContact(null)
          }

          onDelete={handleDelete}

          onStatusChange={
            handleStatusChange
          }
        />

      )}

    </>
  );
};

export default ContactTable;