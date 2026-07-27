import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  FaUsers, 
  FaHandsHelping, 
  FaChurch, 
  FaMusic, 
  FaVideo, 
  FaChild,
  FaUserFriends,
  FaCheckCircle,
  FaPaperPlane
} from 'react-icons/fa';

const JoinWorkforce = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    department: '',
    message: ''
  });

  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ministryDepartments = [
    {
      id: 'Ushers',
      name: 'Ushering Department',
      icon: FaUserFriends,
      description: 'Welcome attendees and assist with seating',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'Choir',
      name: 'Choir Department',
      icon: FaMusic,
      description: 'Lead congregation in worship through music',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'Media',
      name: 'Media & Technology',
      icon: FaVideo,
      description: 'Manage sound, lighting, and visual presentations',
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 'ChildrensMinistry',
      name: "Children's Department",
      icon: FaChild,
      description: 'Teach and care for our youngest members',
      color: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'Outreach',
      name: 'Evangelism Department',
      icon: FaChurch,
      description: 'Spread the gospel in our community',
      color: 'bg-red-100 text-red-800'
    },
    // {
    //   id: 'Hospitality',
    //   name: 'Hospitality',
    //   icon: FaHandsHelping,
    //   description: 'Serve through food and fellowship ministries',
    //   color: 'bg-teal-100 text-teal-800'
    // }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Submitting...');
    
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      // const response = await axios.post('http://localhost:5000/api/submissions/workforce', formData);
       const response = await axios.post(`${API_URL}/api/submissions/workforce`, formData);
      console.log('Workforce application submitted successfully:', response.data);
      setStatus('success');
      
      setTimeout(() => {
        setStatus('');
      }, 5000);

      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        department: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting workforce application:', error.response ? error.response.data : error.message);
      setStatus('error');
      
      setTimeout(() => {
        setStatus('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="joinworkforce" className="min-h-screen pt-20 bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-amber-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold font-serif mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Join Our Ministry Team
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover your gifts and serve in God's kingdom work
          </motion.p>
          <motion.div 
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <FaHandsHelping className="text-4xl text-amber-400" />
          </motion.div>
        </div>
      </div>

      {/* Ministry Opportunities */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">Ministry Opportunities</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Find your place to serve and make a difference in our church family
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {ministryDepartments.map((department, index) => (
              <motion.div
                key={department.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 ${department.color} rounded-full flex items-center justify-center mb-4`}>
                  <department.icon className="text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{department.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{department.description}</p>
                <button
                  onClick={() => setFormData({...formData, department: department.id})}
                  className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                >
                  Join This Ministry →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 font-serif mb-4">Join Our Team</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We're excited that you want to serve! Fill out the form below to get started.
            </p>
          </motion.div>

          <div className="bg-gray-50 rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="+234 800 000 0000"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ministry Area *</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    required
                  >
                    <option value="">Select a ministry area</option>
                    {ministryDepartments.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us about your interests, experience, or any questions..."
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

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
                    Submit Application
                  </>
                )}
              </button>

              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center"
                >
                  <FaCheckCircle className="mr-2 text-green-600" />
                  Your application has been submitted successfully! We'll be in touch soon.
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
                >
                  Failed to submit application. Please try again or contact us directly.
                </motion.div>
              )}
            </form>
          </div>
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
            <FaHandsHelping className="text-4xl mx-auto mb-6" />
            <blockquote className="text-2xl font-serif italic mb-4">
              "Each of you should use whatever gift you have received to serve others, as faithful stewards of God's grace in its various forms."
            </blockquote>
            <p className="text-lg">1 Peter 4:10</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JoinWorkforce;