
import React from "react";
import {
  FaEnvelope,
  FaUsers,
  FaHandsHelping,
  FaDatabase,
  FaArrowUp,
} from "react-icons/fa";

const DashboardCards = ({ stats }) => {
  const safeStats = {
    contacts: Number(stats?.contacts ?? 0),
    members: Number(stats?.members ?? 0),
    workforce: Number(stats?.workforce ?? 0),
    total: Number(stats?.total ?? 0),
  };

  const cards = [
    {
      title: "Contact Messages",
      value: safeStats.contacts,
      description: "Messages received",
      icon: FaEnvelope,
      iconBg: "bg-blue-50",
      iconColor: "text-[#12346a]",
      accent: "bg-[#12346a]",
    },
    {
      title: "New Members",
      value: safeStats.members,
      description: "Member registrations",
      icon: FaUsers,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
      accent: "bg-red-600",
    },
    {
      title: "Workforce",
      value: safeStats.workforce,
      description: "Workforce applications",
      icon: FaHandsHelping,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      accent: "bg-indigo-600",
    },
    {
      title: "Total Records",
      value: safeStats.total,
      description: "Across all categories",
      icon: FaDatabase,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-700",
      accent: "bg-slate-500",
    },
  ];

  return (
    <section className="mb-8">
      {/* Section heading */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1 w-7 rounded-full bg-red-600" />
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">
              At a glance
            </p>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-[#0b1f46] sm:text-3xl">
            Dashboard Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            A summary of your church administration records.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-xs font-medium text-slate-600">
            Statistics overview
          </span>
        </div>
      </div>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg sm:p-6"
            >
              {/* Subtle top accent */}
              <div
                className={`absolute left-0 top-0 h-1 w-full ${card.accent} opacity-80`}
              />

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-500">
                    {card.title}
                  </p>

                  <h3 className="mt-3 break-words text-3xl font-extrabold tracking-tight text-[#0b1f46] sm:text-4xl">
                    {safeNumber(card.value)}
                  </h3>
                </div>

                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${card.iconBg} transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14`}
                >
                  <Icon className={`text-xl sm:text-2xl ${card.iconColor}`} />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <FaArrowUp className="text-[10px]" />
                </span>

                <p className="text-xs font-medium text-slate-500">
                  {card.description}
                </p>
              </div>

              {/* Decorative corner */}
              <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full border-[14px] border-slate-50 transition-transform duration-300 group-hover:scale-125" />
            </article>
          );
        })}
      </div>
    </section>
  );
};

// Format large numbers with thousands separators.
const safeNumber = (value) =>
  value.toLocaleString("en-NG");

export default DashboardCards;