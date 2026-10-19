
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaChurch,
  FaPray,
  FaUsers,
  FaHandsHelping,
  FaTimes,
  FaArrowRight,
  FaCross,
} from "react-icons/fa";

import GenOver from "../assets/GenOver.jpg";
import MotherInIsrael from "../assets/Pas_Mrs_Oke.jpg";
import AssemPastor from "../assets/PasJ.jpg";
import PastorSegun from "../assets/Pas_Adedeji.jpg";
import PastorElizabeth from "../assets/Pst_Mrs_Adedeji.jpg";
import PastorGbenga from "../assets/Pas_Ogunleke.jpg";
import YouthPastor from "../assets/Mrs_Jegede.jpg";

const pastors = [
  {
    id: 1,
    name: "Rev. Chris Tunde Oke",
    role: "General Overseer",
    image: GenOver,
    bio: "Leading our church with vision and dedication for over 20 years.",
  },
  {
    id: 2,
    name: "Pastor (Mrs) Folashade Oke",
    role: "Mother-in-Israel",
    image: MotherInIsrael,
    bio: "Providing spiritual guidance and nurturing our church family.",
  },
  {
    id: 3,
    name: "Pastor Joshua Jegede",
    role: "Assembly Pastor",
    image: AssemPastor,
    bio: "Overseeing our assembly with dedication and spiritual wisdom.",
  },
  {
    id: 4,
    name: "Pastor Segun Adedeji",
    role: "Pastor",
    image: PastorSegun,
    bio: "Serving the congregation with compassion and biblical teaching.",
  },
  {
    id: 5,
    name: "Pastor (Mrs) Elizabeth Adedeji",
    role: "Pastor",
    image: PastorElizabeth,
    bio: "Ministering to women and families with grace and wisdom.",
  },
  {
    id: 6,
    name: "Pastor Gbenga Ogunleke",
    role: "Ofada Branch Pastor",
    image: PastorGbenga,
    bio: "Leading our Ofada congregation with faith and commitment.",
  },
  {
    id: 7,
    name: "Pastor (Mrs) Funmilayo Jegede",
    role: "Youth Pastor",
    image: YouthPastor,
    bio: "Empowering the next generation to live out their faith boldly.",
  },
];

const leadershipValues = [
  {
    icon: FaPray,
    title: "Spiritual Guidance",
    description: "Providing biblical direction for life's journey.",
  },
  {
    icon: FaUsers,
    title: "Pastoral Care",
    description:
      "Supporting our congregation through all seasons of life.",
  },
  {
    icon: FaHandsHelping,
    title: "Servant Leadership",
    description:
      "Leading by example with humility and compassion.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function Pastors() {
  const [selectedPastor, setSelectedPastor] = useState(null);

  // Allow the profile modal to close with the Escape key.
  useEffect(() => {
    if (!selectedPastor) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedPastor(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPastor]);

  return (
    <main className="min-h-screen overflow-hidden bg-white pt-20">
      {/* Hero section */}
      <section className="relative isolate overflow-hidden bg-[#102844] py-20 text-white sm:py-24 lg:py-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#102844] via-[#17365D] to-[#263D60]" />

        <div className="absolute -right-20 -top-24 -z-10 h-80 w-80 rounded-full bg-[#B42332]/25 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 -z-10 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
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
            Our Church
            <span className="block text-red-300">Leadership</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-base leading-8 text-blue-100 sm:text-lg md:text-xl"
          >
            Meet the dedicated servants guiding our church family.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mx-auto mt-8 h-1 w-20 rounded-full bg-[#B42332]"
          />
        </motion.div>
      </section>

      {/* Introduction and leadership values */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#B42332]">
              Serving With Purpose
            </p>

            <h2 className="font-serif text-3xl font-bold text-[#17365D] sm:text-4xl">
              Meet Our Pastoral Team
            </h2>

            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#B42332]" />

            <p className="mt-5 text-base leading-8 text-gray-600 sm:text-lg">
              Our pastors are dedicated to serving the congregation with love,
              wisdom, and biblical teaching.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {leadershipValues.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.article
                  key={value.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.12,
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="group rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-8"
                >
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 transition-colors duration-300 group-hover:bg-[#17365D]">
                    <Icon className="text-2xl text-[#17365D] transition-colors duration-300 group-hover:text-white" />
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-[#17365D]">
                    {value.title}
                  </h3>

                  <p className="leading-7 text-gray-600">
                    {value.description}
                  </p>

                  <div className="mx-auto mt-5 h-1 w-10 rounded-full bg-[#B42332] transition-all duration-300 group-hover:w-20" />
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pastors grid */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#B42332]">
              Our Leaders
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-serif text-3xl font-bold text-[#17365D] sm:text-4xl">
                  Meet Our Pastors
                </h2>
                <p className="mt-3 max-w-2xl leading-7 text-gray-600">
                  Get to know the people serving our church and congregation.
                </p>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-[#17365D]">
                <FaUsers className="text-[#B42332]" />
                {pastors.length} Church Leaders
              </div>
            </div>

            <div className="mt-5 h-1 w-20 rounded-full bg-[#B42332]" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {pastors.map((pastor) => (
              <motion.article
                key={pastor.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 },
                  },
                }}
                whileHover={{ y: -6 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="relative overflow-hidden bg-gray-100">
                  <img
                    src={pastor.image}
                    alt={pastor.name}
                    loading="lazy"
                    className="h-[320px] w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 sm:h-[350px]"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#102844]/70 to-transparent" />

                  <div className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-white/95 px-3 py-1.5 text-xs font-bold text-[#17365D] shadow-sm">
                    {pastor.role}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-lg font-bold leading-snug text-[#17365D] sm:text-xl">
                    {pastor.name}
                  </h3>

                  <div className="mb-4 mt-3 h-1 w-10 rounded-full bg-[#B42332] transition-all duration-300 group-hover:w-16" />

                  <p className="mb-5 flex-1 text-sm leading-7 text-gray-600">
                    {pastor.bio}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedPastor(pastor)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#17365D] px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#B42332] focus:outline-none focus:ring-2 focus:ring-[#B42332] focus:ring-offset-2"
                  >
                    View Profile
                    <FaArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bible verse */}
      <section className="relative isolate overflow-hidden bg-[#17365D] py-16 text-white sm:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#102844] via-[#17365D] to-[#243F67]" />
        <div className="absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-[#B42332]/20 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl px-5 text-center sm:px-8"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
            <FaPray className="text-3xl text-red-300" />
          </div>

          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-red-300">
            Scripture for Ministry
          </p>

          <blockquote className="font-serif text-xl italic leading-relaxed sm:text-2xl md:text-3xl">
            "And he gave the apostles, the prophets, the evangelists, the
            shepherds and teachers, to equip the saints for the work of
            ministry, for building up the body of Christ."
          </blockquote>

          <p className="mt-6 text-base font-semibold text-blue-100 sm:text-lg">
            Ephesians 4:11–12
          </p>

          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-[#B42332]" />
        </motion.div>
      </section>

      {/* Contact call to action */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-blue-100 bg-blue-50/70 p-7 text-center sm:p-10 lg:p-14"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
              <FaChurch className="text-2xl text-[#B42332]" />
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#17365D] sm:text-3xl md:text-4xl">
              Connect With Our Church
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600 sm:text-lg">
              Have a question or need to get in touch with the church? We
              welcome you to reach out to us.
            </p>

            <Link
              to="/contact"
              className="mt-7 inline-flex items-center justify-center gap-3 rounded-xl bg-[#B42332] px-7 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#941D2A] hover:shadow-lg"
            >
              Contact the Church
              <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Pastor profile modal */}
      <AnimatePresence>
        {selectedPastor && (
          <motion.div
            key="pastor-modal"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071426]/75 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setSelectedPastor(null);
              }
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="pastor-profile-name"
              initial={{ opacity: 0, y: 25, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-5 py-4 sm:px-7">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#B42332]">
                    Pastoral Profile
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Reconciliation Church of God Intl.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPastor(null)}
                  aria-label="Close pastor profile"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-red-50 hover:text-[#B42332] focus:outline-none focus:ring-2 focus:ring-[#B42332]"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Modal content */}
              <div className="overflow-y-auto">
                <div className="grid sm:grid-cols-[220px_1fr]">
                  <div className="flex max-h-[280px] items-center justify-center overflow-hidden bg-[#17365D] sm:max-h-none">
                    <img
                      src={selectedPastor.image}
                      alt={selectedPastor.name}
                      className="h-[260px] w-full object-cover object-center sm:h-full sm:min-h-[300px]"
                    />
                  </div>

                  <div className="p-5 sm:p-7">
                    <span className="inline-flex rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-[#B42332]">
                      {selectedPastor.role}
                    </span>

                    <h2
                      id="pastor-profile-name"
                      className="mt-4 font-serif text-2xl font-bold leading-tight text-[#17365D] sm:text-3xl"
                    >
                      {selectedPastor.name}
                    </h2>

                    <div className="mb-5 mt-4 h-1 w-12 rounded-full bg-[#B42332]" />

                    <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-500">
                      About
                    </h3>

                    <p className="leading-7 text-gray-600">
                      {selectedPastor.bio}
                    </p>

                    <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
                      <div className="mb-2 flex items-center gap-2 font-semibold text-[#17365D]">
                        <FaCross className="text-[#B42332]" />
                        Ministry
                      </div>

                      <p className="text-sm leading-6 text-gray-600">
                        {selectedPastor.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 bg-white px-5 py-4 sm:px-7">
                <button
                  type="button"
                  onClick={() => setSelectedPastor(null)}
                  className="w-full rounded-xl bg-[#17365D] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#B42332] focus:outline-none focus:ring-2 focus:ring-[#B42332] focus:ring-offset-2"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default Pastors;
