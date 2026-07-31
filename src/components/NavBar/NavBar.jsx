import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";

const NavBar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const language = ["pl", "en"].includes(location.pathname.split("/")[1])
    ? location.pathname.split("/")[1]
    : "pl";
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 32);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const home = `/${language}/home`;
  const links = [
    { to: `${home}#portfolio`, label: t("portfolio") },
    { to: `${home}#offer`, label: t("offer") },
    { to: `/${language}/aboutus`, label: t("about") },
    { to: `${home}#contact`, label: t("contact") },
  ];

  return (
    <nav
      className={`site-nav ${isScrolled ? "is-scrolled" : ""} ${
        isOpen ? "is-open" : ""
      }`}
      aria-label={t("mainNavigation")}
    >
      <div className="nav-inner">
        <Link className="nav-brand" to={home} aria-label="FAMA Film — home">
          <span>FAMA</span>
          <small>FILM</small>
        </Link>

        <div className="nav-links">
          {links.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <LanguageSwitcher />
          <button
            type="button"
            className="menu-button"
            onClick={() => setIsOpen((current) => !current)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? t("closeMenu") : t("openMenu")}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-navigation" className="mobile-navigation">
        <div className="mobile-link-list">
          {links.map((link, index) => (
            <Link key={link.to} to={link.to}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="mobile-nav-footer">
          <LanguageSwitcher />
          <div>
            <a
              href="https://www.instagram.com/fama_film/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram <ArrowUpRight aria-hidden="true" size={14} />
            </a>
            <a
              href="https://www.youtube.com/@fama_film"
              target="_blank"
              rel="noreferrer"
            >
              YouTube <ArrowUpRight aria-hidden="true" size={14} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
