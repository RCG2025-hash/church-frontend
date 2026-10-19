
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  ToastContainer,
  toast,
} from "react-toastify";
import {
  FaChartLine,
  FaUsers,
  FaEnvelope,
  FaUserPlus,
  FaBriefcase,
  FaSyncAlt,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";

import "react-toastify/dist/ReactToastify.css";

import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import DashboardCards from "../components/admin/DashboardCards";
import ContactTable from "../components/admin/ContactTable";
import MemberTable from "../components/admin/MemberTable";
import WorkforceTable from "../components/admin/WorkforceTable";

const API_URL = import.meta.env.VITE_API_URL;

const getConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const normalizeArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.submissions)) return data.submissions;
  if (Array.isArray(data?.members)) return data.members;
  if (Array.isArray(data?.workforce)) return data.workforce;
  if (Array.isArray(data?.contacts)) return data.contacts;

  return [];
};

const sectionDetails = {
  dashboard: {
    title: "Dashboard Overview",
    description: "Monitor your church website activity and submissions.",
    icon: FaChartLine,
  },
  contacts: {
    title: "Contact Messages",
    description: "Review and manage messages sent through the website.",
    icon: FaEnvelope,
  },
  members: {
    title: "Member Registrations",
    description: "View and manage new member registration submissions.",
    icon: FaUsers,
  },
  workforce: {
    title: "Workforce Applications",
    description: "Review ministry and workforce applications.",
    icon: FaBriefcase,
  },
};

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const [stats, setStats] = useState({
    contacts: 0,
    members: 0,
    workforce: 0,
    total: 0,
  });

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [seenNotificationIds, setSeenNotificationIds] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("adminSeenNotifications") || "[]"
      );
    } catch {
      return [];
    }
  });

  const fetchDashboardStats = useCallback(
    async (showLoading = false) => {
      try {
        if (showLoading) {
          setLoading(true);
        }

        const response = await axios.get(
          `${API_URL}/api/submissions/admin/dashboard`,
          getConfig()
        );

        const dashboardData = response.data?.data || {};

        setStats({
          contacts: Number(dashboardData.contacts ?? 0),
          members: Number(dashboardData.members ?? 0),
          workforce: Number(dashboardData.workforce ?? 0),
          total: Number(dashboardData.total ?? 0),
        });
      } catch (error) {
        console.error(
          "Dashboard API error:",
          error.response?.data || error.message
        );

        if (showLoading) {
          toast.error(
            error.response?.data?.message ||
              "Unable to load dashboard statistics."
          );
        }
      } finally {
        if (showLoading) {
          setLoading(false);
        }
      }
    },
    []
  );

  const fetchNotifications = useCallback(async () => {
    try {
      const config = getConfig();

      const [
        contactsResponse,
        membersResponse,
        workforceResponse,
      ] = await Promise.all([
        axios.get(
          `${API_URL}/api/submissions/admin/contact`,
          config
        ),
        axios.get(
          `${API_URL}/api/submissions/admin/new-member`,
          config
        ),
        axios.get(
          `${API_URL}/api/submissions/admin/workforce`,
          config
        ),
      ]);

      const contacts = normalizeArray(contactsResponse.data);
      const members = normalizeArray(membersResponse.data);
      const workforce = normalizeArray(workforceResponse.data);

      const newNotifications = [
        ...members.map((item) => ({
          id: `member-${item._id}`,
          type: "member",
          title: "New Member Registration",
          message:
            item.name ||
            item.fullName ||
            "A new member has registered.",
          section: "members",
          createdAt: item.createdAt || new Date().toISOString(),
        })),

        ...workforce.map((item) => ({
          id: `workforce-${item._id}`,
          type: "workforce",
          title: "New Workforce Submission",
          message:
            item.name ||
            item.fullName ||
            "A new workforce submission was received.",
          section: "workforce",
          createdAt: item.createdAt || new Date().toISOString(),
        })),

        ...contacts.map((item) => ({
          id: `contact-${item._id}`,
          type: "contact",
          title: "New Contact Message",
          message:
            item.name ||
            item.fullName ||
            "A new contact message was received.",
          section: "contacts",
          createdAt: item.createdAt || new Date().toISOString(),
        })),
      ];

      newNotifications.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );

      setNotifications(newNotifications);
    } catch (error) {
      console.error(
        "Notification error:",
        error.response?.data || error.message
      );
    }
  }, []);

  useEffect(() => {
    fetchDashboardStats(true);
    fetchNotifications();

    const interval = setInterval(() => {
      fetchDashboardStats(false);
      fetchNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchDashboardStats, fetchNotifications]);

  const unreadNotifications = notifications.filter(
    (notification) =>
      !seenNotificationIds.includes(notification.id)
  );

  const markAllNotificationsRead = () => {
    const ids = notifications.map(
      (notification) => notification.id
    );

    setSeenNotificationIds(ids);

    localStorage.setItem(
      "adminSeenNotifications",
      JSON.stringify(ids)
    );
  };

  const handleNotificationClick = (notification) => {
    const updatedIds = Array.from(
      new Set([
        ...seenNotificationIds,
        notification.id,
      ])
    );

    setSeenNotificationIds(updatedIds);

    localStorage.setItem(
      "adminSeenNotifications",
      JSON.stringify(updatedIds)
    );

    setActiveSection(notification.section);
  };

  const handleRefresh = async () => {
    if (refreshing) return;

    setRefreshing(true);

    try {
      await Promise.all([
        fetchDashboardStats(false),
        fetchNotifications(),
      ]);

      toast.success("Dashboard refreshed.");
    } finally {
      setRefreshing(false);
    }
  };

  const currentSection =
    sectionDetails[activeSection] || sectionDetails.dashboard;

  const SectionIcon = currentSection.icon;

  const formattedDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top navigation */}
        <Topbar
          notifications={notifications}
          unreadNotifications={unreadNotifications}
          onNotificationClick={handleNotificationClick}
          onMarkAllRead={markAllNotificationsRead}
        />

        {/* Page content */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1600px]">
            {/* Page heading */}
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0b1f46] text-white shadow-sm">
                  <SectionIcon className="text-xl" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-[#0b1f46] sm:text-3xl">
                    {currentSection.title}
                  </h1>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {currentSection.description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRefresh}
                disabled={refreshing}
                className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#0b1f46] shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
              >
                <FaSyncAlt
                  className={refreshing ? "animate-spin" : ""}
                />
                {refreshing ? "Refreshing..." : "Refresh Data"}
              </button>
            </div>

            {/* Welcome panel */}
            {activeSection === "dashboard" && (
              <section className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-[#0b1f46] via-[#102b59] to-[#163568] p-6 text-white shadow-lg sm:p-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full border-[35px] border-white/5"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-28 right-40 h-56 w-56 rounded-full bg-red-500/10 blur-2xl"
                />

                <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
                  <div className="max-w-2xl">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-100">
                      <FaShieldAlt className="text-red-400" />
                      Administration Portal
                    </div>

                    <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
                      Welcome Back, Administrator
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
                      Manage church registrations, workforce applications,
                      and messages from one place. Thank you for serving
                      the church community.
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-600 text-white">
                      <FaChartLine className="text-lg" />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-blue-100">
                        Dashboard Status
                      </p>
                      <p className="mt-1 text-sm font-bold">
                        Administration Active
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Date and quick navigation */}
            {activeSection === "dashboard" && (
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Overview
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-600">
                    {formattedDate}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveSection("members")}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-800"
                  >
                    <FaUserPlus className="text-blue-700" />
                    Members
                    <FaArrowRight className="ml-1 text-xs" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSection("contacts")}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:text-red-600"
                  >
                    <FaEnvelope className="text-red-600" />
                    Messages
                    <FaArrowRight className="ml-1 text-xs" />
                  </button>
                </div>
              </div>
            )}

            {/* Main content panel */}
            <section className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6 lg:p-7">
              {loading ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#0b1f46]">
                    <FaSyncAlt className="animate-spin text-2xl" />
                  </div>

                  <h2 className="mt-5 text-lg font-bold text-[#0b1f46]">
                    Loading Dashboard
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Please wait while we retrieve your dashboard statistics.
                  </p>
                </div>
              ) : (
                <>
                  {activeSection === "dashboard" && (
                    <DashboardCards stats={stats} />
                  )}

                  {activeSection === "contacts" && (
                    <ContactTable />
                  )}

                  {activeSection === "members" && (
                    <MemberTable />
                  )}

                  {activeSection === "workforce" && (
                    <WorkforceTable />
                  )}
                </>
              )}
            </section>

            {/* Footer */}
            <footer className="mt-7 flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <p>
                &copy; {new Date().getFullYear()} Reconciliation Church of God
              </p>

              <p className="flex items-center gap-2">
                <FaShieldAlt className="text-slate-400" />
                Secure Administration Portal
              </p>
            </footer>
          </div>
        </main>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default AdminDashboard;