import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"; // Added useLocation
import { useEffect, useState } from "react";
import Home from "./pages/Home.jsx"; // Added .jsx extension
import About from "./pages/About.jsx"; // Added .jsx extension
import Pastors from "./pages/Pastors.jsx"; // Added .jsx extension
import Events from "./pages/Events.jsx"; // Added .jsx extension
import Live from "./pages/Live.jsx" // Added .jsx extension
import Contact from './pages/Contact.jsx' // Added .jsx extension
import Donation from "./pages/Donation.jsx"; // Added .jsx extension
import JoinWorkforce from "./pages/JoinWorkForce.jsx"; // Added .jsx extension
import NewMember from "./pages/NewMember.jsx"; // Added .jsx extension
import Navbar from "./components/Navbar.jsx"; // Added .jsx extension
import Footer from "./components/Footer.jsx"; // Added .jsx extension
import AdminDashboard from "./pages/AdminDashboard.jsx"; // Added .jsx extension
import AdminLogin from './pages/AdminLogin.jsx' // Added .jsx extension
import Preloader from './components/Preloader.jsx'; // Added .jsx extension
import './index.css'

// New component to handle conditional rendering of Navbar/Footer
const AppContent = () => {
  const location = useLocation();
  // Check if the current path starts with /admin (for both adminlogin and admindashboard)
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Your existing preloader and nav link logic
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); 
    const handleNavLinkClick = (event) => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Ensure navLinks are only queried after the DOM is ready and relevant elements exist
    // This part might need adjustment depending on where .nav-link elements are actually rendered
    // If they are part of the Navbar, this useEffect should ideally be in Navbar itself
    // For now, keeping it as is, but noting potential refactor.
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => link.addEventListener("click", handleNavLinkClick));

    return () => {
      clearTimeout(timer);
      navLinks.forEach((link) => link.removeEventListener("click", handleNavLinkClick));
    };
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      {!isAdminRoute && <Navbar />} {/* Conditionally render Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pastors" element={<Pastors />} />
        <Route path="/events" element={<Events />} />
        <Route path="/live" element={<Live />} />
        <Route path="/donation" element={<Donation />} />
        <Route path='/joinworkforce' element={<JoinWorkforce />} />
        <Route path="/newmember" element={<NewMember />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Admin Routes - these will not have Navbar or Footer */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path='/admindashboard' element={<AdminDashboard />} />
        
      </Routes>
      {!isAdminRoute && <Footer />} {/* Conditionally render Footer */}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent /> {/* Render the new AppContent component inside Router */}
    </Router>
  );
}

export default App;
