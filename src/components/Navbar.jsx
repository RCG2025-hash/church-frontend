
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

import churchLogo from "../assets/church_logo.png";

const mainLinks = [
  { label: "Home", path: "/", end: true },
  { label: "About", path: "/about" },
  { label: "Pastors", path: "/pastors" },
  { label: "Events", path: "/events" },
  { label: "Live", path: "/live" },
  { label: "Donate", path: "/donation" },
];

const moreLinks = [
  { label: "Join Us", path: "/joinworkforce" },
  { label: "New Members", path: "/newmember" },
  { label: "Contact", path: "/contact" },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();

  // Change navbar appearance when scrolling.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menus whenever the visitor changes pages.
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // Close the mobile menu when switching to desktop width.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm xl:text-base font-semibold
    transition-all duration-200 ${
      isActive
        ? "bg-[#B42332] text-white shadow-sm"
        : isScrolled
        ? "text-[#17365D] hover:bg-blue-50 hover:text-[#B42332]"
        : "text-white hover:bg-white/15 hover:text-white"
    }`;

  const moreIsActive = moreLinks.some(
    (link) => location.pathname === link.path
  );

  const mobileLinkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-3 text-sm font-semibold
    transition-colors duration-200 ${
      isActive
        ? "bg-[#B42332] text-white shadow-sm"
        : "text-[#17365D] hover:bg-blue-50 hover:text-[#B42332]"
    }`;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 py-2 shadow-md backdrop-blur-lg"
          : "bg-[#102844]/90 py-3 shadow-sm backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[64px] items-center justify-between gap-4">
          {/* Church logo */}
          <Link
            to="/"
            aria-label="Reconciliation Church of God home"
            onClick={() => {
              setIsOpen(false);
              setDropdownOpen(false);
            }}
            className="flex shrink-0 items-center"
          >
            <img
              src={churchLogo}
              alt="Reconciliation Church of God"
              className="h-14 w-auto max-w-[180px] object-contain transition-transform duration-300 hover:scale-[1.03] sm:h-16"
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {mainLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.end}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            ))}

            {/* Desktop More dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setDropdownOpen((open) => !open)
                }
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 xl:text-base ${
                  moreIsActive
                    ? "bg-[#B42332] text-white"
                    : isScrolled
                    ? "text-[#17365D] hover:bg-blue-50 hover:text-[#B42332]"
                    : "text-white hover:bg-white/15"
                }`}
              >
                <span>More</span>

                <FaChevronDown
                  className={`text-xs transition-transform duration-300 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                      scale: 0.98,
                    }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full z-50 mt-3 w-52 origin-top-right overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-xl"
                  >
                    {moreLinks.map((link) => (
                      <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                          `block px-5 py-3 text-sm font-medium transition-colors duration-200 ${
                            isActive
                              ? "bg-red-50 text-[#B42332]"
                              : "text-gray-700 hover:bg-blue-50 hover:text-[#17365D]"
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => {
              setIsOpen((open) => !open);
              setDropdownOpen(false);
            }}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl transition-colors duration-200 lg:hidden ${
              isScrolled
                ? "text-[#17365D] hover:bg-blue-50"
                : "text-white hover:bg-white/15"
            }`}
            aria-label={
              isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? "close" : "menu"}
                initial={{
                  opacity: 0,
                  rotate: -90,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: 90,
                  scale: 0.7,
                }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-center"
              >
                {isOpen ? <FaTimes /> : <FaBars />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* Animated mobile navigation */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id="mobile-navigation"
              key="mobile-navigation"
              initial={{
                opacity: 0,
                height: 0,
                y: -12,
              }}
              animate={{
                opacity: 1,
                height: "auto",
                y: 0,
              }}
              exit={{
                opacity: 0,
                height: 0,
                y: -8,
              }}
              transition={{
                height: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
                opacity: { duration: 0.2 },
                y: {
                  duration: 0.25,
                  ease: "easeOut",
                },
              }}
              className="mt-3 overflow-hidden lg:hidden"
            >
              <div className="max-h-[70vh] overflow-y-auto rounded-xl border border-gray-100 bg-white p-3 shadow-xl">
                {/* Main mobile links */}
                <div className="space-y-1">
                  {mainLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.22,
                        delay: index * 0.045,
                      }}
                    >
                      <NavLink
                        to={link.path}
                        end={link.end}
                        className={mobileLinkClass}
                      >
                        {link.label}
                      </NavLink>
                    </motion.div>
                  ))}
                </div>

                {/* Additional mobile links */}
                <div className="my-3 border-t border-gray-200 pt-3">
                  <p className="px-4 pb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                    More
                  </p>

                  <div className="space-y-1">
                    {moreLinks.map((link, index) => (
                      <motion.div
                        key={link.path}
                        initial={{
                          opacity: 0,
                          x: -15,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          duration: 0.22,
                          delay:
                            (mainLinks.length + index) * 0.045,
                        }}
                      >
                        <NavLink
                          to={link.path}
                          className={mobileLinkClass}
                        >
                          {link.label}
                        </NavLink>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;
