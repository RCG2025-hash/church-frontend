
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaGoogle,
  FaDownload,
  FaCalendarPlus,
  FaTimes,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaChurch,
} from "react-icons/fa";

import women_con from "../assets/women_con.jpg";
import jacobian from "../assets/Jacobian_img.jpg";
import men_con from "../assets/Mens_main_con.jpg";
import youth_con from "../assets/youth_con.jpg";
import church_con from "../assets/church_con.jpg";

// Original event information and dates are preserved.
const eventsData = [
  {
    id: 1,
    title: "Women's Convention",
    date: "2025-03-05",
    endDate: "2025-03-09",
    time: "9:00 AM",
    location: "Church Auditorium",
    description:
      "A special gathering for women of faith to connect, grow, and be empowered through worship and teaching.",
    category: "Convention",
    image: women_con,
  },
  {
    id: 2,
    title: "Jacobian Experience",
    date: "2025-04-18",
    endDate: "2025-04-20",
    time: "9:00 AM",
    location: "Ofada",
    description:
      "The SEASON of RESURRECTION is here again and the opportunity to pray your way to BREAKTHROUGH at the JACOBIAN EXPERIENCE.",
    category: "Easter Retreat",
    image: jacobian,
  },
  {
    id: 3,
    title: "Men's Convention",
    date: "2025-06-13",
    endDate: "2025-06-15",
    time: "9:00 AM",
    location: "Church Auditorium",
    description:
      "A gathering for men to strengthen their faith, build fellowship, and grow as spiritual leaders.",
    category: "Convention",
    image: men_con,
  },
  {
    id: 4,
    title: "Youth Convention",
    date: "2025-08-29",
    endDate: "2025-08-31",
    time: "9:00 AM",
    location: "Church Auditorium",
    description:
      "An energetic gathering for youth to connect with God and each other through worship, teaching, and fellowship.",
    category: "Convention",
    image: youth_con,
  },
  {
    id: 5,
    title: "Church Convention",
    date: "2025-10-21",
    endDate: "2025-10-26",
    time: "9:00 AM",
    location: "Church Auditorium",
    description:
      "Our annual church convention with special guests, powerful teachings, and spirit-filled worship.",
    category: "Convention",
    image: church_con,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

// Parse YYYY-MM-DD as a local date to avoid date shifts caused by UTC parsing.
function parseLocalDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(dateString) {
  return parseLocalDate(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDateRange(event) {
  if (!event.endDate || event.endDate === event.date) {
    return formatDate(event.date);
  }

  const start = parseLocalDate(event.date);
  const end = parseLocalDate(event.endDate);

  const sameMonth =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth();

  if (sameMonth) {
    return `${start.getDate()}–${end.getDate()} ${end.toLocaleDateString(
      "en-GB",
      { month: "short", year: "numeric" }
    )}`;
  }

  return `${formatDate(event.date)} – ${formatDate(event.endDate)}`;
}

function parseEventTime(timeString, dateString) {
  const match = timeString.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!match) {
    throw new Error(`Invalid event time: ${timeString}`);
  }

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const modifier = match[3].toUpperCase();

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  const date = parseLocalDate(dateString);
  date.setHours(hours, minutes, 0, 0);

  return date;
}

function formatCalendarDate(date) {
  // Calendar timestamps are converted to UTC for calendar compatibility.
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

function escapeICSText(value = "") {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function getCalendarDates(event) {
  const start = parseEventTime(event.time, event.date);

  let end;

  if (event.endDate && event.endDate !== event.date) {
    // Preserve the event's supplied date range.
    end = parseEventTime(event.time, event.endDate);
  } else {
    // A one-hour duration is used when no end time is supplied.
    end = new Date(start.getTime() + 60 * 60 * 1000);
  }

  return { start, end };
}

function createGoogleCalendarURL(event) {
  const { start, end } = getCalendarDates(event);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${formatCalendarDate(start)}/${formatCalendarDate(end)}`,
    details: event.description || "Church Event",
    location: event.location || "Reconciliation Church",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function downloadCalendarFile(event) {
  const { start, end } = getCalendarDates(event);
  const stamp = formatCalendarDate(new Date());

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "PRODID:-//Reconciliation Church of God//Events//EN",
    "BEGIN:VEVENT",
    `UID:rcg-event-${event.id}@reconciliationchurch.org`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${formatCalendarDate(start)}`,
    `DTEND:${formatCalendarDate(end)}`,
    `SUMMARY:${escapeICSText(event.title)}`,
    `LOCATION:${escapeICSText(event.location || "Reconciliation Church")}`,
    `DESCRIPTION:${escapeICSText(event.description || "Church Event")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], {
    type: "text/calendar;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${event.title.replace(/[^a-z0-9]+/gi, "_")}.ics`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarError, setCalendarError] = useState("");

  const categories = useMemo(
    () => ["All", ...new Set(eventsData.map((event) => event.category))],
    []
  );

  const today = getLocalDateString();

  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return eventsData.filter((event) => {
      const matchesCategory =
        selectedCategory === "All" ||
        event.category === selectedCategory;

      const searchableText = [
        event.title,
        event.description,
        event.location,
        event.category,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchableText.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const hasFilters = Boolean(searchQuery.trim()) || selectedCategory !== "All";

  // Close the calendar menu on outside clicks or when Escape is pressed.
  useEffect(() => {
    if (selectedEvent === null) return;

    const handlePointerDown = (event) => {
      if (!event.target.closest(".calendar-action-container")) {
        setSelectedEvent(null);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedEvent(null);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedEvent]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  const handleCalendarAction = (event, action) => {
    try {
      setCalendarError("");

      if (action === "google") {
        window.open(
          createGoogleCalendarURL(event),
          "_blank",
          "noopener,noreferrer"
        );
      } else {
        downloadCalendarFile(event);
      }

      setSelectedEvent(null);
    } catch (error) {
      console.error("Calendar action failed:", error);
      setCalendarError(
        "We couldn't prepare the calendar entry. Please check the event date and time."
      );
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#102844] py-20 text-white sm:py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#102844] via-[#17365D] to-[#263D60]" />
        <div className="absolute -right-20 -top-20 -z-10 h-80 w-80 rounded-full bg-[#B42332]/25 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 -z-10 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="mx-auto max-w-7xl px-5 text-center sm:px-8 lg:px-12"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm"
          >
            <FaChurch className="text-red-300" />
            Reconciliation Church of God Intl.
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl font-bold sm:text-5xl md:text-6xl"
          >
            Church <span className="text-red-300">Events</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-3xl text-base leading-8 text-blue-100 sm:text-lg md:text-xl"
          >
            Join us for worship, fellowship, and spiritual growth.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mx-auto mt-8 h-1 w-20 rounded-full bg-[#B42332]"
          />
        </motion.div>
      </section>

      {/* Events and filters */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-10 text-center"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#B42332]">
              Gather With Us
            </p>

            <h2 className="font-serif text-3xl font-bold text-[#17365D] sm:text-4xl">
              Explore Our Events
            </h2>

            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#B42332]" />

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg">
              Explore our church gatherings, find event details, and add
              events to your calendar.
            </p>
          </motion.div>

          {/* Search and category filters */}
          <div className="mb-10 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="search"
                  aria-label="Search church events"
                  placeholder="Search by event, description, or location..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-11 text-sm text-gray-800 outline-none transition focus:border-[#17365D] focus:bg-white focus:ring-2 focus:ring-blue-100 sm:text-base"
                />

                {searchQuery && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-[#B42332]"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>

              <div className="relative md:w-64 md:flex-shrink-0">
                <FaFilter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <select
                  aria-label="Filter events by category"
                  value={selectedCategory}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-10 text-sm text-gray-800 outline-none transition focus:border-[#17365D] focus:bg-white focus:ring-2 focus:ring-blue-100 sm:text-base"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "All" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {hasFilters && (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {searchQuery.trim() && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-2 text-sm font-medium text-[#B42332]">
                    Search: {searchQuery}
                    <button
                      type="button"
                      aria-label="Remove search filter"
                      onClick={() => setSearchQuery("")}
                    >
                      <FaTimes />
                    </button>
                  </span>
                )}

                {selectedCategory !== "All" && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-sm font-medium text-[#17365D]">
                    {selectedCategory}
                    <button
                      type="button"
                      aria-label="Remove category filter"
                      onClick={() => setSelectedCategory("All")}
                    >
                      <FaTimes />
                    </button>
                  </span>
                )}

                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="rounded-full px-3 py-2 text-sm font-semibold text-gray-500 underline underline-offset-4 hover:text-[#B42332]"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Result count */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-600 sm:text-base">
              {hasFilters
                ? `${filteredEvents.length} matching event${filteredEvents.length === 1 ? "" : "s"}`
                : `${filteredEvents.length} church event${filteredEvents.length === 1 ? "" : "s"}`}
            </p>

            <span className="rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-semibold text-[#17365D]">
              Dates shown as supplied
            </span>
          </div>

          {calendarError && (
            <div
              role="alert"
              className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {calendarError}
            </div>
          )}

          {/* Events grid */}
          {filteredEvents.length > 0 ? (
            <motion.div
              key={`${searchQuery}-${selectedCategory}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredEvents.map((event) => {
                const isPast = (event.endDate || event.date) < today;

                return (
                  <motion.article
                    key={event.id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="group flex h-full flex-col overflow-visible rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
                  >
                    <div className="relative overflow-hidden rounded-t-2xl">
                      <img
                        src={event.image}
                        alt={event.title}
                        loading="lazy"
                        className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-60"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#102844]/60 via-transparent to-transparent" />

                      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#B42332] px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                          {event.category}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-bold shadow-sm ${
                            isPast
                              ? "bg-white/95 text-gray-700"
                              : "bg-emerald-500 text-white"
                          }`}
                        >
                          {isPast ? "Past Event" : "Upcoming"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="font-serif text-xl font-bold leading-snug text-[#17365D] transition-colors group-hover:text-[#B42332] sm:text-2xl">
                        {event.title}
                      </h3>

                      <div className="mb-4 mt-4 h-1 w-12 rounded-full bg-[#B42332] transition-all duration-300 group-hover:w-20" />

                      <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex items-start gap-3">
                          <FaCalendarAlt className="mt-1 flex-shrink-0 text-[#B42332]" />
                          <span>{formatDateRange(event)}</span>
                        </div>

                        <div className="flex items-start gap-3">
                          <FaClock className="mt-1 flex-shrink-0 text-[#B42332]" />
                          <span>{event.time}</span>
                        </div>

                        {event.location && (
                          <div className="flex items-start gap-3">
                            <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-[#B42332]" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>

                      <p className="mt-5 flex-1 text-sm leading-7 text-gray-600">
                        {event.description}
                      </p>

                      <div className="calendar-action-container relative mt-6">
                        <button
                          type="button"
                          aria-expanded={selectedEvent === event.id}
                          onClick={() => {
                            setCalendarError("");
                            setSelectedEvent((current) =>
                              current === event.id ? null : event.id
                            );
                          }}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#17365D] px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#B42332] focus:outline-none focus:ring-2 focus:ring-[#B42332] focus:ring-offset-2"
                        >
                          <FaCalendarPlus />
                          Add to Calendar
                        </button>

                        <AnimatePresence>
                          {selectedEvent === event.id && (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 5, scale: 0.98 }}
                              transition={{ duration: 0.18 }}
                              className="absolute bottom-full left-0 z-20 mb-2 w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl"
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  handleCalendarAction(event, "google")
                                }
                                className="flex w-full items-center gap-3 px-4 py-3.5 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-[#17365D]"
                              >
                                <FaGoogle className="text-blue-600" />
                                Add to Google Calendar
                              </button>

                              <div className="h-px bg-gray-100" />

                              <button
                                type="button"
                                onClick={() =>
                                  handleCalendarAction(event, "download")
                                }
                                className="flex w-full items-center gap-3 px-4 py-3.5 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-[#B42332]"
                              >
                                <FaDownload className="text-[#B42332]" />
                                Download calendar file
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                <FaCalendarAlt className="text-2xl text-[#17365D]" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#17365D]">
                No events found
              </h3>

              <p className="mx-auto mt-3 max-w-md leading-7 text-gray-600">
                No events match your search. Try another keyword or change the
                selected category.
              </p>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#B42332] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#941D2A]"
                >
                  Clear Filters
                  <FaArrowRight />
                </button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact call to action */}
      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl rounded-3xl border border-blue-100 bg-blue-50/70 p-7 text-center sm:p-10 lg:p-14">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#B42332]">
            Stay Connected
          </p>

          <h2 className="font-serif text-2xl font-bold text-[#17365D] sm:text-3xl md:text-4xl">
            Want to Know More About Our Events?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            Contact the church for more information about our gatherings and
            activities.
          </p>

          <Link
            to="/contact"
            className="mt-7 inline-flex items-center justify-center gap-3 rounded-xl bg-[#B42332] px-7 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#941D2A] hover:shadow-lg"
          >
            Contact the Church
            <FaArrowRight />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Events;
