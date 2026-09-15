import React, { useEffect, useState } from "react";
import {
    FaBell,
    FaSearch,
    FaUserCircle,
    FaEnvelope,
    FaUsers,
    FaHandsHelping,
    FaCheck,
} from "react-icons/fa";

const Topbar = ({
    notifications = [],
    unreadNotifications = [],
    onNotificationClick,
    onMarkAllRead,
}) => {
    const [currentTime, setCurrentTime] = useState("");
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();

            setCurrentTime(
                now.toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
        };

        updateClock();

        const timer = setInterval(updateClock, 1000 * 60);

        return () => clearInterval(timer);
    }, []);

    const getNotificationIcon = (type) => {
        if (type === "member") {
            return <FaUsers className="text-green-600" />;
        }

        if (type === "workforce") {
            return <FaHandsHelping className="text-amber-600" />;
        }

        return <FaEnvelope className="text-blue-600" />;
    };

    const formatDate = (date) => {
        if (!date) return "";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "";
        }

        return parsedDate.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleNotificationClick = (notification) => {
        if (onNotificationClick) {
            onNotificationClick(notification);
        }

        setShowNotifications(false);
    };

    return (
        <header className="bg-white shadow-md px-8 py-5 flex justify-between items-center">

            {/* LEFT SIDE */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800">
                    Admin Dashboard
                </h1>

                <p className="text-gray-500 mt-1">
                    {currentTime}
                </p>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-6">

                {/* SEARCH */}
                <div className="relative">
                    <FaSearch className="absolute left-4 top-4 text-gray-400" />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 w-72"
                    />
                </div>

                {/* NOTIFICATION */}
                <div className="relative">

                    <button
                        onClick={() =>
                            setShowNotifications(
                                !showNotifications
                            )
                        }
                        className="relative p-2"
                        title="Notifications"
                    >
                        <FaBell className="text-2xl text-gray-600 hover:text-amber-600 transition" />

                        {unreadNotifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                                {unreadNotifications.length > 99
                                    ? "99+"
                                    : unreadNotifications.length}
                            </span>
                        )}
                    </button>

                    {/* NOTIFICATION DROPDOWN */}
                    {showNotifications && (
                        <div className="absolute right-0 mt-3 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">

                            {/* HEADER */}
                            <div className="flex justify-between items-center px-5 py-4 border-b bg-gray-50">

                                <div>
                                    <h3 className="font-bold text-gray-800">
                                        Notifications
                                    </h3>

                                    <p className="text-xs text-gray-500 mt-1">
                                        {unreadNotifications.length} unread
                                    </p>
                                </div>

                                {unreadNotifications.length > 0 && (
                                    <button
                                        onClick={onMarkAllRead}
                                        className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
                                    >
                                        <FaCheck />

                                        Mark all read
                                    </button>
                                )}
                            </div>

                            {/* NOTIFICATIONS */}
                            <div className="max-h-96 overflow-y-auto">

                                {notifications.length === 0 ? (
                                    <div className="py-10 text-center text-gray-500">

                                        <FaBell className="mx-auto text-3xl text-gray-300 mb-3" />

                                        <p>
                                            No notifications yet.
                                        </p>

                                    </div>
                                ) : (
                                    notifications
                                        .slice(0, 20)
                                        .map((notification) => {

                                            const isUnread =
                                                unreadNotifications.some(
                                                    (item) =>
                                                        item.id ===
                                                        notification.id
                                                );

                                            return (
                                                <button
                                                    key={notification.id}
                                                    onClick={() =>
                                                        handleNotificationClick(
                                                            notification
                                                        )
                                                    }
                                                    className={`w-full text-left px-5 py-4 border-b hover:bg-gray-50 transition flex gap-4 ${
                                                        isUnread
                                                            ? "bg-amber-50"
                                                            : "bg-white"
                                                    }`}
                                                >

                                                    {/* ICON */}
                                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                        {getNotificationIcon(
                                                            notification.type
                                                        )}
                                                    </div>

                                                    {/* CONTENT */}
                                                    <div className="flex-1 min-w-0">

                                                        <div className="flex justify-between gap-2">

                                                            <h4
                                                                className={`text-sm ${
                                                                    isUnread
                                                                        ? "font-bold text-gray-800"
                                                                        : "font-semibold text-gray-700"
                                                                }`}
                                                            >
                                                                {
                                                                    notification.title
                                                                }
                                                            </h4>

                                                            {isUnread && (
                                                                <span className="w-2 h-2 bg-red-600 rounded-full mt-1 flex-shrink-0"></span>
                                                            )}

                                                        </div>

                                                        <p className="text-sm text-gray-600 truncate mt-1">
                                                            {
                                                                notification.message
                                                            }
                                                        </p>

                                                        <p className="text-xs text-gray-400 mt-1">
                                                            {formatDate(
                                                                notification.createdAt
                                                            )}
                                                        </p>

                                                    </div>

                                                </button>
                                            );
                                        })
                                )}

                            </div>

                            {/* FOOTER */}
                            {notifications.length > 20 && (
                                <div className="px-5 py-3 text-center border-t bg-gray-50">
                                    <p className="text-xs text-gray-500">
                                        Showing the latest 20
                                        notifications
                                    </p>
                                </div>
                            )}

                        </div>
                    )}

                </div>

                {/* ADMIN */}
                <div className="flex items-center gap-3">

                    <FaUserCircle className="text-5xl text-gray-600" />

                    <div>
                        <h3 className="font-semibold">
                            Administrator
                        </h3>

                        <p className="text-sm text-gray-500">
                            Church Admin
                        </p>
                    </div>

                </div>

            </div>
        </header>
    );
};

export default Topbar;