import React from "react";
import {
  FaChartPie,
  FaEnvelope,
  FaUsers,
  FaHandsHelping,
  FaSignOutAlt,
  FaChurch,
} from "react-icons/fa";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <FaChartPie />,
    },
    {
      id: "contacts",
      label: "Contact Messages",
      icon: <FaEnvelope />,
    },
    {
      id: "members",
      label: "New Members",
      icon: <FaUsers />,
    },
    {
      id: "workforce",
      label: "Workforce",
      icon: <FaHandsHelping />,
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/adminlogin";
  };

  return (
    <aside className="w-72 bg-gray-900 text-white min-h-screen shadow-xl">

      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <FaChurch className="text-3xl text-amber-400" />

          <div>
            <h1 className="font-bold text-lg">
              Church Admin
            </h1>

            <p className="text-gray-400 text-sm">
              Management Portal
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}

      <nav className="mt-6">

        {menuItems.map((item) => (

          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-200

            ${
              activeSection === item.id
                ? "bg-amber-600 text-white"
                : "hover:bg-gray-800 text-gray-300"
            }
            `}
          >

            <span className="text-xl">

              {item.icon}

            </span>

            <span className="font-medium">

              {item.label}

            </span>

          </button>

        ))}

      </nav>

      {/* Logout */}

      <div className="absolute bottom-0 w-72">

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-6 py-5 bg-red-600 hover:bg-red-700 transition"
        >
          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>
  );
};

export default Sidebar;