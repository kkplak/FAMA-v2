import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import "./LanguageSwitcher.css";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (language) => {
    const pathParts = location.pathname.split("/");
    pathParts[1] = language;
    i18n.changeLanguage(language);
    navigate(`${pathParts.join("/")}${location.hash}`);
  };

  return (
    <div className="language-switcher" aria-label="Language">
      {["pl", "en"].map((language) => (
        <button
          type="button"
          key={language}
          onClick={() => handleLanguageChange(language)}
          className={i18n.language === language ? "active" : ""}
          aria-pressed={i18n.language === language}
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
