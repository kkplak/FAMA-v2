// src/components/ScrollToTop.jsx (or .tsx if using TypeScript)
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Assuming your scrollable container has an ID of 'scrollable-container'
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const topElement = document.getElementById("top-of-page");
    if (topElement) {
      topElement.scrollIntoView({ behavior: "auto" });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
