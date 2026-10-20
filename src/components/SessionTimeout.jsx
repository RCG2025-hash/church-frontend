
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PUBLIC_TIMEOUT = 60 * 60 * 1000; // 1 hour
const ADMIN_TIMEOUT = 30 * 60 * 1000; // 30 minutes

const PUBLIC_KEY = "rcgPublicLastActivity";
const ADMIN_KEY = "rcgAdminLastActivity";

const SessionTimeout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isDashboard = location.pathname === "/admindashboard";

  useEffect(() => {
    // Do not run the public timer on admin pages.
    if (isAdminRoute && !isDashboard) {
      sessionStorage.removeItem(PUBLIC_KEY);
      return;
    }

    const isAdmin = isDashboard;
    const timeout = isAdmin ? ADMIN_TIMEOUT : PUBLIC_TIMEOUT;
    const key = isAdmin ? ADMIN_KEY : PUBLIC_KEY;

    let timer;

    const expireSession = () => {
      window.clearTimeout(timer);
      sessionStorage.removeItem(key);

      if (isAdmin) {
        localStorage.removeItem("token");
        sessionStorage.removeItem(ADMIN_KEY);
        navigate("/adminlogin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    };

    const checkTimeout = () => {
      const lastActivity = Number(sessionStorage.getItem(key));

      if (!lastActivity || !Number.isFinite(lastActivity)) {
        sessionStorage.setItem(key, String(Date.now()));
        timer = window.setTimeout(expireSession, timeout);
        return;
      }

      const remaining = timeout - (Date.now() - lastActivity);

      window.clearTimeout(timer);

      if (remaining <= 0) {
        expireSession();
      } else {
        timer = window.setTimeout(expireSession, remaining);
      }
    };

    const recordActivity = () => {
      sessionStorage.setItem(key, String(Date.now()));
      checkTimeout();
    };

    const checkWhenReturning = () => {
      if (document.visibilityState === "visible") {
        checkTimeout();
      }
    };

    const events = [
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
      "mousemove",
    ];

    events.forEach((event) => {
      window.addEventListener(event, recordActivity, { passive: true });
    });

    document.addEventListener("visibilitychange", checkWhenReturning);
    window.addEventListener("focus", checkWhenReturning);

    checkTimeout();

    return () => {
      window.clearTimeout(timer);
      events.forEach((event) =>
        window.removeEventListener(event, recordActivity)
      );
      document.removeEventListener("visibilitychange", checkWhenReturning);
      window.removeEventListener("focus", checkWhenReturning);
    };
  }, [isAdminRoute, isDashboard, location.pathname, navigate]);

  return null;
};

export default SessionTimeout;