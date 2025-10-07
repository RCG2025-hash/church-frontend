import React, { useState, useEffect } from 'react';
import { FaChurch } from 'react-icons/fa';
import church_logo from '../assets/church_logo.png';
const Preloader = ({ isLoading = true }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simulate loading progress (replace with your actual loading logic)
  useEffect(() => {
    if (!isLoading) {
      handleLoadingComplete();
      return;
    }

    // Increment progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + (Math.random() * 15 + 5); // Random increment between 5-20
      });
    }, 600); // Slower progress updates

    // Complete loading after 4-6 seconds (more natural timing)
    const completionTimer = setTimeout(() => {
      setProgress(100);
      clearInterval(progressInterval);
      
      // Wait a moment at 100% then start fade out
      setTimeout(() => {
        setIsFading(true);
        setTimeout(() => setIsVisible(false), 1200);
      }, 800);
    }, 4500 + Math.random() * 1500); // 4.5-6 seconds total

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completionTimer);
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setProgress(100);
    setTimeout(() => {
      setIsFading(true);
      setTimeout(() => setIsVisible(false), 1200);
    }, 800);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900 transition-opacity duration-1200 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center transform transition-transform duration-1000 ${isFading ? 'scale-95' : 'scale-100'}">
        {/* Animated cross icon with slower animation */}
        <div className="relative mb-8 flex justify-center">
          <div className="absolute -inset-6 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
          <div className="relative p-5 rounded-2xl shadow-lg">
            <img src={church_logo} className="text-5xl text-white w-20" style={{ 
              animation: 'gentleBounce 3s ease-in-out infinite',
              animationDelay: '0.5s'
            }} />
          </div>
        </div>

        {/* Loading text */}
        <p className="text-2xl text-amber-100 font-light mb-3">Reconciliation Church of God</p>
        <p className="text-gray-400 mb-8 text-lg">Preparing your spiritual journey</p>
        
        {/* Progress bar with percentage */}
        <div className="w-72 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto mb-2">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mb-8">{Math.round(progress)}%</p>

        {/* Bible verse with fade-in */}
        <div className={`transition-opacity duration-2000 ${progress > 50 ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-sm text-gray-500 italic max-w-md mx-auto leading-relaxed">
            "But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; 
            they shall run and not be weary; they shall walk and not faint." - Isaiah 40:31
          </p>
        </div>

        {/* Optional decorative elements */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="w-2 h-2 bg-amber-400/30 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.3}s`, animationDuration: '1.5s' }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom animation keyframes */}
      <style>
        {`
          @keyframes gentleBounce {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-8px) rotate(2deg); }
            50% { transform: translateY(0) rotate(0deg); }
            75% { transform: translateY(-4px) rotate(-2deg); }
          }
          @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(217, 119, 6, 0.3); }
            50% { box-shadow: 0 0 30px rgba(217, 119, 6, 0.6); }
          }
        `}
      </style>
    </div>
  );
};

export default Preloader;