import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const INTRO_DURATION = 1900;

const CinematicIntro = () => {
  const [isVisible, setIsVisible] = useState(true);
  const originalOverflow = useRef("");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    originalOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      document.body.style.overflow = originalOverflow.current;
      setIsVisible(false);
    }, reduceMotion ? 850 : INTRO_DURATION);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = originalOverflow.current;
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="cinematic-intro"
          initial={{ opacity: 1 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { clipPath: "inset(0 0 100% 0)" }
          }
          transition={{
            duration: reduceMotion ? 0.25 : 0.85,
            ease: [0.76, 0, 0.24, 1],
          }}
          aria-label="FAMA Film"
          role="status"
        >
          <div className="cinematic-intro-inner">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.12 }}
            >
              A FAMA FILM PRODUCTION
            </motion.p>
            <div className="cinematic-wordmark-mask">
              <motion.span
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.16,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                FAMA
              </motion.span>
            </div>
            <motion.div
              className="cinematic-progress"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.22, ease: "easeInOut" }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.62 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              STORIES IN MOTION · GDAŃSK
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicIntro;
