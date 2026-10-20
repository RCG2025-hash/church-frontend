
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

import {
  FaHandsHelping,
  FaChurch,
  FaMusic,
  FaVideo,
  FaChild,
  FaUserFriends,
  FaCheckCircle,
  FaPaperPlane,
  FaArrowRight,
  FaHeart,
  FaUsers,
  FaPrayingHands,
  FaTimes,
} from "react-icons/fa";

const JoinWorkforce = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    department: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const ministryDepartments = [
    {
      id: "Ushers",
      name: "Ushering Department",
      icon: FaUserFriends,
      description:
        "Welcome attendees, offer assistance, and help create an orderly worship experience.",
    },
    {
      id: "Choir",
      name: "Choir Department",
      icon: FaMusic,
      description:
        "Use your musical gifts to lead the congregation in praise and worship.",
    },
    {
      id: "Media",
      name: "Media & Technology",
      icon: FaVideo,
      description:
        "Support church services through sound, media, and visual presentations.",
    },
    {
      id: "ChildrensMinistry",
      name: "Children's Department",
      icon: FaChild,
      description:
        "Help nurture, teach, and care for the children in our church family.",
    },
    {
      id: "Outreach",
      name: "Evangelism Department",
      icon: FaChurch,
      description:
        "Share the gospel and help spread the message of Christ in our community.",
    },
  ];

  // Automatically dismiss the success message after five seconds.
  useEffect(() => {
    if (status !== "success") {
      setIsSuccessVisible(false);
      return;
    }

    setIsSuccessVisible(true);

    const timer = window.setTimeout(() => {
      setIsSuccessVisible(false);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [status]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (status) {
      setStatus("");
    }
  };

  const handleDepartmentSelect = (departmentId) => {
    setFormData((prevData) => ({
      ...prevData,
      department: departmentId,
    }));

    setStatus("");

    document.getElementById("workforce-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setStatus("");

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      if (!API_URL) {
        throw new Error("The API URL is not configured.");
      }

      const response = await axios.post(
        `${API_URL}/api/submissions/workforce`,
        formData
      );

      console.log(
        "Workforce application submitted successfully:",
        response.data
      );

      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        department: "",
        message: "",
      });

      setStatus("success");
    } catch (error) {
      console.error(
        "Error submitting workforce application:",
        error.response ? error.response.data : error.message
      );

      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-[#0b1f46] text-white">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-red-600/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10"
          >
            <FaHandsHelping className="text-3xl text-red-400" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-red-300"
          >
            Serve with purpose
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
          >
            Join Our Ministry Team
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg"
          >
            Discover your gifts, build meaningful connections, and serve in
            God's kingdom work as part of our church family.
          </motion.p>

          <motion.a
            href="#ministry-opportunities"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 inline-flex items-center gap-3 rounded-lg bg-red-600 px-7 py-3.5 font-semibold text-white shadow-lg transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300/40"
          >
            Explore Ministries
            <FaArrowRight />
          </motion.a>

          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-blue-100">
            <span className="flex items-center gap-2">
              <FaHeart className="text-red-400" />
              Serve with love
            </span>
            <span className="flex items-center gap-2">
              <FaUsers className="text-red-400" />
              Grow together
            </span>
            <span className="flex items-center gap-2">
              <FaPrayingHands className="text-red-400" />
              Honour God
            </span>
          </div>
        </div>
      </section>

      {/* Ministry Opportunities */}
      <section
        id="ministry-opportunities"
        className="scroll-mt-24 bg-slate-50 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-red-600">
              Find your place
            </p>

            <h2 className="font-serif text-3xl font-bold text-[#0b1f46] sm:text-4xl">
              Ministry Opportunities
            </h2>

            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-red-600" />

            <p className="mt-6 text-base leading-7 text-slate-600 sm:text-lg">
              Everyone has something valuable to contribute. Explore our
              ministry teams and choose where you would love to serve.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ministryDepartments.map((department, index) => {
              const DepartmentIcon = department.icon;
              const isSelected = formData.department === department.id;

              return (
                <motion.article
                  key={department.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className={`flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition duration-300 hover:shadow-xl ${
                    isSelected
                      ? "border-red-500 ring-2 ring-red-100"
                      : "border-slate-200 hover:border-blue-200"
                  }`}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0b1f46] text-2xl text-white">
                      <DepartmentIcon />
                    </div>

                    {isSelected && (
                      <span className="flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                        <FaCheckCircle />
                        Selected
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[#0b1f46]">
                    {department.name}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                    {department.description}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      handleDepartmentSelect(department.id)
                    }
                    aria-pressed={isSelected}
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-md py-2 text-sm font-bold text-red-600 transition hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                  >
                    {isSelected ? "Selected Ministry" : "Join This Ministry"}
                    <FaArrowRight />
                  </button>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section
        id="workforce-form"
        className="scroll-mt-24 bg-white py-16 sm:py-20"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-3xl border border-slate-200 shadow-xl lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative overflow-hidden bg-[#0b1f46] p-8 text-white sm:p-10 lg:p-12">
              <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-red-600/20 blur-2xl" />

              <div className="relative">
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-xl bg-red-600 text-2xl">
                  <FaHandsHelping />
                </div>

                <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-red-300">
                  Take the next step
                </p>

                <h2 className="font-serif text-3xl font-bold leading-tight sm:text-4xl">
                  Let's Serve Together
                </h2>

                <p className="mt-5 leading-8 text-blue-100">
                  We're glad you're interested in serving. Complete the form
                  and let us know the ministry area that interests you.
                </p>

                <div className="mt-9 border-t border-white/15 pt-7">
                  <p className="flex items-start gap-3 text-sm leading-7 text-blue-100">
                    <FaCheckCircle className="mt-1 shrink-0 text-red-400" />
                    Share your details and ministry preference.
                  </p>

                  <p className="mt-4 flex items-start gap-3 text-sm leading-7 text-blue-100">
                    <FaCheckCircle className="mt-1 shrink-0 text-red-400" />
                    Our team will review your application.
                  </p>

                  <p className="mt-4 flex items-start gap-3 text-sm leading-7 text-blue-100">
                    <FaCheckCircle className="mt-1 shrink-0 text-red-400" />
                    Take a step towards serving with the church family.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-10">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#0b1f46]">
                  Ministry Application
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Fields marked with{" "}
                  <span className="text-red-600">*</span> are required.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="workforce-name"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Full Name <span className="text-red-600">*</span>
                    </label>

                    <input
                      id="workforce-name"
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                      className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="workforce-email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email Address <span className="text-red-600">*</span>
                    </label>

                    <input
                      id="workforce-email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                      className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="workforce-phone"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Phone Number
                    </label>

                    <input
                      id="workforce-phone"
                      type="tel"
                      name="phoneNumber"
                      placeholder="+234 800 000 0000"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      autoComplete="tel"
                      className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="workforce-department"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Ministry Area <span className="text-red-600">*</span>
                    </label>

                    <select
                      id="workforce-department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                    >
                      <option value="">Select a ministry</option>

                      {ministryDepartments.map((department) => (
                        <option
                          key={department.id}
                          value={department.id}
                        >
                          {department.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="workforce-message"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Additional Message
                  </label>

                  <textarea
                    id="workforce-message"
                    name="message"
                    placeholder="Tell us about your interests, experience, or any questions..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full resize-y rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-3 rounded-lg bg-red-600 px-6 py-3.5 font-bold text-white shadow-md transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Submit Application
                    </>
                  )}
                </button>

                {/* Success notification */}
                <AnimatePresence>
                  {status === "success" && isSuccessVisible && (
                    <motion.div
                      role="status"
                      aria-live="polite"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        y: -8,
                        transition: { duration: 0.3 },
                      }}
                      transition={{ duration: 0.25 }}
                      className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-800"
                    >
                      <FaCheckCircle className="mt-1 shrink-0 text-green-600" />

                      <p className="flex-1">
                        Your application has been submitted successfully!
                        We'll be in touch soon.
                      </p>

                      <button
                        type="button"
                        onClick={() => setIsSuccessVisible(false)}
                        aria-label="Dismiss success message"
                        className="shrink-0 rounded-md p-1 text-green-700 transition hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <FaTimes />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error notification */}
                {status === "error" && (
                  <motion.div
                    role="alert"
                    aria-live="assertive"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800"
                  >
                    Failed to submit your application. Please try again or
                    contact the church directly.
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Bible Verse */}
      <section className="bg-[#0b1f46] px-4 py-16 text-white sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >
          <FaHandsHelping className="mx-auto mb-6 text-4xl text-red-400" />

          <blockquote className="font-serif text-xl italic leading-9 sm:text-2xl sm:leading-10">
            "Each of you should use whatever gift you have received to serve
            others, as faithful stewards of God's grace in its various forms."
          </blockquote>

          <div className="mx-auto my-6 h-1 w-16 rounded-full bg-red-500" />

          <p className="font-semibold tracking-wide text-red-300">
            1 Peter 4:10
          </p>
        </motion.div>
      </section>
    </main>
  );
};

export default JoinWorkforce;