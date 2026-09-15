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

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/admin/ProtectedRoute";

const AppLayout = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  const isFirstVisit = !sessionStorage.getItem("preloaderShown");

  const [loading, setLoading] = useState(
    isFirstVisit && !isAdminRoute
  );

  /*
  ==============================
  PRELOADER
  ==============================
  */

  useEffect(() => {

    if (isAdminRoute) {
      setLoading(false);
      return;
    }

    if (!isFirstVisit) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {

      setLoading(false);

      sessionStorage.setItem(
        "preloaderShown",
        "true"
      );

    }, 2500);

    return () => clearTimeout(timer);

  }, [isAdminRoute, isFirstVisit]);


  /*
  ==============================
  PRELOADER
  ==============================
  */

  if (loading) {

    return <Preloader />;

  }

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>

        {/* PUBLIC */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/pastors"
          element={<Pastors />}
        />

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/live"
          element={<Live />}
        />

        <Route
          path="/donation"
          element={<Donation />}
        />

        <Route
          path="/joinworkforce"
          element={<JoinWorkforce />}
        />

        <Route
          path="/newmember"
          element={<NewMember />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* ADMIN */}

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

      {!isAdminRoute && <Footer />}
    </>
  );
};

export default AppLayout;