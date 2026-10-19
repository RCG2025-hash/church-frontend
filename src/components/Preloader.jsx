
import React, { useEffect, useState } from "react";
import church_logo from "../assets/church_logo.png";

const Preloader = ({ isLoading = true, onFinish }) => {
  const [isFading, setIsFading] = useState(false);

  
useEffect(() => {
  if (isLoading) {
    setIsFading(false);
    return;
  }

  setIsFading(true);

  const timer = window.setTimeout(() => {
    onFinish?.();
  }, 700);

  return () => window.clearTimeout(timer);
}, [isLoading, onFinish]);


  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={isLoading}
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0b1429] px-5 transition-opacity duration-700 ${
        isFading
          ? "pointer-events-none opacity-0"
          : "opacity-100"
      }`}
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-red-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:42px_42px]" />
      </div>

      {/* Main content */}
      <div
        className={`relative z-10 w-full max-w-lg text-center transition-all duration-700 ${
          isFading
            ? "translate-y-3 scale-95 opacity-0"
            : "translate-y-0 scale-100 opacity-100"
        }`}
      >
        {/* Church logo */}
        <div className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center sm:h-36 sm:w-36">
          <div className="absolute inset-0 rounded-full border border-red-500/20 animate-ping [animation-duration:3s]" />

          <div className="absolute inset-2 rounded-full border border-white/10" />

          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-white p-3 shadow-[0_0_55px_rgba(220,38,38,0.16)] sm:h-32 sm:w-32">
            <img
              src={church_logo}
              alt="Reconciliation Church of God"
              className="h-full w-full object-contain animate-[logoFloat_3s_ease-in-out_infinite]"
            />
          </div>

          <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full border-[3px] border-[#0b1429] bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.7)]" />
        </div>

        {/* Church name */}
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.35em] text-red-400 sm:text-xs">
          Welcome to
        </p>

        <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
          Reconciliation
          <span className="mt-1 block text-red-500">
            Church of God
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-slate-400 sm:text-base">
          Preparing your spiritual journey
        </p>

        {/* Indeterminate loading bar */}
        <div className="mx-auto mt-10 max-w-xs sm:max-w-sm">
          <div className="mb-3 flex items-center justify-between text-xs">
            <span className="font-medium tracking-wide text-slate-400">
              Preparing your experience
            </span>
            <span className="font-semibold text-white">
              Please wait
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-red-700 via-red-500 to-red-400 animate-[loadingBar_1.5s_ease-in-out_infinite]" />
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="h-1.5 w-1.5 rounded-full bg-red-500 animate-[dotPulse_1.2s_ease-in-out_infinite]"
                style={{ animationDelay: `${dot * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Bible verse */}
        <div className="mx-auto mt-9 max-w-md border-t border-white/10 pt-6">
          <p className="text-sm italic leading-6 text-slate-400">
            “But they that wait upon the Lord shall renew their
            strength; they shall mount up with wings as eagles.”
          </p>

          <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.25em] text-red-400">
            Isaiah 40:31
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-5 left-0 right-0 px-4 text-center">
        <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-slate-600 sm:text-[10px]">
          Faith · Fellowship · Reconciliation
        </p>
      </div>

      {/* Animation definitions */}
      <style>{`
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        @keyframes loadingBar {
          0% { transform: translateX(-110%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(260%); }
        }

        @keyframes dotPulse {
          0%, 60%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          30% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Preloader;