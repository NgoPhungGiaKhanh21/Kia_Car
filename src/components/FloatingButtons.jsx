import { useState, useEffect } from "react";
import "./FloatingButtons.css";

const PHONE_NUMBER = "0346270010";
const ZALO_NUMBER = "0346270010";

function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="floating-buttons-wrapper">
      {/* Nút Phone */}
      <a
        href={`tel:${PHONE_NUMBER}`}
        className="floating-btn floating-btn--phone"
        title="Gọi điện tư vấn"
        aria-label="Gọi điện tư vấn"
      >
        <span className="floating-btn__ripple" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24"
          height="24"
        >
          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
        </svg>
      </a>

      {/* Nút Zalo */}
      <a
        href={`https://zalo.me/${ZALO_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn floating-btn--zalo"
        title="Chat Zalo"
        aria-label="Chat Zalo"
      >
        <span className="floating-btn__ripple" />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
          alt="Zalo"
          width="28"
          height="28"
          draggable="false"
        />
      </a>

      {/* Nút Scroll to Top */}
      <button
        className={`floating-btn floating-btn--scroll-top ${showScrollTop ? "floating-btn--visible" : ""}`}
        onClick={scrollToTop}
        title="Lên đầu trang"
        aria-label="Lên đầu trang"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="22"
          height="22"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </div>
  );
}

export default FloatingButtons;
