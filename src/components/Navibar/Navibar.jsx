import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navibar.css";
import brologo from "../../assets/brologo.png";
import { useTranslation } from "react-i18next";

const Navibar = ({ onLoginClick, onSignupClick }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  // Set initial language direction
  useEffect(() => {
    const currentLang = i18n.language || "en";
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const toggleLanguage = () => {
    const nextLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(nextLang);
    document.documentElement.lang = nextLang;
    document.documentElement.dir = nextLang === "ar" ? "rtl" : "ltr";
  };

  const toggleAccountDropdown = () => {
    setShowAccountDropdown(!showAccountDropdown);
  };

  const handleLoginClick = () => {
    setShowAccountDropdown(false);
    onLoginClick();
  };

  const handleSignupClick = () => {
    setShowAccountDropdown(false);
    onSignupClick();
  };

  
  const handleListPropertyClick = () => {
    const isOwnerLoggedIn = localStorage.getItem("ownerAuth") === "true";

    if (isOwnerLoggedIn) {
      navigate("/owner/list-property");
    } else {
      onLoginClick(); 
    }
  };

  return (
    <header className="navibar">
      <div className="navibar-left">
        <img className="navibar-logo" src={brologo} alt="Logo" />
      </div>

      <div className="navibar-right">
        <button
          className="navibar-btn"
          onClick={handleListPropertyClick}
        >
          {t("ListProperty")}
        </button>

        <button className="navibar-btn">{t("My Wishlist")}</button>
        <button className="navibar-btn">{t("My Booking")}</button>

        <div className="navibar-dropdown">
          <button
            className="navibar-btn navibar-account-btn"
            onClick={toggleAccountDropdown}
          >
            {t("Create Account / Login")}
          </button>

          {showAccountDropdown && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={handleLoginClick}>
                {t("login")}
              </button>
              <button className="dropdown-item" onClick={handleSignupClick}>
                {t("signup")}
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item">{t("manage")}</button>
              <button className="dropdown-item">{t("help")}</button>
            </div>
          )}
        </div>

        <button
          className="navibar-btn navibar-language-btn"
          onClick={toggleLanguage}
        >
          {i18n.language === "en" ? "Eng" : "عربي"}
        </button>
      </div>
    </header>
  );
};

export default Navibar;
