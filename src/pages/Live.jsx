
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaChurch,
  FaClock,
  FaCalendarAlt,
  FaArrowRight,
  FaExternalLinkAlt,
  FaWifi,
  FaEnvelope,
  FaPlay,
} from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

const streamingPlatforms = [
  {
    name: "Facebook",
    icon: FaFacebook,
    url: "https://www.facebook.com/share/1CpmwGazKi/",
    description: "Join our Facebook page for live services and church updates.",
    available: true,
    featured: true,
    iconColor: "text-blue-600",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    url: "https://www.youtube.com/channel/UCxWcOs-pauiAXgDE_59uPww",
    description: "Visit our YouTube channel for available church videos.",
    available: true,
    featured: false,
    iconColor: "text-red-600",
  },
  {
    name: "TikTok",
    icon: FaTiktok,
    url: "https://www.tiktok.com/@rcghisgrace?_r=1&_t=ZP-95mCrms8szW",
    description: "Follow our TikTok page for church content and updates.",
    available: true,
    featured: false,
    iconColor: "text-gray-900",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    url: "",
    description: "Our Instagram live link is not available yet.",
    available: false,
    featured: false,
    iconColor: "text-pink-600",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

function getNextSundayService() {
  const now = new Date();
  const service = new Date(now);

  // Sunday is day 0. Select today's service only if it has not started.
  let daysUntilSunday = (7 - now.getDay()) % 7;

  service.setDate(now.getDate() + daysUntilSunday);
  service.setHours(8, 30, 0, 0);

  if (service <= now) {
    service.setDate(service.getDate() + 7);
  }

  return service;
}

function formatServiceDate(date) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const sameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

  if (sameDay(date, today)) return "Today";
  if (sameDay(date, tomorrow)) return "Tomorrow";

  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Live() {
  const [nextService, setNextService] = useState(() =>
    getNextSundayService()
  );

  useEffect(() => {
    // Refresh the next service time periodically in case the page stays open.
    const refreshService = () => setNextService(getNextSundayService());

    const interval = window.setInterval(refreshService, 60000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-white">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#102844] py-20 text-white sm:py-24 lg:py-28">
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
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm"
          >
            <FaChurch className="text-red-300" />
            Reconciliation Church of God Intl.
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
          >
            Worship With Us
            <span className="block text-red-300">From Anywhere</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-base leading-8 text-blue-100 sm:text-lg md:text-xl"
          >
            Stay connected to our church family through online services,
            worship, and spiritual messages.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href={streamingPlatforms[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#B42332] px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#941D2A] sm:w-auto"
            >
              <FaPlay />
              Visit Facebook Live
              <FaExternalLinkAlt className="text-xs" />
            </a>

            <a
              href={streamingPlatforms[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-white/20 sm:w-auto"
            >
              <FaYoutube className="text-xl" />
              Visit YouTube
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Streaming status */}
      <section className="px-5 pt-10 sm:px-8 sm:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm"
        >
          <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50">
                <FaWifi className="text-2xl text-[#17365D]" />
              </div>

              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-600">
                  <span className="h-2 w-2 rounded-full bg-gray-400" />
                  Stream status unconfirmed
                </span>

                <h2 className="mt-3 text-xl font-bold text-[#17365D] sm:text-2xl">
                  Join Our Online Service
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
                  We cannot automatically verify whether a broadcast is
                  currently live. Visit our Facebook page to check for the
                  current service.
                </p>
              </div>
            </div>

            <a
              href={streamingPlatforms[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#17365D] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#B42332]"
            >
              Check Facebook
              <FaArrowRight />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Next service */}
      <section className="px-5 py-14 sm:px-8 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-7xl"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-[#17365D] p-6 text-white sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <FaCalendarAlt className="text-xl text-red-300" />
              </div>

              <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-blue-200">
                Next Sunday Service
              </p>

              <h2 className="mt-3 font-serif text-2xl font-bold sm:text-3xl">
                {formatServiceDate(nextService)}
              </h2>

              <div className="mt-5 flex items-center gap-3 text-blue-100">
                <FaClock className="text-red-300" />
                <span>8:30 AM</span>
              </div>

              <p className="mt-4 text-sm leading-7 text-blue-100">
                Local time. Check our Facebook page closer to the service
                for live-stream availability.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                <FaChurch className="text-xl text-[#B42332]" />
              </div>

              <h2 className="mt-6 font-serif text-2xl font-bold text-[#17365D] sm:text-3xl">
                Worship Together
              </h2>

              <p className="mt-4 leading-8 text-gray-600">
                Whether you are at home or far away, we invite you to connect
                with our church family and participate in our online services
                whenever a stream is available.
              </p>

              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-2 font-semibold text-[#B42332] transition-colors hover:text-[#17365D]"
              >
                Contact the Church
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Streaming platforms */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-12 text-center"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#B42332]">
              Stay Connected
            </p>

            <h2 className="font-serif text-3xl font-bold text-[#17365D] sm:text-4xl">
              Find Us Online
            </h2>

            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#B42332]" />

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg">
              Please use our Facebook link for live services. Other platforms
              may have different content or may not yet be fully active.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {streamingPlatforms.map((platform, index) => {
              const Icon = platform.icon;

              const card = (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={platform.available ? { y: -6 } : {}}
                  className={`flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 ${
                    platform.available
                      ? "border-gray-100 hover:border-blue-100 hover:shadow-xl"
                      : "border-dashed border-gray-200 opacity-80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50">
                      <Icon className={`text-3xl ${platform.iconColor}`} />
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        platform.available
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {platform.available ? "Available" : "Coming soon"}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-[#17365D]">
                    {platform.name}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-gray-600">
                    {platform.description}
                  </p>

                  <div
                    className={`mt-6 inline-flex items-center gap-2 font-semibold ${
                      platform.available
                        ? "text-[#B42332]"
                        : "text-gray-400"
                    }`}
                  >
                    {platform.available ? "Visit page" : "Not available yet"}
                    {platform.available && <FaArrowRight />}
                  </div>
                </motion.div>
              );

              return platform.available ? (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${platform.name} page`}
                  className="block rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#B42332] focus:ring-offset-2"
                >
                  {card}
                </a>
              ) : (
                <div key={platform.name}>{card}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Help section */}
      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-5xl rounded-3xl border border-blue-100 bg-blue-50/70 p-7 text-center sm:p-10 lg:p-14"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
            <FaEnvelope className="text-2xl text-[#B42332]" />
          </div>

          <p className="mb-3 mt-5 text-sm font-bold uppercase tracking-[0.2em] text-[#B42332]">
            We're Here to Help
          </p>

          <h2 className="font-serif text-2xl font-bold text-[#17365D] sm:text-3xl md:text-4xl">
            Need Help Connecting?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600 sm:text-lg">
            If you experience difficulties joining our online services, you
            can contact our listed technical support email.
          </p>

          <a
            href="mailto:help@hisgracercg.org"
            className="mt-7 inline-flex items-center justify-center gap-3 rounded-xl bg-[#17365D] px-6 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#B42332]"
          >
            <FaEnvelope />
            Email Technical Support
          </a>
        </motion.div>
      </section>
    </main>
  );
}

export default Live;