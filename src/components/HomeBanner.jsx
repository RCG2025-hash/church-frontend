import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { FaChurch, FaPrayingHands, FaUsers, FaCalendarAlt } from "react-icons/fa";

// Sample banner images (replace with your actual images)
const banner1 = "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
const banner2 = "https://images.unsplash.com/photo-1584983311807-3c6081bca0d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80";
const banner3 = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80";

const slides = [
  {
    image: banner1,
    caption: "Welcome to Reconciliation Church",
    subCaption: "Where Faith, Family, and Fellowship Thrive",
    ctaText: "Join Us This Sunday",
    verse: "For where two or three gather in my name, there am I with them. - Matthew 18:20"
  },
  {
    image: banner2,
    caption: "Experience God's Presence",
    subCaption: "Join our vibrant worship community",
    ctaText: "View Service Times",
    verse: "Worship the LORD with gladness; come before him with joyful songs. - Psalm 100:2"
  },
  {
    image: banner3,
    caption: "Building a Community in Christ",
    subCaption: "Growing together in faith and love",
    ctaText: "Learn About Our Ministries",
    verse: "They devoted themselves to the apostles' teaching and to fellowship - Acts 2:42"
  },
];

const serviceTimes = [
  { day: "Sunday", times: "8:30 AM - 11:30 AM" },
  { day: "Tues", times: "6:00 PM - 7:30 PM" },
  { day: "Thur", times: "8:30 AM - 10:00 AM" }
];

const HomeBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <section id="home" className="relative w-full h-screen">
      <Slider {...settings} className="h-full">
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-screen">
            {/* Background Image with Gradient Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            
            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900/70 z-10" />
            
            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white text-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-4xl"
              >
                {/* Church Icon */}
                <div className="flex justify-center mb-6">
                  <div className="p-3 bg-amber-600/20 rounded-full backdrop-blur-sm">
                    <FaChurch className="text-4xl text-amber-400" />
                  </div>
                </div>
                
                {/* Main Caption */}
                <h1 className="text-4xl md:text-6xl font-bold mb-4 font-serif tracking-wide">
                  {slide.caption}
                </h1>
                
                {/* Sub Caption */}
                <p className="text-xl md:text-2xl mb-8 text-amber-100 font-light max-w-2xl mx-auto">
                  {slide.subCaption}
                </p>
                
                {/* Bible Verse */}
                <p className="text-sm md:text-base italic text-gray-200 mb-10 max-w-2xl mx-auto">
                  {slide.verse}
                </p>
                
                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-300"
                >
                  {slide.ctaText}
                </motion.button>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>
      
      {/* Service Times Overlay */}
      <div className="absolute bottom-6 left-0 right-0 z-30 px-4">
        <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center flex items-center justify-center">
            <FaCalendarAlt className="mr-2 text-amber-600" />
            Service Times
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {serviceTimes.map((service, index) => (
              <div key={index} className="text-center">
                <p className="font-semibold text-gray-800">{service.day}</p>
                <p className="text-amber-700">{service.times}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-30 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-1">Scroll Down</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;