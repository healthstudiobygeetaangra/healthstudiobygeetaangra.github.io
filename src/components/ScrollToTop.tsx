import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HEADER_OFFSET = 96;
const SCROLL_RETRY_DELAYS = [0, 100, 250];

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const targetId = hash.replace("#", "");
    const scrollToHashTarget = () => {
      const element = document.getElementById(targetId);
      if (!element) {
        return false;
      }

      const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({
        top: Math.max(top, 0),
        behavior: "smooth",
      });

      return true;
    };

    const timers = SCROLL_RETRY_DELAYS.map((delay) =>
      window.setTimeout(() => {
        scrollToHashTarget();
      }, delay)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
