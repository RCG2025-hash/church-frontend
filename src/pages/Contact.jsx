import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaCommentDots,
  FaCheckCircle,
  FaPhone,
  FaMapMarkerAlt,
  FaChurch,
  FaPaperPlane,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      await axios.post(
        `${API_URL}/api/submissions/contact`,
        formData
      );

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(
        "Contact form error:",
        error.response?.data || error.message
      );

      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactDetails = [
    {
      icon: FaMapMarkerAlt,
      label: "Visit Us",
      value: "Plot 1, Denro Ishasi Road, Akute via Ojodu Berger",
      color: "bg-blue-50 text-[#163568]",
    },
    {
      icon: FaPhone,
      label: "Call Us",
      value: "+234-8033074562",
      href: "tel:+2348033074562",
      color: "bg-red-50 text-red-600",
    },
    {
      icon: FaEnvelope,
      label: "Email Us",
      value: "help@HisGracercg.org",
      href: "mailto:help@HisGracercg.org",
      color: "bg-blue-50 text-[#163568]",
    },
  ];

  return (
    <main id="contact" className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-[#0b1f46] px-4 pb-20 pt-16 text-white sm:px-6 sm:pb-24 sm:pt-20 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-red-600/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b1f46] via-[#102b59] to-[#0b1f46]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
              <FaChurch className="text-red-400" />
              We're Here for You
            </div>

            <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Get in{" "}
              <span className="text-red-400">Touch</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
              We'd love to hear from you. Whether you have a
              question, need prayer, or want to connect with our
              church family, we're happy to hear from you.
            </p>

            <div className="mx-auto mt-8 h-1 w-20 rounded-full bg-red-500" />
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-8 lg:grid-cols-5 lg:gap-10">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.15 }}
              className="lg:col-span-3"
            >
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
                <div className="h-1.5 bg-gradient-to-r from-[#0b1f46] via-blue-700 to-red-600" />

                <div className="p-6 sm:p-9 lg:p-10">
                  <span className="text-sm font-bold uppercase tracking-[0.18em] text-red-600">
                    Send a Message
                  </span>

                  <h2 className="mt-3 font-serif text-2xl font-bold text-[#0b1f46] sm:text-3xl">
                    We'd love to hear from you
                  </h2>

                  <p className="mt-3 leading-7 text-slate-600">
                    Complete the form below and send us your
                    message. Our team will be glad to hear from you.
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-6"
                  >
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Your Name
                      </label>

                      <div className="relative">
                        <FaUser
                          aria-hidden="true"
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          autoComplete="name"
                          required
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Email Address
                      </label>

                      <div className="relative">
                        <FaEnvelope
                          aria-hidden="true"
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          autoComplete="email"
                          required
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Your Message
                      </label>

                      <div className="relative">
                        <FaCommentDots
                          aria-hidden="true"
                          className="pointer-events-none absolute left-4 top-4 text-slate-400"
                        />

                        <textarea
                          id="contact-message"
                          name="message"
                          placeholder="How can we help you?"
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#0b1f46] px-6 py-4 font-semibold text-white shadow-lg shadow-blue-950/15 transition duration-300 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-red-600/20 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="h-5 w-5 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane />
                          Send Message
                          <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    {/* Success Message */}
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
                          className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800"
                        >
                          <FaCheckCircle className="mt-1 shrink-0 text-green-600" />

                          <p className="flex-1 text-sm leading-6">
                            Message sent successfully! We'll get
                            back to you soon.
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

                    {/* Error Message */}
                    {status === "error" && (
                      <motion.div
                        role="alert"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
                      >
                        Failed to send your message. Please try
                        again or contact us directly using the
                        details provided on this page.
                      </motion.div>
                    )}
                  </form>
                </div>
              </div>
            </motion.div>

            {/* Contact Information and Map */}
            <motion.aside
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.15 }}
              className="space-y-8 lg:col-span-2"
            >
              <div className="rounded-3xl bg-[#0b1f46] p-6 text-white shadow-xl shadow-blue-950/15 sm:p-8">
                <span className="text-sm font-bold uppercase tracking-[0.18em] text-red-400">
                  Contact Details
                </span>

                <h2 className="mt-3 font-serif text-2xl font-bold sm:text-3xl">
                  Let's Connect
                </h2>

                <p className="mt-3 leading-7 text-blue-100">
                  Reach out to us through any of the contact
                  options below. We look forward to connecting
                  with you.
                </p>

                <div className="mt-8 space-y-6">
                  {contactDetails.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="flex items-start gap-4"
                      >
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                        >
                          <Icon
                            className="text-lg"
                            aria-hidden="true"
                          />
                        </div>

                        <div className="min-w-0 pt-0.5">
                          <h3 className="font-semibold text-white">
                            {item.label}
                          </h3>

                          {item.href ? (
                            <a
                              href={item.href}
                              className="mt-1 inline-block break-words text-sm leading-6 text-blue-100 transition hover:text-red-300"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="mt-1 text-sm leading-6 text-blue-100">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 border-t border-white/15 pt-6">
                  <div className="flex items-center gap-3 text-sm text-blue-100">
                    <FaChurch className="shrink-0 text-red-400" />
                    <span>
                      Reconciliation Church of God, HisGrace Chapel
                    </span>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
                <div className="px-6 pb-4 pt-6 sm:px-7">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">
                    Find Us
                  </span>

                  <h2 className="mt-2 font-serif text-xl font-bold text-[#0b1f46] sm:text-2xl">
                    Our Location
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Find us at HisGrace Chapel, Akute via Ojodu Berger.
                  </p>
                </div>

                <div className="h-72 w-full sm:h-80">
                  <iframe
                    title="Reconciliation Church of God, HisGrace Chapel location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.8245828764993!2d3.373244973709138!3d6.668647193326365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b946163ba470d%3A0x2f93fd031d11acde!2sReconciliation%20Church%20of%20God%2C%20HisGrace%20Chapel!5e0!3m2!1sen!2sng!4v1744732722458!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Closing Message */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-[#0b1f46] to-[#173d78] px-6 py-10 text-center text-white sm:px-10 sm:py-12"
        >
          <FaChurch className="mx-auto text-3xl text-red-400" />

          <h2 className="mt-4 font-serif text-2xl font-bold sm:text-3xl">
            You Are Always Welcome
          </h2>

          <p className="mx-auto mt-3 max-w-2xl leading-7 text-blue-100">
            Thank you for reaching out to Reconciliation Church
            of God. We look forward to hearing from you and
            connecting with you.
          </p>
        </motion.div>
      </section>
    </main>
  );
};

export default Contact;