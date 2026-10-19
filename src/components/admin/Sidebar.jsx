
import React from "react";
import {
  FaChartPie,
  FaEnvelope,
  FaUsers,
  FaHandsHelping,
  FaSignOutAlt,
  FaChurch,
  FaChevronRight,
  FaShieldAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import church_logo from "../../assets/church_logo.png";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      description: "Overview",
      icon: FaChartPie,
    },
    {
      id: "contacts",
      label: "Contact Messages",
      description: "Enquiries",
      icon: FaEnvelope,
    },
    {
      id: "members",
      label: "New Members",
      description: "Registrations",
      icon: FaUsers,
    },
    {
      id: "workforce",
      label: "Workforce",
      description: "Applications",
      icon: FaHandsHelping,
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/adminlogin", { replace: true });
  };

  return (
    <aside className="sticky top-0 flex h-screen w-20 shrink-0 flex-col overflow-y-auto bg-[#07152f] text-white shadow-xl sm:w-64 lg:w-72">
      {/* Church branding */}
      <div className="border-b border-white/10 px-3 py-6 sm:px-5 lg:px-6">
        <div className="flex items-center justify-center gap-3 sm:justify-start">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 shadow-md ring-1 ring-white/10 sm:h-12 sm:w-12">
            <img
              src={church_logo}
              alt="Reconciliation Church of God logo"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="hidden min-w-0 sm:block">
            <h1 className="text-sm font-bold leading-5 text-white lg:text-base">
              Reconciliation
              <span className="block">Church of God</span>
            </h1>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-red-400 lg:text-xs">
              HisGrace Chapel
            </p>
          </div>
        </div>

        <div className="mt-5 hidden rounded-xl border border-white/10 bg-white/5 px-3 py-3 sm:block">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600/15 text-red-400">
              <FaShieldAlt />
            </span>
            <div>
              <p className="text-xs font-semibold text-white">
                Admin Portal
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400">
                Church management
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Admin navigation"
        className="flex-1 space-y-2 px-2 py-6 sm:px-3 lg:px-4"
      >
        <p className="mb-4 hidden px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 sm:block">
          Main Menu
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveSection(item.id)}
              title={item.label}
              aria-current={isActive ? "page" : undefined}
              className={`group relative flex w-full items-center justify-center gap-3 rounded-xl px-2 py-3.5 text-left transition-all duration-200 sm:justify-start sm:px-3 lg:px-4 ${
                isActive
                  ? "bg-red-600 text-white shadow-lg shadow-red-950/20"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {isActive && (
                <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-white sm:hidden" />
              )}

              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg transition-colors ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white"
                }`}
              >
                <Icon />
              </span>

              <span className="hidden min-w-0 flex-1 sm:block">
                <span className="block text-sm font-semibold">
                  {item.label}
                </span>
                <span
                  className={`mt-0.5 block text-[11px] ${
                    isActive ? "text-red-100" : "text-slate-500"
                  }`}
                >
                  {item.description}
                </span>
              </span>

              <FaChevronRight
                className={`hidden text-xs transition-transform sm:block ${
                  isActive
                    ? "text-white"
                    : "text-slate-600 group-hover:translate-x-0.5 group-hover:text-white"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Account and logout */}
      <div className="mt-auto border-t border-white/10 p-2 sm:p-3 lg:p-4">
        <div className="mb-3 hidden items-center gap-3 rounded-xl bg-white/5 p-3 sm:flex">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-900 text-blue-200">
            <FaChurch />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-white">
              Church Administrator
            </p>
            <p className="mt-1 text-[10px] text-slate-400">
              Authorized access
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-red-500/20 bg-red-600/10 px-2 py-3.5 text-sm font-semibold text-red-300 transition hover:border-red-500 hover:bg-red-600 hover:text-white sm:justify-start sm:px-3 lg:px-4"
          title="Logout"
        >
          <FaSignOutAlt className="shrink-0 text-lg" />
          <span className="hidden sm:inline">Logout</span>
        </button>

        <p className="mt-4 hidden text-center text-[10px] text-slate-600 sm:block">
          RCG HisGrace Chapel
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;