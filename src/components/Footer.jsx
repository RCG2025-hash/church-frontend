
import {
  FaChurch,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPrayingHands,
  FaTiktok,
  FaArrowRight,
  FaClock,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import church_logo from "../assets/church_logo.png";

function Footer() {
  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Our Pastors", to: "/pastors" },
    { label: "Events", to: "/events" },
    { label: "Live Services", to: "/live" },
    { label: "Giving", to: "/donation" },
    { label: "Join Our Workforce", to: "/joinworkforce" },
    { label: "New Member", to: "/newmember" },
    { label: "Contact Us", to: "/contact" },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      href: "https://www.facebook.com/share/1CSuncwTv8/?mibextid=wwXIfr",
      icon: FaFacebookF,
    },
    {
      label: "Instagram",
      href: null,
      icon: FaInstagram,
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/channel/UCxWcOs-pauiAXgDE_59uPww",
      icon: FaYoutube,
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@rcghisgrace",
      icon: FaTiktok,
    },
  ];

  const serviceTimes = [
    {
      day: "Sunday Worship",
      time: "8:30 AM – 11:30 AM",
    },
    {
      day: "Bible Study",
      time: "Tuesday, 6:00 PM – 7:30 PM",
    },
    {
      day: "Divine Solution Hour",
      time: "Thursday, 8:30 AM – 10:00 AM",
    },
    {
      day: "Night Vigil",
      time: "Last Friday monthly, 11 PM – 4 AM",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#07152f] text-white">
      {/* Decorative Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-red-600/10 blur-3xl"
      />

      {/* Welcome Section */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600/15 text-red-400">
              <FaChurch className="text-xl" />
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold sm:text-2xl">
                You Are Always Welcome
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                Join our church family as we grow in faith, serve
                others, and experience God's love together.
              </p>
            </div>
          </div>

          <Link
            to="/contact"
            className="inline-flex w-fit shrink-0 items-center justify-center gap-3 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/30"
          >
            Get in Touch
            <FaArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Church Information */}
          <div className="min-w-0">
            <Link
              to="/"
              aria-label="Reconciliation Church of God home"
              className="group flex w-fit items-center gap-3"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white p-2">
                <img
                  src={church_logo}
                  alt="Reconciliation Church of God logo"
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <h2 className="font-serif text-lg font-bold leading-tight text-white transition group-hover:text-red-300">
                  Reconciliation Church of God
                </h2>

                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-red-400">
                  HisGrace Chapel
                </p>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-7 text-slate-300">
              A community of believers dedicated to serving Christ,
              loving people, and transforming lives through the
              power of the Gospel.
            </p>

            <h3 className="mt-6 text-sm font-semibold text-white">
              Connect with us
            </h3>

            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                if (!social.href) {
                  return (
                    <span
                      key={social.label}
                      title={`${social.label} link not configured`}
                      aria-label={`${social.label} link not configured`}
                      className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-500"
                    >
                      <Icon aria-hidden="true" />
                    </span>
                  );
                }

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${social.label} page`}
                    title={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition duration-300 hover:-translate-y-1 hover:border-red-500 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-500/30"
                  >
                    <Icon aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="min-w-0">
            <h3 className="flex items-center gap-3 text-base font-bold">
              <span className="h-6 w-1 rounded-full bg-red-500" />
              Quick Links
            </h3>

            <ul className="mt-6 space-y-3">
              {quickLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
                  >
                    <FaArrowRight
                      aria-hidden="true"
                      className="text-[10px] text-red-500 transition-transform group-hover:translate-x-1"
                    />

                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Service Times */}
          <div className="min-w-0">
            <h3 className="flex items-center gap-3 text-base font-bold">
              <span className="h-6 w-1 rounded-full bg-red-500" />
              <FaPrayingHands className="text-red-400" />
              Service Times
            </h3>

            <div className="mt-6 space-y-5">
              {serviceTimes.map((service) => (
                <div
                  key={service.day}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-red-400">
                    <FaClock
                      aria-hidden="true"
                      className="text-sm"
                    />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-white">
                      {service.day}
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {service.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Contact Us */}
          <div className="min-w-0">
            <h3 className="flex items-center gap-3 text-base font-bold">
              <span className="h-6 w-1 rounded-full bg-red-500" />
              Contact Us
            </h3>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-red-400">
                  <FaMapMarkerAlt aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-white">
                    Our Address
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    Plot 1, Denro Ishasi Road, Akute via Ojodu Berger
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-red-400">
                  <FaPhone aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-white">
                    Phone Number
                  </h4>

                  <a
                    href="tel:+2348033074562"
                    className="mt-1 inline-block break-words text-sm text-slate-300 transition hover:text-red-300"
                  >
                    +234-8033074562
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-red-400">
                  <FaEnvelope aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-white">
                    Email Address
                  </h4>

                  <a
                    href="mailto:help@HisGracercg.org"
                    className="mt-1 inline-block break-all text-sm text-slate-300 transition hover:text-red-300"
                  >
                    help@HisGracercg.org
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="relative border-t border-white/10 bg-black/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <p className="text-xs leading-6 text-slate-400 sm:text-sm">
            &copy; {new Date().getFullYear()} Reconciliation Church
            of God. All Rights Reserved.
          </p>

          <p className="text-xs leading-6 text-slate-400 sm:text-sm">
            Designed and Developed by{" "}
            <span className="font-semibold text-red-400">
              RCG IT/MEDIA DEPARTMENT
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;