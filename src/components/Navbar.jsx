import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaChurch } from "react-icons/fa";
import churchLogo from "../assets/church_logo.png";

// Split navLinks into main links and more links
const mainLinks = [
  { id: "home", label: "Home", path: "/" },
  { id: "about", label: "About", path: "/about" },
  { id: "pastors", label: "Pastors", path: "/pastors" },
  { id: "events", label: "Events", path: "/events" },
  { id: "live", label: "Live", path: "/live" },
  { id: "donation", label: "Donate", path: "/donation" },
];

const moreLinks = [
  { id: "joinworkforce", label: "Join Us", path: "/joinworkforce" },
  { id: "newmember", label: "New Members", path: "/newmember" },
  { id: "contact", label: "Contact", path: "/contact" },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll("section[id]");
      let currentSection = "";
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = sectionId;
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Also set active section based on current route
  useEffect(() => {
    const currentPath = location.pathname.replace("/", "");
    if (currentPath === "") {
      setActiveSection("home");
    } else {
      setActiveSection(currentPath);
    }
  }, [location]);

  const scrollToSection = (id) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.getElementById(id);
      if (section) {
        const yOffset = -80; // Adjust for navbar height
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
    setIsOpen(false);
    setDropdownOpen(false);
  };

  const handleMoreClick = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
    setDropdownOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
          : "bg-gradient-to-b from-gray-900/80 to-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => scrollToSection("home")}
            className="flex items-center space-x-2 text-2xl font-serif font-bold text-white"
          >
            <img src={churchLogo} alt="" style={{width:'70px'}}/>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {mainLinks.map(({ id, label, path }) => (
              <Link
                key={id}
                to={path}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(id);
                }}
                className={`px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 ${
                  activeSection === id
                    ? "bg-amber-600 text-white shadow-md"
                    : isScrolled
                    ? "text-gray-700 hover:text-amber-600 hover:bg-gray-100"
                    : "text-white hover:text-amber-300 hover:bg-white/10"
                }`}
              >
                {label}
              </Link>
            ))}
            
            {/* More Dropdown for Desktop */}
            <div className="relative group">
              <button 
                className={`px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 flex items-center space-x-1 ${
                  moreLinks.some(link => link.id === activeSection)
                    ? "bg-amber-600 text-white shadow-md"
                    : isScrolled
                    ? "text-gray-700 hover:text-amber-600 hover:bg-gray-100"
                    : "text-white hover:text-amber-300 hover:bg-white/10"
                }`}
              >
                <span>More</span>
                <span className="text-sm transform group-hover:rotate-180 transition-transform">▼</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-200">
                {moreLinks.map(({ id, label, path }) => (
                  <Link
                    key={id}
                    to={path}
                    onClick={(e) => handleMoreClick(e, id)}
                    className={`block px-4 py-3 text-base font-medium transition-colors border-b border-gray-100 last:border-b-0 ${
                      activeSection === id
                        ? "bg-amber-50 text-amber-600 font-semibold"
                        : "text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                    } first:rounded-t-lg last:rounded-b-lg`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-md text-2xl transition-colors ${
              isScrolled
                ? "text-gray-800 hover:bg-gray-100"
                : "text-white hover:bg-white/20"
            }`}
            aria-label="Toggle Menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation Menu - Simple Scroll Solution */}
<div
  className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
    isOpen
      ? "max-h-[80vh] opacity-100 mt-4"
      : "max-h-0 opacity-0"
  } ${isScrolled ? "bg-white/95" : "bg-gray-900/95"} rounded-lg backdrop-blur-md`}
>
  <div className="max-h-[70vh] overflow-y-auto px-2 pt-2 pb-4 space-y-1">
    {/* Main Links */}
    {mainLinks.map(({ id, label, path }) => (
      <Link
        key={id}
        to={path}
        onClick={(e) => {
          e.preventDefault();
          scrollToSection(id);
        }}
        className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
          activeSection === id
            ? "bg-amber-600 text-white"
            : isScrolled
            ? "text-gray-700 hover:bg-gray-100"
            : "text-white hover:bg-white/10"
        }`}
      >
        {label}
      </Link>
    ))}
    
    {/* More Links Section with Dropdown */}
    <div className={`border-t ${
      isScrolled ? "border-gray-300" : "border-gray-600"
    } pt-3 mt-2`}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors flex items-center justify-between ${
          moreLinks.some(link => link.id === activeSection)
            ? "bg-amber-600 text-white"
            : isScrolled
            ? "text-gray-700 hover:bg-gray-100"
            : "text-white hover:bg-white/10"
        }`}
      >
        <span>More</span>
        <span className="text-sm transform transition-transform">
          {dropdownOpen ? "▲" : "▼"}
        </span>
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ${
        dropdownOpen ? "max-h-[500px] mt-2" : "max-h-0"
      }`}>
        <div className="space-y-1">
          {moreLinks.map(({ id, label, path }) => (
            <Link
              key={id}
              to={path}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(id);
                setIsOpen(false);
              }}
              className={`block px-6 py-3 rounded-lg text-base font-medium transition-colors ${
                activeSection === id
                  ? "bg-amber-600 text-white"
                  : isScrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>
      </div>
    </nav>
  );
}

export default Navbar;