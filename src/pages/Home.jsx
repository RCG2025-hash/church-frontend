import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Navbar from "../components/Navbar";
import HomeBanner from "../components/HomeBanner";
import About from "../pages/About";
import Pastors from "../pages/Pastors";
import Events from "../pages/Events";
import Contact from "../pages/Contact";
import Live from "../pages/Live";
import NewMember from "../pages/NewMember";
import Donation from "./Donation";
import JoinWorkForce from "./JoinWorkForce";
import BackToTopButton from "../components/BackToTopButton";
import { motion } from 'framer-motion';
import { FaChurch, FaPrayingHands, FaUsers, FaCalendarAlt, FaHandHoldingHeart,FaMusic, FaPray, FaHandsHelping, FaTimes  } from "react-icons/fa";

function Home() {
  const [scrolling, setScrolling] = useState(false);
  const [selectedMinistry, setSelectedMinistry] = useState(null);
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sample images (replace with your actual images)
  const churchHeroImage = "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
  const pastorsImage = "https://images.unsplash.com/photo-1586083702768-190b052a3f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80";
  const backgroundImage = "https://images.unsplash.com/photo-1584983311807-3c6081bca0d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80";

  // Quick facts about the church
  const churchStats = [
    { icon: FaChurch, number: "20+", label: "Years Serving" },
    { icon: FaUsers, number: "500+", label: "Members" },
    { icon: FaPrayingHands, number: "15+", label: "Ministries" },
    { icon: FaCalendarAlt, number: "20+", label: "Events Yearly" },
  ];

  // Service times
  // const serviceTimes = [
  //   { day: "Sunday Worship", time: "8:00 AM & 10:30 AM" },
  //   { day: "Bible Study", time: "Wednesday, 6:30 PM" },
  //   { day: "Prayer Meeting", time: "Friday, 7:00 PM" },
  //   { day: "Youth Service", time: "Saturday, 4:00 PM" },
  // ];

  return (
    <div className="min-h-screen">
      <Navbar isScrolled={scrolling} />
      
      {/* Hero Banner with fixed image display */}
      <section className="relative h-screen flex items-center justify-center text-white">
        {/* Background Image with proper display */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${churchHeroImage})` }}
        ></div>
        
        {/* Dark Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>

        {/* Content */}
        <div className="relative text-center z-20 px-4">
          <motion.h1 
            className="text-5xl md:text-5xl font-bold mb-6 font-serif"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Reconciliation Church of God!
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            The Home of Empowerment...
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >

<div className="flex flex-col sm:flex-row justify-center gap-4">
  <button 
    onClick={() => {
      // Scroll to service times section
      const element = document.getElementById('service-times');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }}
    className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-md transition-colors"
  >
    Join Us
  </button>
  <button 
    onClick={() => {
      // Scroll to live streaming section
      const element = document.getElementById('live');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }}
    className="px-8 py-3 border-2 border-white hover:bg-white hover:text-gray-900 font-semibold rounded-lg transition-colors"
  >
    Watch Online
  </button>
</div>
          </motion.div>
        </div>
      </section>

<section id="service-times" className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl font-bold text-gray-900 font-serif mb-8">Service Times</h2>
    <div className="grid md:grid-cols-4 gap-3">
      <div className="p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Sunday Worship</h3>
        <p className="text-gray-600">Sunday School</p>
         <p className="text-amber-600 font-medium">8:00 AM - 8:30 AM</p>

       <p className="text-gray-600 mt-5">Sunday Service</p>
        <p className="text-amber-600 font-medium">8:30 AM - 11:30 AM</p>
      </div>
      <div className="p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Tuesday Bible Study</h3>
        <p className="text-gray-600 mt-2">Word Power Impartation</p>
        <p className="text-amber-600 font-medium">6:00 PM - 7:30 PM</p>
      </div>
      <div className="p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Wednesday</h3>
        <p className="text-gray-600 mt-2">Waiting Fathers & Mothers of Nations</p>
        <p className="text-amber-600 font-medium">8:00 AM - 11:00 AM</p>
        <p className="text-gray-600 mt-5">Prayer Warriors Intercession Hour</p>
         <p className="text-amber-600 font-medium">4:00 PM</p>
         <p className="text-gray-600 mt-5">Workers Fasting & Prayer Meeting</p>
          <p className="text-amber-600 font-medium">5:00 PM - 6:00 PM</p>
      </div>
      <div className="p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Thursday</h3>
        <p className="text-gray-600 mt-5">Divine Solution Hour</p>
        <p className="text-amber-600 font-medium">8:30 AM - 10:00 AM </p>
      </div>
      <div className="p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Night Vigil</h3>
        <p className="text-gray-600 mt-5">Every Last Friday of the Month</p>
        <p className="text-amber-600 font-medium">11:00 PM - 4:00 AM </p>
      </div>
      <div className="p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Prophetic Early Morning Service (PEMS)</h3>
        <p className="text-gray-600 mt-4">First Day of Every Month</p>
        <p className="text-amber-600 font-medium">6:00 AM - 7:00 AM </p>
        {/* <p className="text-gray-600 mt-4">Evening Service(1st-3rd of the every month)</p>
        <p className="text-amber-600 font-medium">6:00 PM - 8:00 PM</p> */}
      </div>
       <div className="p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Every Month Indoor Revival</h3>
        <p className="text-gray-600 mt-4">1st, 2nd & 3rd Day Every Month</p>
        <p className="text-amber-600 font-medium">6:00 PM - 8:00 PM </p>
      </div>
    </div>
    <div className="mt-8">
      <a 
        href="https://maps.app.goo.gl/3QhVyfGu1kqPTqhP8" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-md transition-colors"
      >
        Get Directions
      </a>
    </div>
  </div>
</section>
      {/* Welcome Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">Welcome to Reconciliation Church of God</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 mx-auto text-justify">
             Welcome to the website of Reconciliation Church of God Intl. This is a Full Pentecostal Church with major assignment in the Preaching of the Word of Grace as the pathway for reconciling the lost children of the Most High God back to Him. Our major focus is in looking for those who have backslided or have not known Him at all and use the provisions of the scriptures, as contained in the Gospel of Jesus Christ, to bring about a reunion and foster a flourishing relationship with Him thereafter. 
            We believe that no matter how terribly a man has walked in the past, God has the ability to receive him back as long as the very simple condition of sincere repentance and forsaking of sin can be met. We believe that the most appropriate place to receive and be restored into one's Honour is in The Father's House.
            As you read this piece, if you are in any way out of Favour or Honour, like that prodigal son, I like you to know that God, your Father, is waiting with an outstretched arms to receive you back and restore your dignity.
            Once again, we say, WELCOME TO OUR WORLD OF GRACE
            </p>
          </motion.div>

          {/* Church Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {churchStats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <stat.icon className="text-4xl text-amber-600 mx-auto mb-4" />
                <p className="text-3xl font-bold text-gray-900">{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Service Times */}
          {/* <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-8 md:p-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-8 font-serif">Join Us For Worship</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceTimes.map((service, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <FaCalendarAlt className="text-2xl text-amber-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900">{service.day}</h4>
                  <p className="text-amber-700 font-medium">{service.time}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-md transition-colors">
                Full Service Schedule
              </button>
            </div>
          </motion.div> */}
        </div>
      </section>

      {/* Ministries Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">Our Ministries</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover opportunities to grow in faith and serve our community through our various ministries.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Children's Ministry", desc: "Nurturing young hearts in faith and love" },
              { name: "Youth Group", desc: "Engaging teens in their spiritual journey" },
              { name: "Good Women", desc: "Supporting and empowering women in faith" },
              { name: "Excellent Men", desc: "Building strong men of God" },
              // { name: "Outreach Program", desc: "Serving our local community" },
              { name: "Prayer Ministry", desc: "Growing through the power of prayer" },
            ].map((ministry, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-3 bg-amber-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <FaHandHoldingHeart className="text-amber-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{ministry.name}</h3>
                <p className="text-gray-600">{ministry.desc}</p>
                      <Link 
            to={ministry.path}
            className="mt-4 text-amber-600 font-medium hover:text-amber-700 transition-colors inline-flex items-center"
          ></Link>
                {/* <button className="mt-4 text-amber-600 font-medium hover:text-amber-700 transition-colors">
                  Learn more →
                </button> */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">Upcoming Events</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us for fellowship, worship, and community events throughout the year.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((item) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center">
                  <FaCalendarAlt className="text-white text-4xl" />
                </div>
                <div className="p-6">
                  <div className="text-sm text-amber-600 font-semibold mb-1">June 15, 2023 • 6:30 PM</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Prayer Night</h3>
                  <p className="text-gray-600 mb-4">Join us for an evening of prayer and fellowship as we lift up our community.</p>
                  <button className="text-amber-600 font-medium hover:text-amber-700 transition-colors">
                    View details →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-md transition-colors">
              View All Events
            </button>
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold font-serif mb-6">Ready to Visit Us?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              We'd love to welcome you to our church family. Join us this Sunday for worship and fellowship.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {/* <button className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-md transition-colors">
                Plan Your Visit
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 font-semibold rounded-lg transition-colors">
                Watch Online
              </button> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Page Sections (these will be displayed when navigating via navbar) */}
      <section id="about">
        <About />
      </section>
      <section id="pastors">
        <Pastors />
      </section>
      <section id="events">
        <Events />
      </section>
      <section id="live">
        <Live />
      </section>
      <section id="donation">
        <Donation />
      </section>
      <section id="joinworkforce">
        <JoinWorkForce />
      </section>
      <section id='newmember'>
        <NewMember />
      </section>
      <section id="contact">
        <Contact />
      </section>

      <BackToTopButton />
    </div>
  );
}

export default Home;