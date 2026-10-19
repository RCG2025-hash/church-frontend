
import React, { useEffect, useMemo, useState } from "react";
import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaEnvelope,
  FaUsers,
  FaHandsHelping,
  FaCheck,
  FaShieldAlt,
  FaTimes,
  FaInbox,
} from "react-icons/fa";

const Topbar = ({
  notifications = [],
  unreadNotifications = [],
  onNotificationClick,
  onMarkAllRead,
}) => {
  const [currentTime, setCurrentTime] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const updateClock = () => {
      setCurrentTime(
        new Date().toLocaleString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateClock();

    const timer = setInterval(updateClock, 60000);

    return () => clearInterval(timer);
  }, []);

  // Close the dropdown when Escape is pressed.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowNotifications(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const getNotificationIcon = (type) => {
    if (type === "member") {
      return <FaUsers className="text-blue-700" />;
    }

    if (type === "workforce") {
      return <FaHandsHelping className="text-red-600" />;
    }

    return <FaEnvelope className="text-indigo-600" />;
  };

  const getNotificationStyle = (type) => {
    if (type === "member") return "bg-blue-50";
    if (type === "workforce") return "bg-red-50";
    return "bg-indigo-50";
  };

  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredNotifications = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return notifications;

    return notifications.filter((notification) =>
      [
        notification.title,
        notification.message,
        notification.type,
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term))
    );
  }, [notifications, searchTerm]);

  const handleNotificationClick = (notification) => {
    if (onNotificationClick) {
      onNotificationClick(notification);
    }

    setShowNotifications(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 px-4 py-4 shadow-sm backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-3">
        {/* Left side: page identity */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="hidden h-9 w-1 rounded-full bg-red-600 sm:block" />

            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold tracking-tight text-[#0b1f46] sm:text-xl lg:text-2xl">
                Church Administration
              </h1>

              <p className="mt-1 hidden text-xs text-slate-500 sm:block sm:text-sm">
                {currentTime}
              </p>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4 lg:gap-6">
          {/* Search */}
          <div className="relative hidden md:block">
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              aria-label="Search notifications"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setShowNotifications(true);
              }}
              onFocus={() => {
                if (searchTerm.trim()) {
                  setShowNotifications(true);
                }
              }}
              className="w-48 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:bg-white focus:ring-4 focus:ring-blue-100 lg:w-64"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setShowNotifications((previous) => !previous)
              }
              aria-label={`Notifications, ${unreadNotifications.length} unread`}
              aria-expanded={showNotifications}
              aria-haspopup="true"
              className={`relative flex h-11 w-11 items-center justify-center rounded-xl border transition ${
                showNotifications
                  ? "border-blue-200 bg-blue-50 text-[#0b1f46]"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0b1f46]"
              }`}
              title="Notifications"
            >
              <FaBell className="text-lg" />

              {unreadNotifications.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-red-600 px-1 text-[10px] font-bold text-white">
                  {unreadNotifications.length > 99
                    ? "99+"
                    : unreadNotifications.length}
                </span>
              )}
            </button>

            {/* Notification dropdown */}
            {showNotifications && (
              <>
                <button
                  type="button"
                  aria-label="Close notifications"
                  className="fixed inset-0 z-40 cursor-default bg-slate-950/10"
                  onClick={() => setShowNotifications(false)}
                />

                <div className="fixed left-3 right-3 top-20 z-50 flex max-h-[75vh] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:mt-3 sm:max-h-[min(520px,75vh)] sm:w-[400px]">
                  {/* Dropdown header */}
                  <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-4 sm:px-5">
                    <div>
                      <h2 className="font-bold text-[#0b1f46]">
                        Notifications
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        {unreadNotifications.length} unread{" "}
                        {unreadNotifications.length === 1
                          ? "notification"
                          : "notifications"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {unreadNotifications.length > 0 && (
                        <button
                          type="button"
                          onClick={onMarkAllRead}
                          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold text-[#0b1f46] transition hover:bg-blue-50 hover:text-red-600"
                        >
                          <FaCheck />
                          <span className="hidden xs:inline">
                            Mark all read
                          </span>
                          <span className="xs:hidden">
                            Mark read
                          </span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setShowNotifications(false)}
                        aria-label="Close notifications"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>

                  {/* Search on small screens */}
                  <div className="border-b border-slate-100 px-4 py-3 md:hidden">
                    <div className="relative">
                      <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        type="search"
                        aria-label="Search notifications"
                        placeholder="Search notifications..."
                        value={searchTerm}
                        onChange={(event) =>
                          setSearchTerm(event.target.value)
                        }
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  {/* Notification list */}
                  <div className="min-h-0 flex-1 overflow-y-auto">
                    {filteredNotifications.length === 0 ? (
                      <div className="px-6 py-12 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#0b1f46]">
                          <FaInbox className="text-2xl" />
                        </div>

                        <h3 className="mt-4 font-semibold text-slate-700">
                          {searchTerm.trim()
                            ? "No matching notifications"
                            : "You're all caught up"}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {searchTerm.trim()
                            ? "Try another search term."
                            : "New messages and registrations will appear here."}
                        </p>
                      </div>
                    ) : (
                      filteredNotifications
                        .slice(0, 20)
                        .map((notification) => {
                          const isUnread = unreadNotifications.some(
                            (item) => item.id === notification.id
                          );

                          return (
                            <button
                              key={notification.id}
                              type="button"
                              onClick={() =>
                                handleNotificationClick(notification)
                              }
                              className={`flex w-full gap-3 border-b border-slate-100 px-4 py-4 text-left transition hover:bg-slate-50 sm:px-5 ${
                                isUnread ? "bg-blue-50/60" : "bg-white"
                              }`}
                            >
                              <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${getNotificationStyle(
                                  notification.type
                                )}`}
                              >
                                {getNotificationIcon(notification.type)}
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-2">
                                  <h3
                                    className={`text-sm ${
                                      isUnread
                                        ? "font-bold text-[#0b1f46]"
                                        : "font-semibold text-slate-700"
                                    }`}
                                  >
                                    {notification.title}
                                  </h3>

                                  {isUnread && (
                                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-600" />
                                  )}
                                </div>

                                <p className="mt-1 truncate text-sm text-slate-600">
                                  {notification.message}
                                </p>

                                <p className="mt-2 text-xs text-slate-400">
                                  {formatDate(notification.createdAt)}
                                </p>
                              </div>
                            </button>
                          );
                        })
                    )}
                  </div>

                  {/* Dropdown footer */}
                  {filteredNotifications.length > 20 && (
                    <div className="border-t border-slate-100 bg-slate-50 px-4 py-3 text-center">
                      <p className="text-xs text-slate-500">
                        Showing the latest 20 matching notifications
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Administrator profile */}
          <div className="flex items-center gap-2 border-l border-slate-200 pl-3 sm:gap-3 sm:pl-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b1f46] text-white ring-4 ring-blue-50 sm:h-11 sm:w-11">
              <FaUserCircle className="text-2xl" />
            </div>

            <div className="hidden min-w-0 lg:block">
              <p className="text-sm font-bold text-[#0b1f46]">
                Administrator
              </p>

              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                <FaShieldAlt className="text-red-500" />
                Church Admin
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;