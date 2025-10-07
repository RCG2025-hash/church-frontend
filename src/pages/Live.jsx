import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { 
  FaYoutube, 
  FaFacebook, 
  FaInstagram, 
  FaVideo, 
  FaChurch,
  FaClock,
  FaCalendarAlt,
  FaPray,
  FaUsers
} from 'react-icons/fa';

const Live = () => {
  const [isLive, setIsLive] = useState(false);
  const [nextService, setNextService] = useState(null);

  // Simulate live status - replace with actual logic
  useEffect(() => {
    // Check if current time is during service hours
    const checkLiveStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      // Sunday services at 8:30 AM and 11:30 AM
      if (day === 0 && (hours >= 8 && hours < 12) || (hours === 8 && minutes >= 30)) {
        setIsLive(true);
      } else {
        setIsLive(false);
      }
    };

    checkLiveStatus();
    const interval = setInterval(checkLiveStatus, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  // Calculate next service time
  // useEffect(() => {
  //   const now = new Date();
  //   const day = now.getDay();
  //   const hours = now.getHours();
    
  //   let nextServiceDate = new Date();
    
  //   // If it's Sunday afternoon or any other day
  //   if (day === 0 && hours >= 12) {
  //     nextServiceDate.setDate(now.getDate() + (7 - day));
  //   } else if (day !== 0) {
  //     nextServiceDate.setDate(now.getDate() + (7 - day) % 7);
  //   }
    
  //   // Set time to 8:00 AM
  //   nextServiceDate.setHours(8, 0, 0, 0);
    
  //   setNextService(nextServiceDate);
  // }, []);

  const streamingPlatforms = [
    {
      name: "YouTube",
      icon: FaYoutube,
      url: "https://www.youtube.com/channel/UCxWcOs-pauiAXgDE_59uPww",
      color: "bg-red-600 hover:bg-red-700",
      description: "Watch our HD stream on YouTube"
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      url: "https://www.facebook.com/share/1CSuncwTv8/?mibextid=wwXIfr",
      color: "bg-blue-600 hover:bg-blue-700",
      description: "Join our Facebook Live stream"
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      url: "",
      color: "bg-pink-600 hover:bg-pink-700",
      description: "Follow us on Instagram Live"
    },
    {
      name: "Zoom",
      icon: FaVideo,
      url: "",
      color: "bg-blue-500 hover:bg-blue-600",
      description: "Join our interactive Zoom service"
    }
  ];

  const serviceTimes = [
    { day: "Sunday", times: "8:30 AM & 11:30 AM", type: "Worship Service" },
    { day: "Tuesday", times: "6:30 PM", type: "Bible Study" },
    { day: "Friday", times: "7:00 PM", type: "Prayer Meeting" },
    { day: "Saturday", times: "4:00 PM", type: "Youth Service" }
  ];

  return (
    <section id="live" className="min-h-screen pt-20 bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-amber-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold font-serif mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Join Us Live
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Worship with us from anywhere in the world
          </motion.p>
          <motion.div 
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <FaChurch className="text-4xl text-amber-400" />
          </motion.div>
        </div>
      </div>

      {/* Live Status Banner */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`rounded-xl p-6 text-center ${
              isLive 
                ? "bg-red-100 border border-red-300 text-red-800" 
                : "bg-blue-100 border border-blue-300 text-blue-800"
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              <div className={`w-3 h-3 rounded-full mr-3 ${isLive ? "bg-red-600 animate-pulse" : "bg-blue-600"}`}></div>
              <h2 className="text-2xl font-bold">
                {isLive ? "LIVE NOW" : "OFFLINE"}
              </h2>
            </div>
            <p className="text-lg">
              {isLive 
                ? "We're live! Join our current service."
                : nextService && `Next service: Sunday at 8:30 AM`
              }
            </p>
          </motion.div>
        </div>
      </div>

      {/* Streaming Platforms */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">Watch Live On</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Please join the live service using the facebook link. we are working on getting other platforms up and running.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {streamingPlatforms.map((platform, index) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${platform.color} text-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
              >
                <platform.icon className="text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{platform.name}</h3>
                <p className="text-sm opacity-90">{platform.description}</p>
                <div className="mt-4">
                  <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                    {isLive ? "Join Now" : "View Channel"}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Service Schedule */}
      {/* <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">Service Schedule</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Join us for worship throughout the week
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceTimes.map((service, index) => (
              <motion.div
                key={service.day}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl text-center"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {service.type.includes("Prayer") && <FaPray className="text-amber-600 text-xl" />}
                  {service.type.includes("Bible") && <FaChurch className="text-amber-600 text-xl" />}
                  {service.type.includes("Youth") && <FaUsers className="text-amber-600 text-xl" />}
                  {service.type.includes("Worship") && <FaCalendarAlt className="text-amber-600 text-xl" />}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.day}</h3>
                <p className="text-amber-600 font-medium mb-2">{service.times}</p>
                <p className="text-gray-600 text-sm">{service.type}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Connection Tips */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 font-serif mb-6">Need Help Connecting?</h2>
            <p className="text-xl text-gray-700 mb-8">
              If you're having trouble joining our live stream, please contact our tech support team at{" "}
              <a href="mailto:help@hisgracercg.org" className="text-amber-600 hover:text-amber-700 font-medium">
                help@hisgracercg.org
              </a>
            </p>
            {/* <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Tips:</h3>
              <ul className="text-gray-700 space-y-2 text-left max-w-md mx-auto">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                  Ensure you have a stable internet connection
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                  Use headphones for better audio quality
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                  Join 5-10 minutes before service time
                </li>
              </ul>
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Live;