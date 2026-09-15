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
} from "react-icons/fa";

const WorkforceTable = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedWorker, setSelectedWorker] = useState(null);

  // ==========================================
  // Fetch Workforce Applications
  // ==========================================

  useEffect(() => {
    fetchWorkers();
  }, []);

  // ==========================================
  // Fetch Workers
  // ==========================================

  const fetchWorkers = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        "/api/submissions/admin/workforce"
      );

      console.log(
        "WORKFORCE API RESPONSE:",
        res.data
      );

      const responseData = res?.data;

      let workerList = [];

      // If API directly returns an array
      if (Array.isArray(responseData)) {
        workerList = responseData;
      }

      // If API returns { data: [...] }
      else if (
        Array.isArray(responseData?.data)
      ) {
        workerList = responseData.data;
      }

      // If API returns { workforce: [...] }
      else if (
        Array.isArray(responseData?.workforce)
      ) {
        workerList = responseData.workforce;
      }

      console.log(
        "WORKFORCE ARRAY:",
        workerList
      );

      console.log(
        "IS WORKFORCE ARRAY:",
        Array.isArray(workerList)
      );

      // Always store an array
      setWorkers(workerList);

    } catch (err) {
      console.error(
        "FETCH WORKFORCE ERROR:",
        err
      );

      setWorkers([]);

      toast.error(
        err.response?.data?.message ||
          "Unable to load workforce applications."
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Filter Workers
  // ==========================================

  const filteredWorkers = useMemo(() => {

    const workerList = Array.isArray(workers)
      ? workers
      : [];

    const searchTerm = search
      .toLowerCase()
      .trim();

    // No search
    if (!searchTerm) {
      return workerList;
    }

    // Search workers
    return workerList.filter((worker) => {

      const name =
        String(worker?.name || "").toLowerCase();

      const email =
        String(worker?.email || "").toLowerCase();

      const phoneNumber =
        String(worker?.phoneNumber || "").toLowerCase();

      const department =
        String(worker?.department || "").toLowerCase();

      return (
        name.includes(searchTerm) ||
        email.includes(searchTerm) ||
        phoneNumber.includes(searchTerm) ||
        department.includes(searchTerm)
      );
    });

  }, [workers, search]);

  // ==========================================
  // GUARANTEED ARRAY FOR RENDERING
  // ==========================================

  const workersToDisplay = Array.isArray(
    filteredWorkers
  )
    ? filteredWorkers
    : [];

  // Debugging
  console.log(
    "FILTERED WORKERS:",
    filteredWorkers
  );

  console.log(
    "WORKERS TO DISPLAY:",
    workersToDisplay
  );

  console.log(
    "IS ARRAY:",
    Array.isArray(workersToDisplay)
  );

  // ==========================================
  // Delete Workforce Application
  // ==========================================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this workforce application permanently?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await API.delete(
        `/api/submissions/admin/workforce/${id}`
      );

      toast.success(
        "Workforce application deleted successfully."
      );

      // Remove deleted worker
      setWorkers((previousWorkers) => {

        if (!Array.isArray(previousWorkers)) {
          return [];
        }

        return previousWorkers.filter(
          (worker) =>
            worker._id !== id
        );

      });

      // Close modal if deleted worker is open
      if (
        selectedWorker &&
        selectedWorker._id === id
      ) {
        setSelectedWorker(null);
      }

    } catch (err) {

      console.error(
        "DELETE WORKFORCE ERROR:",
        err
      );

      toast.error(
        err.response?.data?.message ||
          "Unable to delete application."
      );
    }
  };

  // ==========================================
  // View / Edit Worker
  // ==========================================

  const handleView = (worker) => {
    setSelectedWorker(worker);
  };

  // ==========================================
  // Refresh
  // ==========================================

  const handleRefresh = async () => {

    await fetchWorkers();

    toast.info(
      "Workforce applications refreshed."
    );
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

        <h2 className="text-2xl font-bold">
          Workforce Applications
        </h2>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

          {/* Search */}

          <div className="relative">

            <FaSearch
              className="absolute left-3 top-3.5 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search workforce..."
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

      {/* ======================================
          LOADING
      ====================================== */}

      {loading ? (

        <div className="text-center py-12">

          <FaSyncAlt
            className="animate-spin text-blue-600 text-3xl mx-auto mb-3"
          />

          <p className="text-gray-500">
            Loading workforce applications...
          </p>

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="min-w-full">

            {/* =================================
                TABLE HEADER
            ================================= */}

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
                  Department
                </th>

                <th className="p-4 text-left">
                  Registered
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            {/* =================================
                TABLE BODY
            ================================= */}

            <tbody>

              {workersToDisplay.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500"
                  >

                    {search
                      ? "No workforce applications match your search."
                      : "No workforce applications found."}

                  </td>

                </tr>

              ) : (

                workersToDisplay.map(
                  (worker) => (

                    <tr
                      key={worker._id}
                      className="border-b hover:bg-gray-50"
                    >

                      {/* Name */}

                      <td className="p-4 font-medium">
                        {worker?.name || "N/A"}
                      </td>

                      {/* Email */}

                      <td className="p-4">
                        {worker?.email || "N/A"}
                      </td>

                      {/* Phone */}

                      <td className="p-4">
                        {worker?.phoneNumber || "N/A"}
                      </td>

                      {/* Department */}

                      <td className="p-4">
                        {worker?.department || "N/A"}
                      </td>

                      {/* Registered */}

                      <td className="p-4">

                        {worker?.createdAt
                          ? new Date(
                              worker.createdAt
                            ).toLocaleDateString()
                          : "N/A"}

                      </td>

                      {/* Actions */}

                      <td className="p-4">

                        <div className="flex justify-center gap-4">

                          {/* VIEW */}

                          <button
                            type="button"
                            onClick={() =>
                              handleView(worker)
                            }
                            className="text-blue-600 hover:text-blue-800"
                            title="View"
                          >

                            <FaEye />

                          </button>

                          {/* EDIT */}

                          <button
                            type="button"
                            onClick={() =>
                              handleView(worker)
                            }
                            className="text-green-600 hover:text-green-800"
                            title="Edit"
                          >

                            <FaEdit />

                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                worker._id
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

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      )}

      {/* ======================================
          WORKFORCE MODAL
      ====================================== */}

      {selectedWorker && (

        <WorkforceModal
          workforce={selectedWorker}

          onClose={() =>
            setSelectedWorker(null)
          }

          onDelete={handleDelete}

          refreshWorkforce={fetchWorkers}
        />

      )}

    </div>
  );
};

export default WorkforceTable;