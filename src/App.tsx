import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en.json";
import translationPL from "./locales/pl.json";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import CinematicIntro from "./components/CinematicIntro/CinematicIntro";
import "./App.css";

const supportedLanguages = ["pl", "en"];
const languageFromPath = window.location.pathname.split("/")[1];

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    pl: { translation: translationPL },
  },
  lng: supportedLanguages.includes(languageFromPath) ? languageFromPath : "pl",
  fallbackLng: "pl",
  interpolation: { escapeValue: false },
});

const LanguageSync = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const language = pathname.split("/")[1];

    if (supportedLanguages.includes(language) && i18next.language !== language) {
      i18next.changeLanguage(language);
    }

    document.documentElement.lang = supportedLanguages.includes(language)
      ? language
      : "pl";
  }, [pathname]);

  return null;
};

const App = () => (
  <HelmetProvider>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <CinematicIntro />
        <LanguageSync />
        <ScrollToTop />
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/pl/home" />} />
          <Route path="/:lang/home" element={<Home />} />
          <Route path="/:lang/aboutus" element={<AboutUs />} />
          <Route path="*" element={<Navigate replace to="/pl/home" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </I18nextProvider>
  </HelmetProvider>
);

export default App;
