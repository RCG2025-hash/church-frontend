import React from "react";
import {
  FaEnvelope,
  FaUsers,
  FaHandsHelping,
  FaDatabase,
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
      icon: <FaEnvelope className="text-3xl text-white" />,
      bg: "bg-blue-600",
    },
    {
      title: "New Members",
      value: safeStats.members,
      icon: <FaUsers className="text-3xl text-white" />,
      bg: "bg-green-600",
    },
    {
      title: "Workforce",
      value: safeStats.workforce,
      icon: <FaHandsHelping className="text-3xl text-white" />,
      bg: "bg-amber-600",
    },
    {
      title: "Total Records",
      value: safeStats.total,
      icon: <FaDatabase className="text-3xl text-white" />,
      bg: "bg-purple-600",
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`${card.bg} rounded-xl shadow-lg p-6 text-white transition-transform duration-300 hover:scale-105`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm uppercase tracking-wide opacity-90">
                  {card.title}
                </p>

                <h3 className="text-4xl font-bold mt-3">
                  {card.value}
                </h3>
              </div>

              <div className="bg-white/20 p-4 rounded-full">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;