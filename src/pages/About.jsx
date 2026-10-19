
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import {
  FaChurch,
  FaHistory,
  FaHeart,
  FaUsers,
  FaCross,
  FaPray,
  FaArrowRight,
  FaHandsHelping,
  FaBookOpen,
} from "react-icons/fa";

import img1 from "../assets/About_us.jpg";
import img2 from "../assets/About_us2.jpg";
import img3 from "../assets/About_us3.jpg";
import img4 from "../assets/About_us4.jpg";
import img5 from "../assets/About_us5.jpg";
import img6 from "../assets/About_us6.jpg";
import img7 from "../assets/About_us7.jpg";
import img8 from "../assets/About_us8.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const About = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-white pt-20">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#102844] py-20 text-white sm:py-24 lg:py-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#102844] via-[#17365D] to-[#263D60]" />

        <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[#B42332]/25 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 -z-10 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm"
            >
              <FaChurch className="text-red-300" />
              <span>Reconciliation Church of God Intl.</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Our History,
              <span className="block text-red-300">Vision and Mission</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-3xl text-base leading-8 text-blue-100 sm:text-lg md:text-xl"
            >
              Discover the history, purpose and guiding principles of
              Reconciliation Church of God International.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mx-auto mt-8 h-1 w-20 rounded-full bg-[#B42332]"
            />
          </motion.div>
        </div>
      </section>

      {/* Church history */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-[#B42332]">
              <FaHistory />
              Our Background
            </div>

            <h2 className="font-serif text-3xl font-bold leading-tight text-[#17365D] sm:text-4xl">
              A Journey of Grace and Reconciliation
            </h2>

            <div className="mb-7 mt-5 h-1 w-16 rounded-full bg-[#B42332]" />

            <p className="mb-5 text-base leading-8 text-gray-600 sm:text-lg">
              Established in August 2003 under the name{" "}
              <strong className="font-semibold text-[#17365D]">
                His Grace Bible Church
              </strong>
              , our ministry later secured Government Registration as{" "}
              <strong className="font-semibold text-[#17365D]">
                RECONCILIATION CHURCH OF GOD INTL
              </strong>{" "}
              (also known as His Grace Chapel).
            </p>

            <p className="mb-8 text-base leading-8 text-gray-600 sm:text-lg">
              For over 20 years, RCG has been a place of worship and
              transformation, growing from a small congregation to a vibrant
              community that has impacted countless lives through faith, love,
              and service.
            </p>

            <div className="rounded-r-xl border-l-4 border-[#B42332] bg-blue-50 p-5 sm:p-6">
              <FaBookOpen className="mb-3 text-xl text-[#B42332]" />

              <p className="text-base italic leading-7 text-[#17365D] sm:text-lg">
                "For I know the plans I have for you, declares the Lord, plans
                for welfare and not for evil, to give you a future and a hope."
              </p>

              <p className="mt-3 text-sm font-bold text-[#B42332]">
                Jeremiah 29:11
              </p>
            </div>
          </motion.div>

          {/* History highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative"
          >
            <div className="absolute -right-3 -top-3 h-24 w-24 rounded-tr-3xl border-r-4 border-t-4 border-[#B42332]/30 sm:-right-5 sm:-top-5" />

            <div className="relative grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[#17365D] p-5 text-white shadow-lg transition-transform duration-300 hover:-translate-y-1 sm:p-7">
                <FaHistory className="mb-5 text-2xl text-red-300 sm:text-3xl" />
                <p className="text-3xl font-bold sm:text-4xl">20+</p>
                <p className="mt-2 text-sm leading-6 text-blue-100 sm:text-base">
                  Years of Ministry
                </p>
              </div>

              <div className="mt-8 rounded-2xl bg-[#B42332] p-5 text-white shadow-lg transition-transform duration-300 hover:-translate-y-1 sm:p-7">
                <FaUsers className="mb-5 text-2xl text-white/80 sm:text-3xl" />
                <p className="text-3xl font-bold sm:text-4xl">500+</p>
                <p className="mt-2 text-sm leading-6 text-red-100 sm:text-base">
                  Lives Transformed
                </p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-7">
                <FaHandsHelping className="mb-5 text-2xl text-[#17365D] sm:text-3xl" />
                <p className="text-3xl font-bold text-[#17365D] sm:text-4xl">
                  15+
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
                  Ministries
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-7">
                <FaCross className="mb-5 text-2xl text-[#B42332] sm:text-3xl" />
                <p className="text-3xl font-bold text-[#B42332] sm:text-4xl">
                  1
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
                  Mission
                </p>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-3 -z-10 h-24 w-24 rounded-bl-3xl border-b-4 border-l-4 border-[#17365D]/20 sm:-bottom-5 sm:-left-5" />
          </motion.div>
        </div>
      </section>

      {/* Vision and mission */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#B42332]">
              Our Purpose
            </p>

            <h2 className="font-serif text-3xl font-bold text-[#17365D] sm:text-4xl md:text-5xl">
              Our Vision &amp; Mission
            </h2>

            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#B42332]" />

            <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
              Guided by faith and committed to the work of reconciliation.
            </p>
          </motion.div>

          <div className="grid items-stretch gap-7 lg:grid-cols-2 lg:gap-8">
            {/* Vision */}
            <motion.article
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
              className="group rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-9"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 transition-colors duration-300 group-hover:bg-[#17365D]">
                  <FaCross className="text-2xl text-[#17365D] transition-colors duration-300 group-hover:text-white" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#B42332]">
                    Where We Are Going
                  </p>
                  <h3 className="mt-1 font-serif text-2xl font-bold text-[#17365D] sm:text-3xl">
                    Our Vision
                  </h3>
                </div>
              </div>

              <p className="text-base leading-8 text-gray-600 sm:text-lg">
                The vision of this church is to keep seeking the lost and
                raising them as saints for the kingdom of God. This essentially
                means working to keep depopulating the kingdom of hell while
                increasing the population of the Kingdom of God via the
                preaching of the Gospel of Life as perpetrated and delivered
                to us by The Lord Jesus Christ Himself.
              </p>
            </motion.article>

            {/* Mission */}
            <motion.article
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              viewport={{ once: true, amount: 0.2 }}
              className="group rounded-2xl border border-red-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-9"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-50 transition-colors duration-300 group-hover:bg-[#B42332]">
                  <FaHeart className="text-2xl text-[#B42332] transition-colors duration-300 group-hover:text-white" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#B42332]">
                    What We Do
                  </p>
                  <h3 className="mt-1 font-serif text-2xl font-bold text-[#17365D] sm:text-3xl">
                    Our Mission
                  </h3>
                </div>
              </div>

              <p className="mb-5 text-base leading-8 text-gray-600 sm:text-lg">
                To actualize our vision of populating the kingdom of God and
                depopulating hell, we have identified and pursuing the
                following missions:
              </p>

              <ol className="space-y-4">
                {[
                  "Regular Outreaches via Quarterly Open Air Crusades.",
                  "Weekly Street-Wise Evangelism Rally with TRACTS sharing.",
                  "Regular Ministers Conference for raising and equipping ministers of the Gospel, especially for our ministry.",
                  "Use of Regular Welfare Package distribution as means of showing God's mercy and attracting souls to the church for eventual conversion.",
                ].map((mission, index) => (
                  <li
                    key={mission}
                    className="flex items-start gap-3 text-base leading-7 text-gray-600"
                  >
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-[#B42332]">
                      {index + 1}
                    </span>
                    <span>{mission}</span>
                  </li>
                ))}
              </ol>
            </motion.article>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#B42332]">
              What Guides Us
            </p>

            <h2 className="font-serif text-3xl font-bold text-[#17365D] sm:text-4xl md:text-5xl">
              Our Core Values
            </h2>

            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#B42332]" />

            <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
              The principles that guide everything we do.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: FaPray,
                title: "Faith",
                desc: "Trusting in God's plan and living according to His word.",
                color: "blue",
              },
              {
                icon: FaHeart,
                title: "Love",
                desc: "Showing Christ's love through our actions and relationships.",
                color: "red",
              },
              {
                icon: FaUsers,
                title: "Community",
                desc: "Building meaningful connections and supporting one another.",
                color: "blue",
              },
            ].map((value, index) => {
              const Icon = value.icon;
              const isRed = value.color === "red";

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
                  className="group rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-9"
                >
                  <div
                    className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:rotate-3 group-hover:scale-110 ${
                      isRed
                        ? "bg-red-50 group-hover:bg-[#B42332]"
                        : "bg-blue-50 group-hover:bg-[#17365D]"
                    }`}
                  >
                    <Icon
                      className={`text-2xl transition-colors duration-300 ${
                        isRed
                          ? "text-[#B42332] group-hover:text-white"
                          : "text-[#17365D] group-hover:text-white"
                      }`}
                    />
                  </div>

                  <h3 className="mb-3 font-serif text-2xl font-bold text-[#17365D]">
                    {value.title}
                  </h3>

                  <p className="leading-7 text-gray-600">{value.desc}</p>

                  <div
                    className={`mx-auto mt-6 h-1 w-10 rounded-full transition-all duration-300 group-hover:w-20 ${
                      isRed ? "bg-[#B42332]" : "bg-[#17365D]"
                    }`}
                  />
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Church photo gallery */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#B42332]">
              Life Together
            </p>

            <h2 className="font-serif text-3xl font-bold text-[#17365D] sm:text-4xl md:text-5xl">
              Our Church Family
            </h2>

            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#B42332]" />

            <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
              Moments of worship, fellowship and service.
            </p>
          </motion.div>

          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="-ml-4 flex w-auto"
            columnClassName="bg-clip-padding pl-4"
          >
            {images.map((img, index) => (
              <motion.div
                key={img}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: (index % 3) * 0.08,
                }}
                viewport={{ once: true, amount: 0.1 }}
                className="mb-4"
              >
                <div className="group relative overflow-hidden rounded-2xl bg-gray-200 shadow-sm">
                  <img
                    src={img}
                    alt={`Reconciliation Church of God gallery photo ${index + 1}`}
                    loading="lazy"
                    className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#102844]/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </motion.div>
            ))}
          </Masonry>
        </div>
      </section>

      {/* Call to action */}
      <section className="relative isolate overflow-hidden bg-[#17365D] py-16 text-white sm:py-20 lg:py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#102844] via-[#17365D] to-[#243F67]" />
        <div className="absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-[#B42332]/25 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 -z-10 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl px-5 text-center sm:px-8"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
            <FaChurch className="text-3xl text-red-300" />
          </div>

          <h2 className="font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
            Join Our Church Family
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
            Experience God's love and grow in faith with us. We welcome you to
            be part of our community.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/newmember"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#B42332] px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#941D2A] hover:shadow-xl"
            >
              Become a Member
              <FaArrowRight />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/40 bg-white/5 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#17365D]"
            >
              Contact Us
              <FaArrowRight />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default About;
