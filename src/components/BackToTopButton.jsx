import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 250);
    };

    toggleVisibility();

    window.addEventListener("scroll", toggleVisibility, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={isVisible ? 0 : -1}
      className={`fixed bottom-6 right-5 z-[100] flex h-12 w-12 items-center justify-center rounded-full bg-[#0b1f46] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 sm:bottom-8 sm:right-8 sm:h-14 sm:w-14 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-5 opacity-0"
      }`}
    >
      <FaArrowUp
        size={20}
        aria-hidden="true"
      />
    </button>
  );
};

export default BackToTopButton;