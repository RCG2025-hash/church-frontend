import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  FaUser, 
  FaEnvelope, 
  FaCommentDots, 
  FaCheckCircle, 
  FaPhone, 
  FaMapMarkerAlt,
  FaClock,
  FaChurch,
  FaPaperPlane
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    message: '' 
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Submitting...');
    
    try {
      const response = await axios.post('http://localhost:5000/api/submissions/contact', formData);
      console.log('Success:', response.data);
      setStatus('success');
      
      // Clear status after 5 seconds
      setTimeout(() => {
        setStatus('');
      }, 5000);
      
      setFormData({ name: '', email: '', message: '' }); // Clear form
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setStatus('error');
      
      // Clear status after 5 seconds
      setTimeout(() => {
        setStatus('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen pt-20 bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-amber-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold font-serif mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We'd love to hear from you and welcome you to our church family
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

      {/* Contact Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 font-serif mb-6">Send us a Message</h2>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="relative">
                    <FaUser className="absolute top-4 left-4 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <FaEnvelope className="absolute top-4 left-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                  </div>

                  <div className="relative">
                    <FaCommentDots className="absolute top-4 left-4 text-gray-400" />
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      required
                    ></textarea>
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
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        Send Message
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
                      Message sent successfully! We'll get back to you soon.
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
                    >
                      Failed to send message. Please try again or contact us directly.
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>

            {/* Contact Information & Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Contact Info */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 font-serif mb-6">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-amber-600 text-xl mt-1 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Address</h3>
                      <p className="text-gray-700">Plot 1, Denro Ishasi road. Akute via Ojodu Berger</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaPhone className="text-amber-600 text-xl mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <p className="text-gray-700">+234-8033074562</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaEnvelope className="text-amber-600 text-xl mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-700">help@HisGracercg.org</p>
                    </div>
                  </div>
                  
                  {/* <div className="flex items-start">
                    <FaClock className="text-amber-600 text-xl mt-1 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Office Hours</h3>
                      <p className="text-gray-700">Monday - Friday: 9AM - 5PM</p>
                      <p className="text-gray-700">Saturday: 10AM - 2PM</p>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <h2 className="text-xl font-bold text-gray-900 font-serif p-6 pb-0">Our Location</h2>
                <div className="h-80 w-full">
                  <iframe
                    title="Church Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.8245828764993!2d3.373244973709138!3d6.668647193326365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b946163ba470d%3A0x2f93fd031d11acde!2sReconciliation%20Church%20of%20God%2C%20HisGrace%20Chapel!5e0!3m2!1sen!2sng!4v1744732722458!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;