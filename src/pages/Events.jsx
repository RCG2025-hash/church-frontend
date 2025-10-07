import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaSearch, FaFilter, FaGoogle, FaDownload, FaCalendarPlus, FaTimes } from "react-icons/fa";
import women_con from "../assets/women_con.jpg";
import jacobian from "../assets/Jacobian_img.jpg";
import men_con from "../assets/Mens_main_con.jpg";
import youth_con from "../assets/youth_con.jpg";
import church_con from "../assets/church_con.jpg";

// Calendar utility function (same as before)
const addToCalendar = (event) => {
  const { title, date, endDate, time, location, description } = event;
  
  const formatDate = (dateString, timeString) => {
    const dateObj = new Date(dateString);
    if (timeString) {
      const [time, modifier] = timeString.split(' ');
      let [hours, minutes] = time.split(':');
      
      if (modifier === 'PM' && hours !== '12') {
        hours = parseInt(hours, 10) + 12;
      }
      if (modifier === 'AM' && hours === '12') {
        hours = '00';
      }
      
      dateObj.setHours(parseInt(hours, 10), parseInt(minutes, 10) || 0);
    }
    
    return dateObj.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const createICS = () => {
    const start = formatDate(date, time);
    const end = endDate ? formatDate(endDate, time) : formatDate(date, time);
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Reconciliation Church//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@reconciliationchurch.org`,
      `DTSTAMP:${formatDate(new Date().toISOString().split('T')[0])}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${title}`,
      `LOCATION:${location || 'Reconciliation Church'}`,
      `DESCRIPTION:${description || 'Church Event'}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');
    
    return encodeURI(`data:text/calendar;charset=utf-8,${icsContent}`);
  };

  const createGoogleCalendarURL = () => {
    const startTime = formatDate(date, time);
    const endTime = endDate ? formatDate(endDate, time) : formatDate(date, time);
    
    const formatForGoogle = (dateStr) => {
      return dateStr.slice(0, 8) + 'T' + dateStr.slice(9, 15) + 'Z';
    };
    
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: `${formatForGoogle(startTime)}/${formatForGoogle(endTime)}`,
      details: description || 'Church Event',
      location: location || 'Reconciliation Church',
      trp: 'false'
    });
    
    return `https://calendar.google.com/calendar/render?${params}`;
  };

  const downloadICS = () => {
    const link = document.createElement('a');
    link.href = createICS();
    link.download = `${title.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    downloadICS,
    googleCalendarURL: createGoogleCalendarURL()
  };
};

// Sample events data
const eventsData = [
  {
    id: 1,
    title: "Women's Convention",
    date: "2025-03-05",
    endDate: "2025-03-09",
    time: "9:00 AM",
    location: "Church Auditorium",
    description: "A special gathering for women of faith to connect, grow, and be empowered through worship and teaching.",
    category: "Convention",
    image: women_con
  },
  {
    id: 2,
    title: "Jacobian Experience",
    date: "2025-04-18",
    endDate: "2025-04-20",
    time: "9:00 AM",
    location: "Ofada",
    description: "The SEASON of RESURRECTION is here again and the opportunity to pray your way to BREAKTHROUGH at the JACOBIAN EXPERIENCE.",
    category: "Easter Retreat",
    image: jacobian
  },
  {
    id: 3,
    title: "Men's Convention",
    date: "2025-06-13",
    endDate: "2025-06-15",
    time: "9:00 AM",
    location: "Church Auditorium",
    description: "A gathering for men to strengthen their faith, build fellowship, and grow as spiritual leaders.",
    category: "Convention",
    image: men_con
  },
  {
    id: 4,
    title: "Youth Convention",
    date: "2025-08-29",
    endDate: "2025-08-31",
    time: "9:00 AM",
    location: "Church Auditorium",
    description: "An energetic gathering for youth to connect with God and each other through worship, teaching, and fellowship.",
    category: "Convention",
    image: youth_con
  },
  {
    id: 5,
    title: "Church Convention",
    date: "2025-10-21",
    endDate: "2025-10-26",
    time: "9:00 AM",
    location: "Church Auditorium",
    description: "Our annual church convention with special guests, powerful teachings, and spirit-filled worship.",
    category: "Convention",
    image: church_con
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState(eventsData);
  const dropdownRef = useRef(null);
  
  // Get all unique categories from eventsData
  const categories = ["All", ...new Set(eventsData.map(event => event.category))];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSelectedEvent(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filtering logic
  useEffect(() => {
    let result = [...eventsData];
    
    // Apply category filter only if not "All"
    if (selectedCategory !== "All") {
      result = result.filter(event => event.category === selectedCategory);
    }
    
    // Apply search filter only if there's a search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.description.toLowerCase().includes(query) ||
        (event.location && event.location.toLowerCase().includes(query))
      );
    }
    
    setFilteredEvents(result);
  }, [searchQuery, selectedCategory]);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Handle calendar actions
  const handleCalendarAction = (event, action) => {
    const calendarActions = addToCalendar(event);
    if (action === 'google') {
      window.open(calendarActions.googleCalendarURL, '_blank');
    } else if (action === 'download') {
      calendarActions.downloadICS();
    }
    setSelectedEvent(null);
  };

  // Toggle calendar dropdown
  const toggleCalendarDropdown = (eventId) => {
    setSelectedEvent(selectedEvent === eventId ? null : eventId);
  };

  // Clear search function
  const clearSearch = () => {
    setSearchQuery("");
  };

  // Clear category filter
  const clearCategory = () => {
    setSelectedCategory("All");
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <section id="events" className="min-h-screen pt-20 bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-amber-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold font-serif mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Church Events
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join us for worship, fellowship, and spiritual growth
          </motion.p>
        </div>
      </div>

      {/* Events Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">Upcoming Events</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Mark your calendar and join us for these special gatherings
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search events by title, description, or location..."
                  className="pl-10 pr-10 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <FaTimes className="text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>

              <div className="relative w-full md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
                <select
                  className="pl-10 pr-10 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {selectedCategory !== "All" && (
                  <button
                    onClick={clearCategory}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <FaTimes className="text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Active filters display */}
            {(searchQuery || selectedCategory !== "All") && (
              <div className="mt-4 flex flex-wrap gap-2">
                {searchQuery && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                    Search: "{searchQuery}"
                    <button
                      onClick={clearSearch}
                      className="ml-1 text-amber-600 hover:text-amber-800"
                    >
                      <FaTimes className="text-xs" />
                    </button>
                  </span>
                )}
                {selectedCategory !== "All" && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Category: {selectedCategory}
                    <button
                      onClick={clearCategory}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <FaTimes className="text-xs" />
                    </button>
                  </span>
                )}
                {(searchQuery || selectedCategory !== "All") && (
                  <button
                    onClick={clearAllFilters}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </motion.div>

          {/* Events Count */}
          <motion.div 
            className="mb-6"
            key={`count-${filteredEvents.length}-${searchQuery}-${selectedCategory}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-gray-700">
              {searchQuery || selectedCategory !== "All" ? (
                <>
                  Found {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
                  {searchQuery && ` matching "${searchQuery}"`}
                  {selectedCategory !== "All" && ` in ${selectedCategory}`}
                </>
              ) : (
                `Showing all ${filteredEvents.length} church events`
              )}
            </p>
          </motion.div>

          {/* Events Grid with Safe Animations */}
          {filteredEvents.length > 0 ? (
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              key={`grid-${filteredEvents.length}-${searchQuery}-${selectedCategory}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-48 object-cover" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-amber-600 text-white text-sm font-medium rounded-full">
                        {event.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <FaCalendarAlt className="mr-2 text-amber-600" />
                      <span className="text-sm">
                        {formatDate(event.date)}
                        {event.endDate && ` - ${formatDate(event.endDate)}`}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <svg className="w-4 h-4 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{event.time}</span>
                    </div>
                    
                    {event.location && (
                      <div className="flex items-center text-gray-600 mb-4">
                        <svg className="w-4 h-4 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{event.location}</span>
                      </div>
                    )}
                    
                    <p className="text-gray-700 mb-4 text-sm">{event.description}</p>
                    
                    <div ref={dropdownRef} className="relative inline-block w-full">
                      <button 
                        onClick={() => toggleCalendarDropdown(event.id)}
                        className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                      >
                        <FaCalendarPlus className="mr-2" />
                        Add to Calendar
                      </button>
                      
                      {selectedEvent === event.id && (
                        <motion.div 
                          className="absolute bottom-full left-0 mb-2 w-full bg-white rounded-lg shadow-lg z-10 border border-gray-200"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="py-1">
                            <button
                              onClick={() => handleCalendarAction(event, 'google')}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <FaGoogle className="mr-2 text-blue-500" />
                              Add to Google Calendar
                            </button>
                            <button
                              onClick={() => handleCalendarAction(event, 'download')}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <FaDownload className="mr-2 text-green-500" />
                              Download ICS File
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <FaCalendarAlt className="text-4xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || selectedCategory !== "All" 
                  ? "No events match your search criteria. Try adjusting your filters." 
                  : "There are no upcoming events at this time"}
              </p>
              {(searchQuery || selectedCategory !== "All") && (
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Events;