import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import DashboardCards from "../components/admin/DashboardCards";
import ContactTable from "../components/admin/ContactTable";
import MemberTable from "../components/admin/MemberTable";
import WorkforceTable from "../components/admin/WorkforceTable";

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

    const [seenNotificationIds, setSeenNotificationIds] = useState(() => {
        try {
            return JSON.parse(
                localStorage.getItem("adminSeenNotifications") || "[]"
            );
        } catch {
            return [];
        }
    });

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
        [API_URL]
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
                    createdAt:
                        item.createdAt ||
                        new Date().toISOString(),
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
                    createdAt:
                        item.createdAt ||
                        new Date().toISOString(),
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
                    createdAt:
                        item.createdAt ||
                        new Date().toISOString(),
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
    }, [API_URL]);

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

    return (
        <div className="flex min-h-screen bg-gray-100">

            <Sidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />

            <div className="flex-1">

                <Topbar
                    notifications={notifications}
                    unreadNotifications={unreadNotifications}
                    onNotificationClick={handleNotificationClick}
                    onMarkAllRead={markAllNotificationsRead}
                />

                <div className="p-6">

                    {loading ? (
                        <h2 className="text-center text-xl">
                            Loading Dashboard...
                        </h2>
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

                </div>
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