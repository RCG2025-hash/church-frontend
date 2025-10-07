import { FaChurch, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPrayingHands, FaTiktok } from "react-icons/fa";
import church_logo from "../assets/church_logo.png";
function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Church Information */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg mr-3">
                <img src={church_logo} className="text-white text-xl w-15" />
              </div>
              <h3 className="text-2xl font-serif font-bold">Reconciliation Church of God</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              A community of believers dedicated to serving Christ, loving people, and transforming lives through the power of the Gospel.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1CSuncwTv8/?mibextid=wwXIfr" className="p-2 bg-gray-800 hover:bg-amber-600 rounded-full transition-colors" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="text-white" />
              </a>
              {/* <a href="#" className="p-2 bg-gray-800 hover:bg-amber-600 rounded-full transition-colors">
                <FaTwitter className="text-white" />
              </a> */}
              <a href="#" className="p-2 bg-gray-800 hover:bg-amber-600 rounded-full transition-colors" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-white" />
              </a>
              <a href="https://www.youtube.com/channel/UCxWcOs-pauiAXgDE_59uPww" className="p-2 bg-gray-800 hover:bg-amber-600 rounded-full transition-colors" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="text-white" />
              </a>
               <a href="http://www.tiktok.com/@rcghisgrace" className="p-2 bg-gray-800 hover:bg-amber-600 rounded-full transition-colors" target="_blank" rel="noopener noreferrer">
                <FaTiktok className="text-white" />
              </a>
            </div>
          </div>

          {/* Service Times */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <FaPrayingHands className="mr-2 text-amber-400" />
              Service Times
            </h4>
            <ul className="space-y-2">
              <li className="flex justify-between text-gray-300">
                <span>Sunday Worship:</span>
                <span>8:30 AM - 11:30 AM</span>
              </li>
              <li className="flex justify-between text-gray-300">
                <span>Bible Study:</span>
                <span>Tue, 6:00 PM - 7:30 PM</span>
              </li>
              <li className="flex justify-between text-gray-300">
                <span>Divine Solution Hour</span>
                <span>Thur, 8:30 AM - 10:00 AM</span>
              </li>
              <li className="flex justify-between text-gray-300">
                <span>Night Vigil</span>
                <span>Every Last Fri of the month, 11:00 PM - 4:00 AM</span>
              </li>
              {/* <li className="flex justify-between text-gray-300">
                <span>Youth Service:</span>
                <span>Sat, 4:00 PM</span>
              </li> */}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-amber-400" />
                <span className="text-gray-300">Plot 1, Denro Ishasi road. Akute via Ojodu Berger</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-amber-400" />
                <span className="text-gray-300">+234-8033074562</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-amber-400" />
                <span className="text-gray-300">help@HisGracercg.org</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Simplified Bottom Section */}
      <div className="border-t border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Reconciliation Church of God. All Rights Reserved.
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                Designed and Developed by <span className="text-amber-400">RCG IT/MEDIA DEPARTMENT</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;