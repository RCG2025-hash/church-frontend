
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaChurch,
  FaHandHoldingHeart,
  FaCopy,
  FaCheck,
  FaCreditCard,
  FaHeart,
  FaArrowRight,
  FaRegBuilding,
  FaGift,
  FaInfoCircle,
} from "react-icons/fa";

const churchAccount = {
  name: "Reconciliation Church of God",
  number: "0751609016",
  bank: "FCMB",
};

const givingOptions = [
  {
    type: "Tithe",
    description:
      "Give your regular tithe as part of your worship and commitment to God.",
    verse: '"Bring the whole tithe into the storehouse..."',
    reference: "Malachi 3:10",
    icon: FaChurch,
  },
  {
    type: "Offering",
    description:
      "Give an offering from a willing heart to support the work of the church.",
    verse: '"Each of you should give what you have decided in your heart to give..."',
    reference: "2 Corinthians 9:7",
    icon: FaHandHoldingHeart,
  },
  {
    type: "Ofada Building Offering",
    description:
      "Contribute towards the church building project in Ofada.",
    verse: '"The people had a mind to work."',
    reference: "Nehemiah 4:6",
    icon: FaRegBuilding,
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

const Donation = () => {
  const [activeTab, setActiveTab] = useState("bank");
  const [copiedField, setCopiedField] = useState("");
  const [copyError, setCopyError] = useState("");

  const handleCopy = async (value, field) => {
    setCopyError("");

    try {
      if (!navigator.clipboard || !window.isSecureContext) {
        throw new Error("Clipboard unavailable");
      }

      await navigator.clipboard.writeText(value);
      setCopiedField(field);

      window.setTimeout(() => {
        setCopiedField((current) =>
          current === field ? "" : current
        );
      }, 2000);
    } catch {
      setCopiedField("");
      setCopyError(
        "Unable to copy automatically. Please select and copy the details manually."
      );
    }
  };

  const accountFields = [
    { label: "Account Name", value: churchAccount.name, id: "name" },
    { label: "Account Number", value: churchAccount.number, id: "number" },
    { label: "Bank Name", value: churchAccount.bank, id: "bank" },
  ];

  return (
    <main className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#102844] py-20 text-white sm:py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#102844] via-[#17365D] to-[#263D60]" />
        <div className="absolute -right-16 -top-20 -z-10 h-80 w-80 rounded-full bg-[#B42332]/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 -z-10 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />

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
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold"
          >
            <FaHeart className="text-red-300" />
            Giving at RCG
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
          >
            Give with a
            <span className="block text-red-300">Grateful Heart</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-base leading-8 text-blue-100 sm:text-lg md:text-xl"
          >
            Support the work of God through your tithes, offerings, and
            contributions to our church building project.
          </motion.p>

          <motion.a
            variants={fadeUp}
            href="#giving-options"
            className="mt-8 inline-flex items-center justify-center gap-3 rounded-xl bg-[#B42332] px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#941D2A]"
          >
            Explore Giving Options
            <FaArrowRight />
          </motion.a>
        </motion.div>
      </section>

      {/* Introduction */}
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#B42332]">
            Ways to Give
          </p>

          <h2 className="font-serif text-3xl font-bold text-[#17365D] sm:text-4xl">
            Giving Is an Act of Worship
          </h2>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#B42332]" />

          <p className="mt-6 text-base leading-8 text-gray-600 sm:text-lg">
            Explore the different ways you can contribute to the life and
            work of Reconciliation Church of God. Choose the giving option
            that applies to you and follow the bank transfer instructions
            below.
          </p>
        </motion.div>
      </section>

      {/* Giving categories */}
      <section
        id="giving-options"
        className="scroll-mt-28 bg-gray-50 px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12 text-center"
          >
            <h2 className="font-serif text-3xl font-bold text-[#17365D] sm:text-4xl">
              Choose How You'd Like to Give
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
              Each contribution can be identified by its purpose when
              making your transfer.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {givingOptions.map((option, index) => {
              const Icon = option.icon;

              return (
                <motion.article
                  key={option.type}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={fadeUp}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -5 }}
                  className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                    <Icon className="text-2xl text-[#17365D]" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-[#17365D]">
                    {option.type}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-gray-600">
                    {option.description}
                  </p>

                  <div className="mt-6 border-l-2 border-[#B42332] pl-4">
                    <p className="text-sm italic leading-6 text-gray-600">
                      {option.verse}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[#B42332]">
                      {option.reference}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("bank");
                      document
                        .getElementById("giving-payment")
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    }}
                    className="mt-7 inline-flex items-center gap-2 self-start font-semibold text-[#17365D] transition-colors hover:text-[#B42332]"
                  >
                    View bank details
                    <FaArrowRight className="text-sm" />
                  </button>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Payment instructions */}
      <section
        id="giving-payment"
        className="scroll-mt-28 px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-10 text-center"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#B42332]">
              Payment Information
            </p>

            <h2 className="font-serif text-3xl font-bold text-[#17365D] sm:text-4xl">
              Give Through Bank Transfer
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
              Use the account details below to make your contribution.
              Please confirm the details with the church if you are unsure
              before completing a transfer.
            </p>
          </motion.div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex border-b border-gray-200 bg-gray-50 p-2">
              <button
                type="button"
                role="tab"
                id="bank-tab"
                aria-selected={activeTab === "bank"}
                aria-controls="bank-panel"
                onClick={() => setActiveTab("bank")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-4 text-sm font-semibold transition-colors sm:text-base ${
                  activeTab === "bank"
                    ? "bg-[#17365D] text-white shadow-sm"
                    : "text-gray-600 hover:bg-white hover:text-[#17365D]"
                }`}
              >
                <FaRegBuilding />
                Bank Transfer
              </button>

              <button
                type="button"
                role="tab"
                id="online-tab"
                aria-selected={activeTab === "online"}
                aria-controls="online-panel"
                onClick={() => setActiveTab("online")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-4 text-sm font-semibold transition-colors sm:text-base ${
                  activeTab === "online"
                    ? "bg-[#17365D] text-white shadow-sm"
                    : "text-gray-600 hover:bg-white hover:text-[#17365D]"
                }`}
              >
                <FaCreditCard />
                Online Payment
              </button>
            </div>

            {activeTab === "bank" && (
              <motion.div
                key="bank"
                id="bank-panel"
                role="tabpanel"
                aria-labelledby="bank-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 sm:p-8"
              >
                <div className="mb-7 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                    <FaChurch className="text-xl text-[#17365D]" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#17365D]">
                      Church Account Details
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      Copy an individual detail using the button beside it.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {accountFields.map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={`account-${field.id}`}
                        className="mb-2 block text-sm font-semibold text-gray-700"
                      >
                        {field.label}
                      </label>

                      <div className="flex min-w-0 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-4">
                        <span
                          id={`account-${field.id}`}
                          className={`min-w-0 flex-1 break-words text-sm font-semibold text-gray-800 sm:text-base ${
                            field.id === "number" ? "font-mono tracking-wider" : ""
                          }`}
                        >
                          {field.value}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleCopy(field.value, field.id)}
                          aria-label={`Copy ${field.label}`}
                          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-[#17365D] transition-colors hover:border-[#17365D] hover:bg-blue-50"
                        >
                          {copiedField === field.id ? (
                            <>
                              <FaCheck className="text-green-600" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <FaCopy />
                              <span className="hidden sm:inline">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {copyError && (
                  <p
                    role="alert"
                    className="mt-4 rounded-lg bg-red-50 p-3 text-sm leading-6 text-red-700"
                  >
                    {copyError}
                  </p>
                )}

                <div className="mt-7 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <FaInfoCircle className="mt-1 shrink-0 text-[#17365D]" />
                  <div className="text-sm leading-7 text-gray-700">
                    <p className="font-bold text-[#17365D]">
                      Please identify your transfer
                    </p>
                    Include your name and the purpose of your contribution
                    in the transfer description, for example, "Tithe",
                    "Offering", or "Ofada Building Offering".
                  </div>
                </div>

                {/* <p className="mt-5 text-xs leading-6 text-gray-500">
                  The same account details are currently displayed for all
                  three giving categories, as provided in the existing page.
                  Please verify that this arrangement is correct with the
                  church.
                </p> */}
              </motion.div>
            )}

            {activeTab === "online" && (
              <motion.div
                key="online"
                id="online-panel"
                role="tabpanel"
                aria-labelledby="online-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-6 py-14 text-center sm:px-10"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                  <FaCreditCard className="text-2xl text-[#17365D]" />
                </div>

                <span className="mt-5 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
                  Coming Soon
                </span>

                <h3 className="mt-4 text-xl font-bold text-[#17365D]">
                  Online Payments
                </h3>

                <p className="mx-auto mt-3 max-w-lg leading-7 text-gray-600">
                  Secure online payment options have not yet been integrated.
                  In the meantime, please use the bank transfer details
                  provided on this page.
                </p>

                <button
                  type="button"
                  onClick={() => setActiveTab("bank")}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#17365D] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#B42332]"
                >
                  View Bank Details
                  <FaArrowRight />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Giving scripture */}
      <section className="relative isolate overflow-hidden bg-[#17365D] px-5 py-16 text-white sm:px-8 sm:py-20">
        <div className="absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-[#B42332]/20 blur-3xl" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <FaGift className="text-2xl text-red-300" />
          </div>

          <blockquote className="mt-7 font-serif text-xl italic leading-relaxed sm:text-2xl md:text-3xl">
            "Each of you should give what you have decided in your heart to
            give, not reluctantly or under compulsion, for God loves a
            cheerful giver."
          </blockquote>

          <p className="mt-6 font-semibold text-red-300">
            2 Corinthians 9:7
          </p>
        </motion.div>
      </section>
    </main>
  );
};

export default Donation;