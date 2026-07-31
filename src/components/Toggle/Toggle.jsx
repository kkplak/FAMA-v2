import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

const ToggleDescription = ({ description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const { t } = useTranslation();

  const toggle = () => {
    if (isOpen) {
      triggerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setIsOpen((current) => !current);
  };

  return (
    <div className="portfolio-toggle">
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="portfolio-more"
          >
            {description}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={triggerRef}
        type="button"
        className="toggle-button"
        onClick={toggle}
        aria-expanded={isOpen}
      >
        <span>{isOpen ? t("toggleMore") : t("toggleLess")}</span>
        <motion.span animate={{ rotate: isOpen ? 45 : 0 }}>
          <Plus aria-hidden="true" size={18} />
        </motion.span>
      </button>
    </div>
  );
};

export default ToggleDescription;
