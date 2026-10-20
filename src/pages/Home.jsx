
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaChurch,
  FaClock,
  FaHandHoldingHeart,
  FaPrayingHands,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import BackToTopButton from "../components/BackToTopButton";
import churchBanner from "../assets/Banner.jpg";
import churchImage from "../assets/convention_pics.jpg";

const navy = "#17365D";
const red = "#B42332";

const services = [
  {
    day: "Sunday",
    title: "Sunday Worship",
    details: [
      ["Sunday School", "8:00 AM – 8:30 AM"],
      ["Sunday Service", "8:30 AM – 11:30 AM"],
    ],
  },
  {
    day: "Tuesday",
    title: "Bible Study",
    details: [["Word Power Impartation", "6:00 PM – 7:30 PM"]],
  },
  {
    day: "Wednesday",
    title: "Prayer Meetings",
    details: [
      ["Waiting Fathers & Mothers of Nations", "8:00 AM – 11:00 AM"],
      ["Prayer Warriors Intercession Hour", "4:00 PM"],
      ["Workers Fasting & Prayer", "5:00 PM – 6:00 PM"],
    ],
  },
  {
    day: "Thursday",
    title: "Divine Solution Hour",
    details: [["Morning Service", "8:30 AM – 10:00 AM"]],
  },
  {
    day: "Monthly",
    title: "Night Vigil",
    details: [["Every last Friday", "11:00 PM – 4:00 AM"]],
  },
  {
    day: "Monthly",
    title: "Prophetic Early Morning Service",
    details: [["First day of every month", "6:00 AM – 7:00 AM"]],
  },
  {
    day: "Monthly",
    title: "Monthly Revival",
    details: [["1st–3rd day of the month", "6:00 PM – 8:00 PM"]],
  },
];

const ministries = [
  {
    title: "Children's Ministry",
    description: "Nurturing young hearts in faith, love, and God's Word.",
    icon: FaHandHoldingHeart,
  },
  {
    title: "Youth Group",
    description: "Helping young people grow spiritually and discover their purpose.",
    icon: FaUsers,
  },
  {
    title: "Good Women",
    description: "Encouraging women to grow in faith and support one another.",
    icon: FaPrayingHands,
  },
  {
    title: "Excellent Men",
    description: "Building men of faith, integrity, prayer, and service.",
    icon: FaChurch,
  },
  {
    title: "Prayer Ministry",
    description: "Coming together in prayer, intercession, and fellowship.",
    icon: FaPrayingHands,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function Home() {
  return (
    <main className="overflow-hidden bg-white text-slate-800">
      {/* Hero */}
      <section className="relative flex min-h-[680px] items-center bg-slate-950 sm:min-h-[740px]">
       <img
        src={churchBanner}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(9,25,46,0.92) 0%, rgba(9,25,46,0.72) 55%, rgba(9,25,46,0.35) 100%)",
          }}
        />

        <div className="relative z-20 mx-auto w-full max-w-7xl px-5 pb-20 pt-40 sm:px-8 sm:pt-44 lg:px-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <FaChurch style={{ color: "#F2B7BD" }} />
              Reconciliation Church of God International
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Welcome to Your
              <span className="block" style={{ color: "#F2B7BD" }}>
                Father's House.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              The Home of Empowerment. Discover God's grace, grow in His Word,
              and find a church family where you can belong and flourish.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/newmember"
                className="inline-flex items-center justify-center gap-3 rounded-lg px-7 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
                style={{ backgroundColor: red }}
              >
                Join Our Church
                <FaArrowRight />
              </Link>

              <Link
                to="/live"
                className="inline-flex items-center justify-center gap-3 rounded-lg border border-white/60 px-7 py-4 font-semibold text-white transition hover:bg-white hover:text-slate-900"
              >
                Watch Online
                <span aria-hidden="true">▶</span>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-slate-200">
              <span className="flex items-center gap-2">
                <FaClock style={{ color: "#F2B7BD" }} />
                Sunday School: 8:00 AM
              </span>
              <span className="flex items-center gap-2">
                <FaChurch style={{ color: "#F2B7BD" }} />
                Sunday Worship: 8:30 AM
              </span>
            </div>
          </motion.div>
        </div>

        <div
          className="absolute bottom-0 left-0 h-1.5 w-full"
          style={{ backgroundColor: red }}
        />
      </section>

      {/* Welcome */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <p
              className="mb-3 text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: red }}
            >
              Welcome to RCG
            </p>

            <h2
              className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
              style={{ color: navy }}
            >
              A place of grace, restoration, and empowerment.
            </h2>

            <div
              className="mt-5 h-1 w-20 rounded-full"
              style={{ backgroundColor: red }}
            />

            <p className="mt-7 text-base leading-8 text-slate-600">
              Welcome to the website of Reconciliation Church of God Intl. This is a Full Pentecostal Church with major assignment in the Preaching of the Word of Grace as the pathway for reconciling the lost children of the Most High God back to Him. Our major focus is in looking for those who have backslided or have not known Him at all and use the provisions of the scriptures, as contained in the Gospel of Jesus Christ, to bring about a reunion and foster a flourishing relationship with Him thereafter. We believe that no matter how terribly a man has walked in the past, God has the ability to receive him back as long as the very simple condition of sincere repentance and forsaking of sin can be met. We believe that the most appropriate place to receive and be restored into one's Honour is in The Father's House. As you read this piece, if you are in any way out of Favour or Honour, like that prodigal son, I like you to know that God, your Father, is waiting with an outstretched arms to receive you back and restore your dignity. Once again, we say, WELCOME TO OUR WORLD OF GRACE.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600">
              Wherever you are on your spiritual journey, you are welcome to
              discover God's love, grow in faith, and experience fellowship
              with us.
            </p>

            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-3 font-semibold transition hover:gap-4"
              style={{ color: navy }}
            >
              Learn More About Us <FaArrowRight style={{ color: red }} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative"
          >
            <div
              className="absolute -bottom-4 -left-4 h-2/3 w-2/3 rounded-2xl"
              style={{ backgroundColor: red }}
            />
            <img
              src={churchImage}
              alt="Church community"
              className="relative z-10 h-[350px] w-full rounded-2xl object-cover shadow-xl sm:h-[460px]"
            />
            <div className="absolute -right-3 -top-3 z-20 h-20 w-20 rounded-full border-8 border-white sm:-right-5 sm:-top-5 sm:h-28 sm:w-28"
              style={{ backgroundColor: navy }}
            />
          </motion.div>
        </div>
      </section>

      {/* Service times */}
      <section id="service-times" className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            className="mx-auto mb-12 max-w-2xl text-center"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p
              className="mb-3 text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: red }}
            >
              Worship With Us
            </p>
            <h2
              className="text-3xl font-bold sm:text-4xl"
              style={{ color: navy }}
            >
              Our Service Times
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Make time to worship, study God's Word, and fellowship with us
              throughout the week.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                viewport={{ once: true, amount: 0.1 }}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl text-white"
                    style={{ backgroundColor: navy }}
                  >
                    <FaCalendarAlt />
                  </div>

                  <div className="min-w-0">
                    <p
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: red }}
                    >
                      {service.day}
                    </p>
                    <h3
                      className="mt-1 text-lg font-bold"
                      style={{ color: navy }}
                    >
                      {service.title}
                    </h3>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {service.details.map(([label, time]) => (
                    <div key={label}>
                      <p className="text-sm leading-6 text-slate-600">
                        {label}
                      </p>
                      <p className="mt-1 flex items-start gap-2 text-sm font-semibold text-slate-800">
                        <FaClock
                          className="mt-1 shrink-0"
                          style={{ color: red }}
                        />
                        {time}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="https://maps.app.goo.gl/3QhVyfGu1kqPTqhP8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-lg px-7 py-3.5 font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: red }}
            >
              Get Directions <FaArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* Ministries */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p
              className="mb-3 text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: red }}
            >
              Grow and Serve
            </p>
            <h2
              className="text-3xl font-bold sm:text-4xl"
              style={{ color: navy }}
            >
              Find Your Place in Our Family
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Connect with others, develop your gifts, and serve God through
              fellowship and ministry.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ministries.map((ministry, index) => {
              const Icon = ministry.icon;

              return (
                <motion.article
                  key={ministry.title}
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeUp}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="rounded-xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl text-2xl"
                    style={{ backgroundColor: "#FCEBED", color: red }}
                  >
                    <Icon />
                  </div>

                  <h3
                    className="text-xl font-bold"
                    style={{ color: navy }}
                  >
                    {ministry.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {ministry.description}
                  </p>

                  <Link
                    to="/joinworkforce"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition hover:gap-3"
                    style={{ color: red }}
                  >
                    Get Involved <FaArrowRight />
                  </Link>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/joinworkforce"
              className="inline-flex items-center gap-3 rounded-lg px-7 py-3.5 font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: navy }}
            >
              Join Our Workforce <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Explore the church */}
      <section className="py-16" style={{ backgroundColor: "#F4F6FA" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mb-10 text-center">
            <p
              className="mb-3 text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: red }}
            >
              Get Connected
            </p>
            <h2
              className="text-3xl font-bold sm:text-4xl"
              style={{ color: navy }}
            >
              Take Your Next Step
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Meet Our Pastors",
                description:
                  "Get to know the leaders serving and guiding our church.",
                path: "/pastors",
                action: "Meet the Pastors",
              },
              {
                title: "Church Events",
                description:
                  "Discover opportunities for worship, fellowship, and growth.",
                path: "/events",
                action: "Explore Events",
              },
              {
                title: "Give and Support",
                description:
                  "Learn how to support the work and mission of the church.",
                path: "/donation",
                action: "Learn About Giving",
              },
            ].map((item) => (
              <article
                key={item.path}
                className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <h3
                  className="text-xl font-bold"
                  style={{ color: navy }}
                >
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {item.description}
                </p>
                <Link
                  to={item.path}
                  className="mt-6 inline-flex items-center gap-2 font-semibold"
                  style={{ color: red }}
                >
                  {item.action} <FaArrowRight />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final invitation */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div
          className="absolute inset-0"
          style={{ backgroundColor: navy }}
        />
        <div
          className="absolute right-0 top-0 h-full w-1/3 opacity-20"
          style={{
            background:
              "linear-gradient(135deg, transparent, #B42332)",
          }}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-4xl px-5 text-center sm:px-8"
        >
          <p
            className="mb-3 text-sm font-bold uppercase tracking-[0.2em]"
            style={{ color: "#F2B7BD" }}
          >
            You Are Welcome Here
          </p>
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-5xl">
            Come Experience a World of Grace
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            Join us for worship, fellowship, and the teaching of God's Word.
            We look forward to welcoming you.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/newmember"
              className="rounded-lg px-7 py-4 font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: red }}
            >
              Plan Your Visit
            </Link>
            <Link
              to="/contact"
              className="rounded-lg border border-white/60 px-7 py-4 font-semibold text-white transition hover:bg-white hover:text-slate-900"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>

      <BackToTopButton />
    </main>
  );
}

export default Home;
