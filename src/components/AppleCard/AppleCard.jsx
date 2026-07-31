import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";

export const Carousel = ({ items }) => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="services-grid section-shell">
      {items.map((item, index) => (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.6,
            delay: index * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          key={`service-${index}`}
          className="service-grid-item"
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
};

export const Card = ({ card, index }) => (
  <article className="service-card">
    <div className="service-card-image-wrap">
      <BlurImage
        src={card.src}
        alt={card.title}
        className="service-card-image"
      />
      <span className="service-card-index">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
    <div className="service-card-copy">
      <span>{card.category}</span>
      <h3>{card.title}</h3>
    </div>
  </article>
);

export const BlurImage = ({ src, className, alt, ...rest }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <img
      className={cn(isLoading ? "is-loading" : "is-loaded", className)}
      onLoad={() => setLoading(false)}
      src={src}
      alt={alt || ""}
      loading="lazy"
      decoding="async"
      {...rest}
    />
  );
};
