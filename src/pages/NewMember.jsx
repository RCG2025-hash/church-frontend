
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FaChurch,
  FaUsers,
  FaBookOpen,
  FaHandsHelping,
  FaPray,
  FaHeart,
  FaCheckCircle,
  FaPaperPlane,
  FaUserFriends,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";

const NewMember = () => {
  const initialFormData = {
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    gender: "",
    howDidYouHear: "",
    spiritualJourneyStage: "",
    prayerRequest: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

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

  const membershipBenefits = [
    {
      icon: FaUserFriends,
      title: "Pastoral Care",
      description:
        "Access to counseling, prayer, and spiritual guidance from our pastors.",
    },
    {
      icon: FaHandsHelping,
      title: "Ministry Opportunities",
      description:
        "Serve according to your gifts and passions in our various ministries.",
    },
    {
      icon: FaBookOpen,
      title: "Discipleship Classes",
      description:
        "Grow in your faith through structured discipleship and biblical teaching.",
    },
    {
      icon: FaHeart,
      title: "Church Family",
      description:
        "Become part of a supportive community that cares for one another.",
    },
  ];

  const spiritualJourneyOptions = [
    { value: "Exploring Faith", label: "Exploring Faith" },
    { value: "New Believer", label: "New Believer" },
    { value: "Growing Christian", label: "Growing Christian" },
    { value: "Mature Christian", label: "Mature Christian" },
    { value: "Prefer Not To Say", label: "Prefer Not To Say" },
  ];

  const hearAboutUsOptions = [
    { value: "Social Media", label: "Social Media" },
    { value: "Church Member", label: "Church Member" },
    { value: "Church Website", label: "Church Website" },
    { value: "Church Event", label: "Church Event" },
    { value: "Flyers and Posters", label: "Flyers and Posters" },
    { value: "Other", label: "Other" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (status) {
      setStatus("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setStatus("submitting");

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await axios.post(
        `${API_URL}/api/submissions/new-member`,
        formData
      );

      console.log(
        "New member information submitted successfully:",
        response.data
      );

      setStatus("success");
      setFormData(initialFormData);
    } catch (error) {
      console.error(
        "Error submitting new member information:",
        error.response ? error.response.data : error.message
      );

      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <main className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-[#0b1f46] text-white">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10"
          >
            <FaUsers className="text-3xl text-red-400" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-red-300"
          >
            Welcome to RCG
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
          >
            Join Our Church Family
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg"
          >
            Become part of our community, build meaningful relationships,
            and grow together in faith.
          </motion.p>

          <motion.a
            href="#member-registration"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 inline-flex items-center gap-3 rounded-lg bg-red-600 px-7 py-3.5 font-semibold text-white shadow-lg transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300/40"
          >
            Register as a New Member
            <FaArrowRight />
          </motion.a>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-red-600">
              Grow with us
            </p>

            <h2 className="font-serif text-3xl font-bold text-[#0b1f46] sm:text-4xl">
              Why Become a Member?
            </h2>

            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-red-600" />

            <p className="mt-6 text-base leading-7 text-slate-600 sm:text-lg">
              Membership connects you more deeply with our church family
              and creates opportunities to grow in faith, fellowship, and service.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {membershipBenefits.map((benefit, index) => {
              const BenefitIcon = benefit.icon;

              return (
                <motion.article
                  key={benefit.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:border-blue-200 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#0b1f46] text-2xl text-white">
                    <BenefitIcon />
                  </div>

                  <h3 className="text-lg font-bold text-[#0b1f46]">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {benefit.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section
        id="member-registration"
        className="scroll-mt-24 bg-white py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-red-600">
              Your journey begins here
            </p>

            <h2 className="font-serif text-3xl font-bold text-[#0b1f46] sm:text-4xl">
              New Member Registration
            </h2>

            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-red-600" />

            <p className="mt-6 text-base leading-7 text-slate-600 sm:text-lg">
              We're excited to welcome you into our church family.
              Please complete the form below.
            </p>
          </motion.div>

          <div className="grid overflow-hidden rounded-3xl border border-slate-200 shadow-xl lg:grid-cols-[0.75fr_1.25fr]">
            {/* Form Introduction */}
            <div className="relative overflow-hidden bg-[#0b1f46] p-8 text-white sm:p-10 lg:p-12">
              <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-red-600/20 blur-2xl" />

              <div className="relative">
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-xl bg-red-600 text-2xl">
                  <FaChurch />
                </div>

                <h3 className="font-serif text-3xl font-bold leading-tight">
                  We're Happy You're Here
                </h3>

                <p className="mt-5 leading-8 text-blue-100">
                  Thank you for taking this step. We look forward to
                  connecting with you and helping you become part of our
                  church community.
                </p>

                <div className="mt-9 border-t border-white/15 pt-7">
                  <p className="flex items-start gap-3 text-sm leading-7 text-blue-100">
                    <FaCheckCircle className="mt-1 shrink-0 text-red-400" />
                    Tell us a little about yourself.
                  </p>

                  <p className="mt-4 flex items-start gap-3 text-sm leading-7 text-blue-100">
                    <FaCheckCircle className="mt-1 shrink-0 text-red-400" />
                    Share how you connected with RCG.
                  </p>

                  <p className="mt-4 flex items-start gap-3 text-sm leading-7 text-blue-100">
                    <FaCheckCircle className="mt-1 shrink-0 text-red-400" />
                    Let us know how we can pray for you.
                  </p>
                </div>

                <div className="mt-10 rounded-xl border border-white/15 bg-white/5 p-5">
                  <FaHeart className="mb-3 text-2xl text-red-400" />
                  <p className="font-serif text-lg font-semibold">
                    You are welcome here.
                  </p>
                  <p className="mt-2 text-sm leading-6 text-blue-100">
                    We look forward to growing together in faith.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="bg-white p-6 sm:p-10">
              <h3 className="text-2xl font-bold text-[#0b1f46]">
                Your Information
              </h3>

              <p className="mt-2 mb-8 text-sm leading-6 text-slate-500">
                Fields marked with <span className="text-red-600">*</span>{" "}
                are required.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="member-name" className={labelClass}>
                      Full Name <span className="text-red-600">*</span>
                    </label>

                    <input
                      id="member-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      placeholder="Enter your full name"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="member-email" className={labelClass}>
                      Email Address <span className="text-red-600">*</span>
                    </label>

                    <input
                      id="member-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      placeholder="you@example.com"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="member-phone" className={labelClass}>
                      Phone Number <span className="text-red-600">*</span>
                    </label>

                    <input
                      id="member-phone"
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      autoComplete="tel"
                      placeholder="+234 800 000 0000"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="member-gender" className={labelClass}>
                      Gender <span className="text-red-600">*</span>
                    </label>

                    <select
                      id="member-gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="member-address" className={labelClass}>
                    Address <span className="text-red-600">*</span>
                  </label>

                  <textarea
                    id="member-address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    autoComplete="street-address"
                    rows={3}
                    placeholder="Enter your complete address"
                    className={`${inputClass} resize-y`}
                    required
                  />
                </div>

                <div className="border-t border-slate-200 pt-6">
                  <h4 className="mb-5 text-lg font-bold text-[#0b1f46]">
                    Your Church Connection
                  </h4>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="member-source"
                        className={labelClass}
                      >
                        How did you hear about us?{" "}
                        <span className="text-red-600">*</span>
                      </label>

                      <select
                        id="member-source"
                        name="howDidYouHear"
                        value={formData.howDidYouHear}
                        onChange={handleChange}
                        className={inputClass}
                        required
                      >
                        <option value="">Select an option</option>

                        {hearAboutUsOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="member-spiritual-stage"
                        className={labelClass}
                      >
                        Stage in Spiritual Journey
                      </label>

                      <select
                        id="member-spiritual-stage"
                        name="spiritualJourneyStage"
                        value={formData.spiritualJourneyStage}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">Select an option</option>

                        {spiritualJourneyOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="member-prayer-request"
                    className={labelClass}
                  >
                    Prayer Request
                  </label>

                  <textarea
                    id="member-prayer-request"
                    name="prayerRequest"
                    value={formData.prayerRequest}
                    onChange={handleChange}
                    rows={4}
                    placeholder="How can we pray for you?"
                    className={`${inputClass} resize-y`}
                  />

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    This field is optional.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-3 rounded-lg bg-red-600 px-6 py-3.5 font-bold text-white shadow-md transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Submitting Registration...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Submit Registration
                    </>
                  )}
                </button>

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
                        Your information has been submitted successfully!
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

                {status === "error" && (
                  <motion.div
                    role="alert"
                    aria-live="assertive"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800"
                  >
                    Failed to submit your information. Please try again or
                    contact the church directly.
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-red-600">
              Your next steps
            </p>

            <h2 className="font-serif text-3xl font-bold text-[#0b1f46] sm:text-4xl">
              What Happens Next?
            </h2>

            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-red-600" />

            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm sm:p-9">
              <div className="space-y-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b1f46] font-bold text-white">
                    1
                  </div>

                  <div>
                    <h3 className="font-bold text-[#0b1f46]">
                      A Warm Welcome
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Our existing process is to contact you within 48 hours
                      to welcome you.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b1f46] font-bold text-white">
                    2
                  </div>

                  <div>
                    <h3 className="font-bold text-[#0b1f46]">
                      Connect with the Church Family
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      We'll help you get connected with a small group or
                      ministry.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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
          <FaChurch className="mx-auto mb-6 text-4xl text-red-400" />

          <blockquote className="font-serif text-xl italic leading-9 sm:text-2xl sm:leading-10">
            "So in Christ we, though many, form one body, and each member
            belongs to all the others."
          </blockquote>

          <div className="mx-auto my-6 h-1 w-16 rounded-full bg-red-500" />

          <p className="font-semibold tracking-wide text-red-300">
            Romans 12:5
          </p>
        </motion.div>
      </section>
    </main>
  );
};

export default NewMember;