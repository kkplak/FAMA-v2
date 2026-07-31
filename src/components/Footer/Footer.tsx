import { ArrowUp, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./Footer.css";

const Footer = () => {
  const { t } = useTranslation();
  const phone = t("famaPhone");
  const email = t("famaMail");

  return (
    <footer id="contact" className="site-footer">
      <div className="footer-shell">
        <div className="footer-kicker">
          <span>04 / {t("contact")}</span>
          <span>GDAŃSK · POLAND</span>
        </div>

        <div className="footer-cta">
          <p>{t("contactH2")}</p>
          <a href={`mailto:${email.toLowerCase()}`}>
            {t("contactH3")}
            <ArrowUpRight aria-hidden="true" strokeWidth={1.2} />
          </a>
        </div>

        <div className="footer-details">
          <div>
            <span>{t("contactDirect")}</span>
            <a href={`mailto:${email.toLowerCase()}`}>{email}</a>
            <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
          </div>
          <div>
            <span>Social</span>
            <a
              href="https://www.instagram.com/fama_film/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram <ArrowUpRight aria-hidden="true" size={13} />
            </a>
            <a
              href="https://www.youtube.com/@fama_film"
              target="_blank"
              rel="noreferrer"
            >
              YouTube <ArrowUpRight aria-hidden="true" size={13} />
            </a>
          </div>
          <button
            type="button"
            className="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUp aria-hidden="true" size={17} />
            {t("backToTop")}
          </button>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} FAMA FILM</span>
          <span>{t("footerNote")}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
