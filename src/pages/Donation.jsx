import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { 
  FaChurch, 
  FaHandHoldingHeart, 
  FaCopy, 
  FaCheck, 
  FaCreditCard,
  FaShieldAlt,
  FaReceipt,
  FaHeart
} from 'react-icons/fa';

const Donation = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('bank');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Church banking information
  const churchAccount = {
    name: 'Reconciliation Church of God',
    number: '0751609016',
    bank: 'FCMB',
    description: 'Main Church Account'
  };

  // Additional accounts for different purposes
  const givingOptions = [
    {
      type: 'Tithe',
      description: 'Give your regular tithe (10% of income)',
      account: churchAccount,
      verse: '"Bring the whole tithe into the storehouse..." - Malachi 3:10',
      color: 'bg-blue-100'
    },
    {
      type: 'Offering',
      description: 'General offerings and gifts',
      account: churchAccount,
      verse: '"Each of you should give what you have decided in your heart to give..." - 2 Corinthians 9:7',
      color: 'bg-green-100'
    },
    {
      type: 'Ofada Building Offering',
      description: 'Support our church building projects',
      account: { ...churchAccount, description: 'Building Fund Account' },
      verse: '"The people had a mind to work." - Nehemiah 4:6',
      color: 'bg-amber-100'
    },
    // {
    //   type: 'Missions',
    //   description: 'Support our local and international missions',
    //   account: { ...churchAccount, description: 'Missions Account' },
    //   verse: '"Go and make disciples of all nations..." - Matthew 28:19',
    //   color: 'bg-purple-100'
    // }
  ];

  // Sample images (replace with your actual images)
  const images = [
    "https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1584983311807-3c6081bca0d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
  ];

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Auto-play the carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="donation" className="min-h-screen pt-20 bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-amber-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold font-serif mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Support Our Ministry
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your generosity helps us spread God's word and serve our community
          </motion.p>
          <motion.div 
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <FaHandHoldingHeart className="text-4xl text-amber-400" />
          </motion.div>
        </div>
      </div>

      {/* Giving Options */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">Donation</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Choose how you'd like to support our church's mission and ministries
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 mx-auto">
            {givingOptions.map((option, index) => (
              <motion.div
                key={option.type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${option.color} p-6 rounded-xl text-center hover:shadow-lg transition-shadow`}
              >
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHeart className="text-white text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.type}</h3>
                <p className="text-gray-700 text-sm mb-3">{option.description}</p>
                <p className="text-amber-700 text-xs italic">{option.verse}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 font-serif mb-4">Give Securely</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          </motion.div>

          {/* Payment Tabs */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab('bank')}
                className={`py-3 px-6 font-medium ${
                  activeTab === 'bank'
                    ? 'text-amber-600 border-b-2 border-amber-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Bank Transfer
              </button>
              <button
                onClick={() => setActiveTab('online')}
                className={`py-3 px-6 font-medium ${
                  activeTab === 'online'
                    ? 'text-amber-600 border-b-2 border-amber-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Online Payment
              </button>
            </div>

            {activeTab === 'bank' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Bank Transfer Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                        <span className="font-medium">{churchAccount.name}</span>
                        <button
                          onClick={() => handleCopy(churchAccount.name)}
                          className="text-amber-600 hover:text-amber-700 ml-2"
                        >
                          {copied ? <FaCheck /> : <FaCopy />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                        <span className="font-mono">{churchAccount.number}</span>
                        <button
                          onClick={() => handleCopy(churchAccount.number)}
                          className="text-amber-600 hover:text-amber-700 ml-2"
                        >
                          {copied ? <FaCheck /> : <FaCopy />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                        <span className="font-medium">{churchAccount.bank}</span>
                        <button
                          onClick={() => handleCopy(churchAccount.bank)}
                          className="text-amber-600 hover:text-amber-700 ml-2"
                        >
                          {copied ? <FaCheck /> : <FaCopy />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                    <p className="text-sm text-amber-800">
                      <strong>Note:</strong> Please include your name and purpose (e.g., "Tithe", "Offering") in the transfer description.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'online' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <FaCreditCard className="text-4xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Online Payments Coming Soon</h3>
                <p className="text-gray-600">
                  We're working on integrating secure online payment options. In the meantime, please use bank transfer.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Security & Trust
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 font-serif mb-4">Your Giving is Secure</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FaShieldAlt,
                title: "Secure Processing",
                description: "All transactions are handled with the highest security standards"
              },
              {
                icon: FaReceipt,
                title: "Tax Receipts",
                description: "Receive proper documentation for tax-deductible contributions"
              },
              {
                icon: FaChurch,
                title: "Transparent Use",
                description: "Funds are used responsibly for church ministries and operations"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white rounded-xl shadow-sm"
              >
                <feature.icon className="text-3xl text-amber-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Bible Verse */}
      <div className="py-16 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <FaHandHoldingHeart className="text-4xl mx-auto mb-6" />
            <blockquote className="text-2xl font-serif italic mb-4">
              "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
            </blockquote>
            <p className="text-lg">2 Corinthians 9:7</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Donation;