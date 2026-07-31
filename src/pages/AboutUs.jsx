import React from "react";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

const AboutUs = () => {
  const { t } = useTranslation();
  const { lang = "pl" } = useParams();
  const gallery = Array.from({ length: 6 }, (_, index) => index + 1);
  const reduceMotion = useReducedMotion();
  const reveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 36 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.16 },
          transition: {
            duration: 0.8,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        };

  return (
    <main id="top-of-page" className="about-page">
      <Helmet>
        <title>{t("seoAboutTitle")}</title>
        <meta name="description" content={t("seoAboutDescription")} />
        <link rel="canonical" href={`https://famafilm.pl/${lang}/aboutus`} />
      </Helmet>

      <header className="about-hero site-section">
        <div className="section-shell">
          <div className="about-hero-meta">
            <p className="eyebrow">{t("aboutEyebrow")}</p>
            <span>03</span>
          </div>
          <motion.h1 {...reveal()}>{t("aboutTitle")}</motion.h1>
          <motion.div className="about-intro-grid" {...reveal(0.08)}>
            <p className="about-lead">{t("aboutLead")}</p>
            <div>
              <p>{t("aboutBody")}</p>
              <a className="text-link" href="mailto:fama@famafilm.pl">
                {t("aboutContactCta")}
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </header>

      <section className="site-section team-section">
        <div className="section-shell">
          <motion.div className="section-heading" {...reveal()}>
            <div>
              <p className="eyebrow">{t("teamEyebrow")}</p>
              <h2>{t("teamTitle")}</h2>
            </div>
            <p className="section-note">{t("teamNote")}</p>
          </motion.div>

          <div className="team-grid">
            <motion.figure className="team-portrait" {...reveal()}>
              <div className="team-image-wrap">
                <img
                  src="/media/krzys2.jpg"
                  alt="Krzysztof Sosnowski"
                  width="1407"
                  height="2110"
                />
              </div>
              <figcaption>
                <div>
                  <span>01</span>
                  <h3>Krzysztof Sosnowski</h3>
                </div>
                <p>{t("krzysztofRole")}</p>
              </figcaption>
            </motion.figure>

            <motion.figure
              className="team-portrait team-portrait-offset"
              {...reveal(0.1)}
            >
              <div className="team-image-wrap">
                <img
                  src="/media/magda.jpeg"
                  alt="Magdalena Dąbrowska"
                  width="1273"
                  height="1601"
                  loading="lazy"
                />
              </div>
              <figcaption>
                <div>
                  <span>02</span>
                  <h3>Magdalena Dąbrowska</h3>
                </div>
                <p>{t("magdalenaRole")}</p>
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </section>

      <section className="about-statement">
        <div className="section-shell">
          <p className="eyebrow">{t("ourApproach")}</p>
          <motion.blockquote {...reveal()}>
            {t("aboutStatement")}
          </motion.blockquote>
          <p className="statement-signature">FAMA FILM / GDAŃSK</p>
        </div>
      </section>

      <section className="site-section bts-section">
        <div className="section-shell">
          <motion.div className="section-heading" {...reveal()}>
            <div>
              <p className="eyebrow">{t("btsEyebrow")}</p>
              <h2>{t("btsTitle")}</h2>
            </div>
            <p className="section-note">{t("btsNote")}</p>
          </motion.div>
          <div className="bts-gallery">
            {gallery.map((item, index) => (
              <motion.figure
                key={item}
                className={`bts-item bts-item-${item}`}
                {...reveal((index % 3) * 0.06)}
              >
                <img
                  src={`/media/bts${item}.jpeg`}
                  alt={`${t("btsImageAlt")} ${item}`}
                  loading="lazy"
                />
                <figcaption>
                  <span>{String(item).padStart(2, "0")}</span>
                  <span>FAMA / BTS</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
