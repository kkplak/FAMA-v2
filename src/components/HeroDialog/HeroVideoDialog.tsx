import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "../../lib/utils";

type AnimationStyle = "from-center" | "fade";

interface HeroVideoProps {
  animationStyle?: AnimationStyle;
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
  title?: string;
  credits?: string;
  index?: string;
}

const animationVariants = {
  "from-center": {
    initial: { scale: 0.94, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.97, opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
};

export default function HeroVideoDialog({
  animationStyle = "fade",
  videoSrc,
  thumbnailSrc,
  title,
  thumbnailAlt = "Video thumbnail",
  className,
  credits,
  index,
}: HeroVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { t } = useTranslation();
  const titleId = useId();

  useEffect(() => {
    if (!isVideoOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsVideoOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isVideoOpen]);

  return (
    <article className={cn("project-card", className)}>
      <button
        type="button"
        className="project-trigger"
        onClick={() => setIsVideoOpen(true)}
        aria-labelledby={titleId}
      >
        <span className="project-image-wrap">
          <img
            src={thumbnailSrc}
            alt={thumbnailAlt}
            width={998}
            height={713}
            loading="lazy"
            decoding="async"
            className="project-image"
          />
          <span className="project-overlay">
            <span className="project-play">
              <Play aria-hidden="true" size={18} fill="currentColor" />
            </span>
            <span>{t("watchFilm")}</span>
          </span>
        </span>
      </button>
      <div className="project-meta">
        <h3 id={titleId}>{title}</h3>
        <span>{index}</span>
      </div>

      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsVideoOpen(false)}
            className="video-modal"
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <motion.div
              {...animationVariants[animationStyle]}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="video-modal-inner"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="video-modal-header">
                <div>
                  <span>{index}</span>
                  <p>{title}</p>
                </div>
                <button
                  type="button"
                  className="video-close"
                  onClick={() => setIsVideoOpen(false)}
                  aria-label={t("closeVideo")}
                >
                  <X aria-hidden="true" size={22} />
                </button>
              </div>
              <div className="video-frame">
                <iframe
                  src={videoSrc}
                  title={title}
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                />
              </div>
              {credits && <p className="video-credits">{credits}</p>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
