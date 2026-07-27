import React from 'react';
import { motion } from "framer-motion";
import Masonry from 'react-masonry-css';
import { FaChurch, FaHistory, FaHeart, FaUsers, FaCross, FaPray } from 'react-icons/fa';
import img1 from '../assets/About_us.jpg';
import img2 from '../assets/About_us2.jpg';
import img3 from '../assets/About_us3.jpg';
import img4 from '../assets/About_us4.jpg';
import img5 from '../assets/About_us5.jpg';
import img6 from '../assets/About_us6.jpg';
import img7 from '../assets/About_us7.jpg';
import img8 from '../assets/About_us8.jpg';
// Sample images (replace with your actual images)
const images = [img1, img2, img3, img4, img5, img6, img7, img8];

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1
};

const About = () => {
  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 to-amber-900 text-white">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold font-serif mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            History
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            How God has been working through our church family for over two decades
          </motion.p>
          <div className="flex justify-center">
            <FaChurch className="text-4xl text-amber-400" />
          </div>
        </div>
      </section>

      {/* Church History */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-amber-100 rounded-full mr-4">
                  <FaHistory className="text-amber-600 text-2xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 font-serif">Our History</h2>
              </div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Established in August 2003 under the name <span className="font-semibold">His Grace Bible Church</span>, 
                our ministry later secured Government Registration as <span className="font-semibold">RECONCILIATION CHURCH OF GOD INTL</span> 
                (also known as His Grace Chapel).
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                For over 20 years, RCG has been a place of worship and transformation, growing from a small congregation 
                to a vibrant community that has impacted countless lives through faith, love, and service.
              </p>
              <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
                <p className="text-amber-800 italic">
                  "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, 
                  to give you a future and a hope." - Jeremiah 29:11
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg p-6 text-white text-center">
                <p className="text-4xl font-bold">20+</p>
                <p className="text-sm">Years of Ministry</p>
              </div>
              <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg p-6 text-white text-center">
                <p className="text-4xl font-bold">500+</p>
                <p className="text-sm">Lives Transformed</p>
              </div>
              <div className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg p-6 text-white text-center">
                <p className="text-4xl font-bold">15+</p>
                <p className="text-sm">Ministries</p>
              </div>
              <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg p-6 text-white text-center">
                <p className="text-4xl font-bold">1</p>
                <p className="text-sm">Mission</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">Our Vision & Mission</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Guided by faith, driven by purpose
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-amber-100 rounded-full mr-4">
                  <FaCross className="text-amber-600 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
               The vision of this church is to keep seeking the lost and raising them as saints for the kingdom of God. This essentially means working to keep depopulating the kingdom of hell while increasing the population of the Kingdom of God via the preaching of the Gospel of Life as perpetrated and delivered to us by The Lord Jesus Christ Himself.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-amber-100 rounded-full mr-4">
                  <FaHeart className="text-amber-600 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To actualize our vision of populating the kingdom of God and depopulating hell, we have identified and pursuing the following missions:
              </p>
              <ol className="list-disc list-inside mt-1 text-lg text-gray-700 leading-relaxed text-justify">
                <li>
                  Regular Outreaches via Quarterly Open Air Crusades
                </li>
                <li>
                  Weekly Street-Wise Evangelism Rally with TRACTS sharing.
                </li>
                <li>
                  Regular Ministers Conference for raising and equipping ministers of the Gospel, especially for our ministry.
                </li>
                <li>
                  Use of Regular Welfare Package distribution as means of showing God's mercy and attracting souls to the church for eventual conversion.
                </li>
              </ol>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: FaPray, title: "Faith", desc: "Trusting in God's plan and living according to His word" },
              { icon: FaHeart, title: "Love", desc: "Showing Christ's love through our actions and relationships" },
              { icon: FaUsers, title: "Community", desc: "Building meaningful connections and supporting one another" },
            ].map((value, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-50 rounded-lg"
              >
                <div className="p-3 bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-amber-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">Our Church Family</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Moments of worship, fellowship and service
            </p>
          </motion.div>

          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto -ml-4"
            columnClassName="pl-4 bg-clip-padding"
          >
            {images.map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="mb-4"
              >
                <img 
                  src={img} 
                  alt={`Church activity ${i+1}`} 
                  className="rounded-lg shadow-md w-full h-auto object-cover transition-transform duration-300 hover:scale-105" 
                />
              </motion.div>
            ))}
          </Masonry>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold font-serif mb-6">Join Our Church Family</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Experience God's love and grow in faith with us. We welcome you to be part of our community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {/* <button className="px-6 py-3 bg-white text-amber-700 hover:bg-gray-100 font-semibold rounded-lg shadow-md transition-colors">
                Plan Your Visit
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-amber-700 font-semibold rounded-lg transition-colors">
                Learn More
              </button> */}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;