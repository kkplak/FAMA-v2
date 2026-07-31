import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import HeroVideoDialog from "../components/HeroDialog/HeroVideoDialog";
import ToggleDescription from "../components/Toggle/Toggle";
import { AppleCardsCarouselDemo } from "../components/AppleCard/CardsDemo";

const Home = () => {
  const { t, i18n } = useTranslation();
  const { lang = "pl" } = useParams<{ lang: string }>();
  const location = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHeroPlaying, setIsHeroPlaying] = useState(true);
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
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          },
        };

  useEffect(() => {
    if (lang === "pl" || lang === "en") {
      i18n.changeLanguage(lang);
    }
  }, [i18n, lang]);

  useEffect(() => {
    if (!location.hash) return;

    const frame = window.requestAnimationFrame(() => {
      document
        .querySelector(location.hash)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const startVideo = () => {
      video
        .play()
        .then(() => setIsHeroPlaying(true))
        .catch(() => setIsHeroPlaying(false));
    };

    if (video.readyState >= 2) startVideo();
    else video.addEventListener("canplay", startVideo, { once: true });

    return () => video.removeEventListener("canplay", startVideo);
  }, []);

  const toggleHeroVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => setIsHeroPlaying(false));
    } else {
      video.pause();
    }
  };

  const project = (index: number) => ({
    title: t(`port${index}`),
    videoSrc: t(`port${index}Src`),
    thumbnailSrc: t(`port${index}Img`),
    credits: t(`port${index}Credits`),
    index: String(index).padStart(2, "0"),
  });

  const featuredProjects = [1, 2, 3, 4].map(project);
  const archiveProjects = Array.from({ length: 12 }, (_, index) =>
    project(index + 5)
  );
  const process = [1, 2, 3].map((index) => ({
    title: t(`homeOffer${index}Title`),
    description: t(`homeOffer${index}Copy`),
    index: String(index).padStart(2, "0"),
  }));

  return (
    <main id="top-of-page" className="homepage">
      <Helmet>
        <title>{t("seoHomeTitle")}</title>
        <meta name="description" content={t("seoHomeDescription")} />
        <link rel="canonical" href={`https://famafilm.pl/${lang}/home`} />
      </Helmet>

      <section id="home" className="hero-section" aria-label={t("heroLabel")}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/media/video/hero-poster.jpg"
          className="hero-video"
          aria-hidden="true"
          onPlay={() => setIsHeroPlaying(true)}
          onPause={() => setIsHeroPlaying(false)}
          disablePictureInPicture
        >
          <source src="/media/video/hero-showreel.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" />

        <div className="hero-meta hero-meta-left">FAMA FILM®</div>
        <div className="hero-meta hero-meta-right">GDAŃSK · POLAND</div>

        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">{t("heroEyebrow")}</p>
          <h1 className="hero-title">FAMA</h1>
          <p className="hero-subtitle">{t("heroSubtitle")}</p>
        </div>

        <a className="hero-scroll" href="#introduction">
          <span>{t("discover")}</span>
          <ArrowDown aria-hidden="true" size={16} strokeWidth={1.5} />
        </a>
        <button
          type="button"
          className="hero-media-control"
          onClick={toggleHeroVideo}
          aria-label={isHeroPlaying ? t("pauseShowreel") : t("playShowreel")}
        >
          {isHeroPlaying ? (
            <Pause aria-hidden="true" size={13} fill="currentColor" />
          ) : (
            <Play aria-hidden="true" size={13} fill="currentColor" />
          )}
          <span>{isHeroPlaying ? t("pause") : t("play")}</span>
        </button>
      </section>

      <section id="introduction" className="site-section intro-section">
        <div className="section-shell intro-grid">
          <div>
            <p className="eyebrow">{t("introEyebrow")}</p>
            <span className="section-index">01</span>
          </div>
          <motion.div className="intro-copy" {...reveal(0.05)}>
            <h2>{t("magicText")}</h2>
            <p>{t("homeP")}</p>
            <a className="text-link" href="#portfolio">
              {t("introCta")}
              <ArrowDown aria-hidden="true" size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      <section id="portfolio" className="site-section portfolio-section">
        <div className="section-shell">
          <motion.div className="section-heading" {...reveal()}>
            <div>
              <p className="eyebrow">{t("portfolioEyebrow")}</p>
              <h2>{t("homePorfolio")}</h2>
            </div>
            <p className="section-note">{t("portfolioNote")}</p>
          </motion.div>

          <div className="portfolio-grid portfolio-grid-featured">
            {featuredProjects.map((item, index) => (
              <motion.div key={item.index} {...reveal(index * 0.06)}>
                <HeroVideoDialog
                  animationStyle="fade"
                  credits={item.credits}
                  videoSrc={item.videoSrc}
                  thumbnailSrc={item.thumbnailSrc}
                  thumbnailAlt={item.title}
                  title={item.title}
                  index={item.index}
                />
              </motion.div>
            ))}
          </div>

          <ToggleDescription
            description={
              <>
                <div className="archive-heading">
                  <span>{t("homePorfolioCollab")}</span>
                  <span>05—16</span>
                </div>
                <div className="portfolio-grid portfolio-grid-archive">
                  {archiveProjects.map((item) => (
                    <HeroVideoDialog
                      key={item.index}
                      animationStyle="fade"
                      credits={item.credits}
                      videoSrc={item.videoSrc}
                      thumbnailSrc={item.thumbnailSrc}
                      thumbnailAlt={item.title}
                      title={item.title}
                      index={item.index}
                    />
                  ))}
                </div>
              </>
            }
          />
        </div>
      </section>

      <section id="offer" className="site-section process-section">
        <div className="section-shell">
          <motion.div
            className="section-heading section-heading-light"
            {...reveal()}
          >
            <div>
              <p className="eyebrow">{t("processEyebrow")}</p>
              <h2>{t("homeOffer")}</h2>
            </div>
            <span className="section-index">02</span>
          </motion.div>

          <div className="process-grid">
            {process.map((step, index) => (
              <motion.article
                className="process-card"
                key={step.index}
                {...reveal(index * 0.08)}
              >
                <div className="process-card-top">
                  <span>{step.index}</span>
                  <span className="process-line" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="site-section services-section">
        <motion.div
          className="section-shell services-heading"
          {...reveal()}
        >
          <p className="eyebrow">{t("servicesEyebrow")}</p>
          <h2>{t("homeSliderH1")}</h2>
        </motion.div>
        <AppleCardsCarouselDemo />
      </section>

      <section className="site-section about-teaser-section">
        <div className="section-shell about-teaser-grid">
          <motion.div className="about-teaser-image-wrap" {...reveal()}>
            <img
              className="about-teaser-image"
              src="/media/bts3.jpeg"
              alt={t("aboutTeaserImageAlt")}
              loading="lazy"
            />
            <span className="image-caption">FAMA / BEHIND THE SCENES</span>
          </motion.div>
          <motion.div className="about-teaser-copy" {...reveal(0.08)}>
            <p className="eyebrow">{t("aboutTeaserEyebrow")}</p>
            <h2>{t("aboutTeaserTitle")}</h2>
            <p>{t("aboutTeaserCopy")}</p>
            <Link className="outline-link" to={`/${lang}/aboutus`}>
              {t("aboutTeaserCta")}
              <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home;
