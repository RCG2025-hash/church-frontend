
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import Pastors from "./pages/Pastors";
import Events from "./pages/Events";
import Live from "./pages/Live";
import Contact from "./pages/Contact";
import Donation from "./pages/Donation";
import JoinWorkforce from "./pages/JoinWorkForce";
import NewMember from "./pages/NewMember";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import ScrollToTop from "./components/ScrollToTop";
import BackToTopButton from "./components/BackToTopButton";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const AppLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Show the preloader on every public page load or refresh.
  const [showPreloader, setShowPreloader] = useState(
    () => !isAdminRoute
  );

  const [loading, setLoading] = useState(
    () => !isAdminRoute
  );

  // Keep the preloader visible for 2.5 seconds.
  useEffect(() => {
    if (isAdminRoute) {
      setLoading(false);
      setShowPreloader(false);
      return;
    }

    if (!showPreloader || !loading) return;

    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [isAdminRoute, showPreloader, loading]);

  // Hide the preloader on admin routes.
  useEffect(() => {
    if (isAdminRoute) {
      setLoading(false);
      setShowPreloader(false);
    }
  }, [isAdminRoute]);

  // Called after the preloader fade-out animation finishes.
  const handlePreloaderFinish = () => {
    setShowPreloader(false);
  };

  return (
    <>
      {/* Preloader */}
      {showPreloader && (
        <Preloader
          isLoading={loading}
          onFinish={handlePreloaderFinish}
        />
      )}

      {/* Scroll to top when the route changes */}
      <ScrollToTop />

      {/* Public navbar */}
      {!isAdminRoute && <Navbar />}

      {/* Spacer for the fixed navbar */}
      {!isAdminRoute && (
        <div
          aria-hidden="true"
          className="h-[76px] sm:h-[84px] lg:h-[76px]"
        />
      )}

      {/* Website pages */}
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pastors" element={<Pastors />} />
        <Route path="/events" element={<Events />} />
        <Route path="/live" element={<Live />} />
        <Route path="/donation" element={<Donation />} />

        <Route
          path="/joinworkforce"
          element={<JoinWorkforce />}
        />

        <Route
          path="/newmember"
          element={<NewMember />}
        />

        <Route path="/contact" element={<Contact />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/adminlogin"
          element={<AdminLogin />}
        />

        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Public-page controls */}
      {!isAdminRoute && <BackToTopButton />}
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default AppLayout;