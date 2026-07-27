import { motion } from "framer-motion";
import { useState } from "react";
import { FaChurch, FaPray, FaUsers, FaHandsHelping } from "react-icons/fa";
import GenOver from '../assets/GenOver.jpg';
import MotherInIsrael from '../assets/Pas_Mrs_Oke.jpg';
import AssemPastor from '../assets/PasJ.jpg';
import PastorSegun from '../assets/Pas_Adedeji.jpg';
import PastorElizabeth from '../assets/Pst_Mrs_Adedeji.jpg';
import PastorGbenga from '../assets/Pas_Ogunleke.jpg';
import YouthPastor from '../assets/Mrs_Jegede.jpg';

const pastors = [
  { 
    id: 1, 
    name: "Rev. Chris Tunde Oke", 
    role: "General Overseer", 
    image: GenOver,
    bio: "Leading our church with vision and dedication for over 20 years."
  },
  { 
    id: 2, 
    name: "Pastor (Mrs) Folashade Oke", 
    role: "Mother-in-Israel", 
    image: MotherInIsrael,
    bio: "Providing spiritual guidance and nurturing our church family."
  },
  { 
    id: 3, 
    name: "Pastor Joshua Jegede", 
    role: "Assembly Pastor", 
    image: AssemPastor,
    bio: "Overseeing our assembly with dedication and spiritual wisdom."
  },
  { 
    id: 4, 
    name: "Pastor Segun Adedeji", 
    role: "Pastor", 
    image: PastorSegun,
    bio: "Serving the congregation with compassion and biblical teaching."
  },
  { 
    id: 5, 
    name: "Pastor (Mrs) Elizabeth Adedeji", 
    role: "Pastor", 
    image: PastorElizabeth,
    bio: "Ministering to women and families with grace and wisdom."
  },
  {
    id: 6,
    name: "Pastor Gbenga Ogunleke",
    role: "Ofada Branch Pastor",
    image: PastorGbenga,
    bio: "Leading our Ofada congregation with faith and commitment."
  },
  { 
    id: 7, 
    name: "Pastor (Mrs) Funmilayo Jegede", 
    role: "Youth Pastor", 
    image: YouthPastor,
    bio: "Empowering the next generation to live out their faith boldly."
  },
];

const Pastors = () => {
  const [selectedPastor, setSelectedPastor] = useState(null);

  return (
    <section id="pastors" className="min-h-screen pt-20 bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-amber-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold font-serif mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Church Leadership
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Meet the dedicated servants guiding our church family
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

      {/* Pastors Introduction */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 font-serif mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Our Pastoral Team
            </motion.h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <motion.p 
              className="text-xl text-gray-700 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our pastors are dedicated to serving the congregation with love, wisdom, and biblical teaching.
            </motion.p>
          </div>

          {/* Leadership Values */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              { icon: FaPray, title: "Spiritual Guidance", desc: "Providing biblical direction for life's journey" },
              { icon: FaUsers, title: "Pastoral Care", desc: "Supporting our congregation through all seasons of life" },
              { icon: FaHandsHelping, title: "Servant Leadership", desc: "Leading by example with humility and compassion" },
            ].map((value, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                <value.icon className="text-3xl text-amber-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Pastors Grid */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {pastors.map((pastor) => (
              <motion.div
                key={pastor.id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" },
                  },
                }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={pastor.image} 
                    alt={pastor.name} 
                    className="w-full h-90 object-cover object-center" 
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{pastor.name}</h3>
                  <p className="text-amber-600 font-medium mb-3">{pastor.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{pastor.bio}</p>
                  <button 
                    onClick={() => setSelectedPastor(pastor)}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm transition-colors"
                  >
                    Full Profile
                  </button>
                </div>
              </motion.div>
            ))}
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
            <FaPray className="text-4xl mx-auto mb-6" />
            <blockquote className="text-2xl font-serif italic mb-4">
              "And he gave the apostles, the prophets, the evangelists, the shepherds and teachers, to equip the saints for the work of ministry, for building up the body of Christ."
            </blockquote>
            <p className="text-lg">Ephesians 4:11-12</p>
          </motion.div>
        </div>
      </div>

      {/* Pastor Modal */}
      {selectedPastor && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedPastor.image} 
                alt={selectedPastor.name} 
                className="w-full h-[90vh] object-cover object-center rounded-t-xl" 
              />
              <button 
                onClick={() => setSelectedPastor(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedPastor.name}</h3>
              <p className="text-amber-600 font-medium mb-4">{selectedPastor.role}</p>
              <p className="text-gray-700 mb-6">{selectedPastor.bio}</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Ministry Focus</h4>
                <ul className="text-gray-700 list-disc list-inside space-y-1">
                  <li>Biblical teaching and preaching</li>
                  <li>Pastoral care and counseling</li>
                  <li>Leadership development</li>
                  <li>Community outreach</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Pastors;