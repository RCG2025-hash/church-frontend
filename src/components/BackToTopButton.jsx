import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    
    const toggleVisibility = () => {
        if (window.scrollY > 200) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <button 
            onClick={scrollToTop} 
            className={`fixed bottom-8 right-6 z-50 p-4 bg-orange-500 hover:bg-orange-600 rounded-full text-black shadow-lg transition-all duration-300 ease-in-out cursor-pointer transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
            }`}
            title="Back to Top"
            aria-label="Back to Top"
        >
            <div className="relative flex items-center justify-center">
                <FontAwesomeIcon icon={faArrowUp} className="text-lg" />
                {/* Adding a subtle cross above the arrow for church theme */}
                {/* <div className="absolute -top-3 text-xs font-semibold">+</div> */}
            </div>
            
            {/* Optional: Add a subtle glow effect */}
            <div className="absolute inset-0 rounded-full bg-amber-600 opacity-0 hover:opacity-40 transition-opacity duration-300"></div>
        </button>
    );
};

export default BackToTopButton;