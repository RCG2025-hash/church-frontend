
import React, { useEffect, useMemo, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import WorkforceModal from "./WorkforceModal";

import {
  FaSearch,
  FaEye,
  FaTrash,
  FaEdit,
  FaSyncAlt,
  FaUsers,
  FaUserPlus,
  FaInbox,
  FaTimes,
  FaBuilding,
} from "react-icons/fa";

const WorkforceTable = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedWorker, setSelectedWorker] = useState(null);

  useEffect(() => {
    fetchWorkers();
  }, []);

  // Fetch workforce applications
  const fetchWorkers = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        "/api/submissions/admin/workforce"
      );

      const responseData = res?.data;
      let workerList = [];

      if (Array.isArray(responseData)) {
        workerList = responseData;
      } else if (Array.isArray(responseData?.data)) {
        workerList = responseData.data;
      } else if (Array.isArray(responseData?.workforce)) {
        workerList = responseData.workforce;
      }

      setWorkers(workerList);
    } catch (err) {
      console.error("FETCH WORKFORCE ERROR:", err);
      setWorkers([]);

      toast.error(
        err.response?.data?.message ||
          "Unable to load workforce applications."
      );
    } finally {
      setLoading(false);
    }
  };

  // Filter workforce applications
  const filteredWorkers = useMemo(() => {
    const workerList = Array.isArray(workers) ? workers : [];
    const searchTerm = search.toLowerCase().trim();

    if (!searchTerm) return workerList;

    return workerList.filter((worker) => {
      const name = String(worker?.name || "").toLowerCase();
      const email = String(worker?.email || "").toLowerCase();
      const phone = String(worker?.phoneNumber || "").toLowerCase();
      const department = String(worker?.department || "").toLowerCase();

      return (
        name.includes(searchTerm) ||
        email.includes(searchTerm) ||
        phone.includes(searchTerm) ||
        department.includes(searchTerm)
      );
    });
  }, [workers, search]);

  const workersToDisplay = Array.isArray(filteredWorkers)
    ? filteredWorkers
    : [];

  // Generate initials for the member avatar
  const getInitials = (name) => {
    if (!name) return "W";

    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Format registration date
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

  // Delete workforce application
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this workforce application permanently?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(
        `/api/submissions/admin/workforce/${id}`
      );

      setWorkers((previousWorkers) =>
        Array.isArray(previousWorkers)
          ? previousWorkers.filter((worker) => worker._id !== id)
          : []
      );

      if (selectedWorker?._id === id) {
        setSelectedWorker(null);
      }

      toast.success(
        "Workforce application deleted successfully."
      );
    } catch (err) {
      console.error("DELETE WORKFORCE ERROR:", err);

      toast.error(
        err.response?.data?.message ||
          "Unable to delete application."
      );
    }
  };

  // Refresh applications
  const handleRefresh = async () => {
    await fetchWorkers();
    toast.info("Workforce applications refreshed.");
  };

  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-7">

      {/* Header */}
      <div className="mb-7 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-7 w-1 rounded-full bg-red-600" />
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">
              Administration
            </p>
          </div>

          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            Workforce Applications
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Review and manage church workforce registrations.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative w-full sm:min-w-64">
            <FaSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400" />

            <input
              type="text"
              placeholder="Search name, email, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-500/10 sm:w-72"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-red-600"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Refresh */}
          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#101d3a] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1b2d52] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaSyncAlt className={loading ? "animate-spin" : ""} />
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#101d3a] text-lg text-white">
            <FaUsers />
          </div>

          <div className="min-w-0">
            <p className="text-sm text-slate-500">
              Total Applications
            </p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">
              {workers.length.toLocaleString("en-NG")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-lg text-red-600">
            <FaUserPlus />
          </div>

          <div className="min-w-0">
            <p className="text-sm text-slate-500">
              Matching Results
            </p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">
              {workersToDisplay.length.toLocaleString("en-NG")}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-left">
            <thead>
              <tr className="bg-[#101d3a] text-xs uppercase tracking-wider text-white">
                <th className="px-5 py-4 font-semibold">Worker</th>
                <th className="px-5 py-4 font-semibold">Phone</th>
                <th className="px-5 py-4 font-semibold">Department</th>
                <th className="px-5 py-4 font-semibold">Registered</th>
                <th className="px-5 py-4 text-center font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-5 py-16 text-center">
                    <FaSyncAlt className="mx-auto mb-3 animate-spin text-2xl text-red-600" />
                    <p className="text-sm text-slate-500">
                      Loading workforce applications...
                    </p>
                  </td>
                </tr>
              ) : workersToDisplay.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-5 py-16 text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-400">
                      <FaInbox />
                    </div>

                    <p className="font-semibold text-slate-700">
                      {search
                        ? "No matching applications"
                        : "No workforce applications yet"}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {search
                        ? "Try another name, email, phone number, or department."
                        : "New workforce registrations will appear here."}
                    </p>

                    {search && (
                      <button
                        type="button"
                        onClick={() => setSearch("")}
                        className="mt-4 text-sm font-semibold text-red-600 hover:text-red-700"
                      >
                        Clear search
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                workersToDisplay.map((worker) => (
                  <tr
                    key={worker._id}
                    className="group transition-colors hover:bg-slate-50"
                  >
                    {/* Worker details */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#101d3a] text-xs font-bold text-white ring-4 ring-slate-100">
                          {getInitials(worker?.name)}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-800">
                            {worker?.name || "N/A"}
                          </p>
                          <p className="mt-1 max-w-56 truncate text-xs text-slate-500">
                            {worker?.email || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {worker?.phoneNumber || "N/A"}
                    </td>

                    {/* Department */}
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
                        <FaBuilding className="text-red-500" />
                        {worker?.department || "N/A"}
                      </span>
                    </td>

                    {/* Registration date */}
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {formatDate(worker?.createdAt)}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedWorker(worker)}
                          title="View application"
                          aria-label={`View ${worker?.name || "worker"} application`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-[#101d3a] hover:bg-[#101d3a] hover:text-white"
                        >
                          <FaEye />
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedWorker(worker)}
                          title="Edit application"
                          aria-label={`Edit ${worker?.name || "worker"} application`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-red-500 hover:bg-red-50 hover:text-red-600"
                        >
                          <FaEdit />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(worker._id)}
                          title="Delete application"
                          aria-label={`Delete ${worker?.name || "worker"} application`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 transition hover:border-red-600 hover:bg-red-600 hover:text-white"
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
      </div>

      {/* Footer */}
      {!loading && workersToDisplay.length > 0 && (
        <div className="mt-4 flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {workersToDisplay.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {workers.length}
            </span>{" "}
            applications
          </p>

          <p className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Workforce records
          </p>
        </div>
      )}

      {/* Workforce modal */}
      {selectedWorker && (
        <WorkforceModal
          workforce={selectedWorker}
          onClose={() => setSelectedWorker(null)}
          onDelete={handleDelete}
          refreshWorkforce={fetchWorkers}
        />
      )}
    </div>
  );
};

export default WorkforceTable;