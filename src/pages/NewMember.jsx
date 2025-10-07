import React, { useState } from "react";
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  FaChurch, 
  FaUsers, 
  FaBookOpen, 
  FaHandsHelping, 
  FaPray,
  FaHeart,
  FaCheckCircle,
  FaPaperPlane,
  FaUserFriends,
  FaGraduationCap
} from "react-icons/fa";

const NewMember = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    gender: "",
    howDidYouHear: "",
    spiritualJourneyStage: '',
    prayerRequest: "",
  });

  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Submitting...');
    
    try {
      const response = await axios.post('http://localhost:5000/api/submissions/new-member', formData);
      console.log('New member information submitted successfully:', response.data);
      setStatus('success');
      
      setTimeout(() => {
        setStatus('');
      }, 5000);
      
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        gender: "",
        howDidYouHear: "",
        spiritualJourneyStage: '',
        prayerRequest: "",
      });
    } catch (error) {
      console.error('Error submitting new member information:', error.response ? error.response.data : error.message);
      setStatus('error');
      
      setTimeout(() => {
        setStatus('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const membershipBenefits = [
    {
      icon: FaUserFriends,
      title: "Pastoral Care",
      description: "Access to counseling, prayer, and spiritual guidance from our pastors"
    },
    {
      icon: FaHandsHelping,
      title: "Ministry Opportunities",
      description: "Serve according to your gifts and passions in various ministries"
    },
    {
      icon: FaBookOpen,
      title: "Discipleship Classes",
      description: "Grow in your faith through our structured discipleship programs"
    },
    {
      icon: FaHeart,
      title: "Church Family",
      description: "Join a supportive community that cares for one another"
    }
  ];

  const spiritualJourneyOptions = [
    { value: "Exploring Faith", label: "Exploring Faith" },
    { value: "New Believer", label: "New Believer" },
    { value: "Growing Christian", label: "Growing Christian" },
    { value: "Mature Christian", label: "Mature Christian" },
    { value: "Prefer Not To Say", label: "Prefer Not To Say" }
  ];

  const hearAboutUsOptions = [
    { value: "Social Media", label: "Social Media" },
    { value: "Church Member", label: "Church Member" },
    { value: "Church Website", label: "Church Website" },
    { value: "Church Event", label: "Church Event" },
    { value: "Flyers and Posters", label: "Flyers and Posters" },
    { value: "Other", label: "Other" }
  ];

  return (
    <section id="newmember" className="min-h-screen pt-20 bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-amber-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold font-serif mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Join Our Church Family
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Become part of our community and grow together in faith
          </motion.p>
          <motion.div 
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <FaUsers className="text-4xl text-amber-400" />
          </motion.div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">Why Become a Member?</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Membership connects you deeper to our church family and God's purpose for your life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {membershipBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="text-amber-600 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 font-serif mb-4">New Member Registration</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We're excited to welcome you into our church family
            </p>
          </motion.div>

          <div className="bg-gray-50 rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    required
                    placeholder="+234 800 000 0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  rows="3"
                  placeholder="Your complete address"
                  required
                />
              </div>

              {/* Church Connection */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How did you hear about us? *
                  </label>
                  <select
                    name="howDidYouHear"
                    value={formData.howDidYouHear}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    required
                  >
                    <option value="">Select an option</option>
                    {hearAboutUsOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stage in Spiritual Journey
                  </label>
                  <select
                    name="spiritualJourneyStage"
                    value={formData.spiritualJourneyStage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="">Select an option</option>
                    {spiritualJourneyOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Prayer Request */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prayer Request
                </label>
                <textarea
                  name="prayerRequest"
                  value={formData.prayerRequest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  rows="4"
                  placeholder="How can we pray for you?"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" />
                    Submit Registration
                  </>
                )}
              </button>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center"
                >
                  <FaCheckCircle className="mr-2 text-green-600" />
                  Your information has been submitted successfully! We'll be in touch soon.
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
                >
                  Failed to submit information. Please try again or contact us directly.
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 font-serif mb-6">What Happens Next?</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <ul className="text-left space-y-4 text-gray-700 max-w-2xl mx-auto">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-amber-600 text-sm font-bold">1</span>
                  </div>
                  <span>We'll contact you within 48 hours to welcome you</span>
                </li>
                {/* <li className="flex items-start">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-amber-600 text-sm font-bold">2</span>
                  </div>
                  <span>Invite you to our next New Members Orientation</span>
                </li> */}
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-amber-600 text-sm font-bold">2</span>
                  </div>
                  <span>Help you get connected with a small group or ministry</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bible Verse */}
      <div className="py-16 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <FaChurch className="text-4xl mx-auto mb-6" />
            <blockquote className="text-2xl font-serif italic mb-4">
              "So in Christ we, though many, form one body, and each member belongs to all the others."
            </blockquote>
            <p className="text-lg">Romans 12:5</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewMember;