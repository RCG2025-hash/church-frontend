
import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import ContactModal from "./ContactModal";

import {
  FaSearch,
  FaEye,
  FaTrash,
  FaSyncAlt,
  FaEnvelope,
  FaInbox,
  FaTimes,
  FaCheckCircle,
  FaClock,
  FaLock,
} from "react-icons/fa";

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const searchTerm = search.toLowerCase().trim();

    const filtered = contacts.filter((contact) =>
      [
        contact.name,
        contact.email,
        contact.message,
        contact.status,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(searchTerm)
      )
    );

    setFilteredContacts(filtered);
  }, [search, contacts]);

  const fetchContacts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/api/submissions/admin/contact");

      const contactData = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

      setContacts(contactData);
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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/api/submissions/admin/contact/${id}`);

      if (selectedContact?._id === id) {
        setSelectedContact(null);
      }

      await fetchContacts();

      toast.success("Contact message deleted successfully.");
    } catch (err) {
      console.error("Delete contact error:", err);

      toast.error(
        err.response?.data?.message ||
          "Unable to delete message."
      );
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await API.patch(
        `/api/submissions/admin/contact/${id}/status`,
        { status }
      );

      setSelectedContact((previous) =>
        previous?._id === id
          ? { ...previous, status }
          : previous
      );

      await fetchContacts();

      toast.success(`Message status changed to ${status}.`);
    } catch (err) {
      console.error("Update status error:", err);

      toast.error(
        err.response?.data?.message ||
          "Unable to update status."
      );
    }
  };

  const handleRefresh = async () => {
    await fetchContacts();
    toast.info("Contact messages refreshed.");
  };

  const getStatusDetails = (status) => {
    switch ((status || "pending").toLowerCase()) {
      case "replied":
        return {
          label: "Replied",
          className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
          icon: FaCheckCircle,
        };

      case "closed":
        return {
          label: "Closed",
          className: "bg-red-50 text-red-700 ring-red-600/20",
          icon: FaLock,
        };

      default:
        return {
          label: "Pending",
          className: "bg-amber-50 text-amber-700 ring-amber-600/20",
          icon: FaClock,
        };
    }
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

  const pendingCount = contacts.filter(
    (contact) => (contact.status || "pending").toLowerCase() === "pending"
  ).length;

  const repliedCount = contacts.filter(
    (contact) => (contact.status || "").toLowerCase() === "replied"
  ).length;

  const closedCount = contacts.filter(
    (contact) => (contact.status || "").toLowerCase() === "closed"
  ).length;

  return (
    <>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-100 p-5 sm:p-6 lg:p-7">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-1 w-7 rounded-full bg-red-600" />
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">
                  Communication
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0b1f46]">
                  <FaEnvelope className="text-lg" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#0b1f46] sm:text-2xl">
                    Contact Messages
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Review and manage messages from your website.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0 flex-1 sm:min-w-[240px]">
                <FaSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="search"
                  aria-label="Search contact messages"
                  placeholder="Search messages..."
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

          {/* Summary */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Pending
                </p>
                <p className="mt-1 text-2xl font-bold text-amber-600">
                  {pendingCount.toLocaleString("en-NG")}
                </p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <FaClock />
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Replied
                </p>
                <p className="mt-1 text-2xl font-bold text-emerald-600">
                  {repliedCount.toLocaleString("en-NG")}
                </p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <FaCheckCircle />
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Closed
                </p>
                <p className="mt-1 text-2xl font-bold text-red-600">
                  {closedCount.toLocaleString("en-NG")}
                </p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-700">
                <FaLock />
              </span>
            </div>
          </div>
        </div>

        {/* Table heading */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-4 sm:px-6">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-bold text-[#0b1f46]">
              {filteredContacts.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-[#0b1f46]">
              {contacts.length}
            </span>{" "}
            messages
          </p>

          {search && (
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
              Search active
            </span>
          )}
        </div>

        {/* Table */}
        {loading ? (
          <div className="px-6 py-16 text-center">
            <FaSyncAlt className="mx-auto mb-4 animate-spin text-2xl text-[#0b1f46]" />
            <p className="font-semibold text-slate-700">
              Loading contact messages...
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Please wait while we retrieve your messages.
            </p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <FaInbox className="text-2xl" />
            </div>

            <h3 className="mt-4 font-bold text-[#0b1f46]">
              {search ? "No matching messages" : "No contact messages yet"}
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              {search
                ? "Try another name, email address, message, or status."
                : "Messages submitted through your church website will appear here."}
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
            <table className="w-full min-w-[850px] border-collapse text-left">
              <thead>
                <tr className="border-y border-slate-100 bg-slate-50">
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 sm:px-6">
                    Contact
                  </th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Message
                  </th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Date received
                  </th>
                  <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredContacts.map((contact) => {
                  const status = getStatusDetails(contact.status);
                  const StatusIcon = status.icon;

                  return (
                    <tr
                      key={contact._id}
                      className="transition-colors hover:bg-blue-50/40"
                    >
                      <td className="px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b1f46] text-sm font-bold text-white">
                            {(contact.name || "?")
                              .trim()
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-[190px] truncate text-sm font-bold text-[#0b1f46]">
                              {contact.name || "Unnamed contact"}
                            </p>
                            <p className="mt-1 max-w-[190px] truncate text-xs text-slate-500">
                              {contact.email || "No email provided"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p
                          className="max-w-[300px] truncate text-sm leading-6 text-slate-600"
                          title={contact.message || ""}
                        >
                          {contact.message || "No message provided"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold capitalize ring-1 ring-inset ${status.className}`}
                        >
                          <StatusIcon className="text-[10px]" />
                          {status.label}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                        {formatDate(contact.createdAt)}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedContact(contact)}
                            aria-label={`View message from ${contact.name || "contact"}`}
                            title="View message"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-[#0b1f46] transition hover:border-blue-200 hover:bg-[#0b1f46] hover:text-white"
                          >
                            <FaEye />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(contact._id)}
                            aria-label={`Delete message from ${contact.name || "contact"}`}
                            title="Delete message"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 transition hover:border-red-600 hover:bg-red-600 hover:text-white"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        {!loading && contacts.length > 0 && (
          <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-xs text-slate-500">
              Church administration · Contact management
            </p>
            <p className="text-xs font-medium text-slate-500">
              {filteredContacts.length} result
              {filteredContacts.length === 1 ? "" : "s"}
            </p>
          </div>
        )}
      </section>

      {selectedContact && (
        <ContactModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      )}
    </>
  );
};

export default ContactTable;