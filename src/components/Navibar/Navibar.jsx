import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // ADD Link HERE!
import "./Navibar.css";
import brologo from "../../assets/brologo.png";
import { useTranslation } from "react-i18next";
import { useWishlist } from './WishList';
import { FaHeart } from 'react-icons/fa';

const Navibar = ({ onLoginClick, onSignupClick }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const { getWishlistCount } = useWishlist(); // MOVE THIS UP

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

  // Also update the "My Wishlist" button to be a Link
  const handleWishlistClick = () => {
    navigate("/wishlist");
  };

  return (
    <header className="navibar">
      <div className="navibar-left">
        <Link to="/">
          <img className="navibar-logo" src={brologo} alt="Logo" 
          onClick={() => navigate("/")}/>
        </Link>
      </div>

      <div className="navibar-right">
        <button
          className="navibar-btn"
          onClick={handleListPropertyClick}
        >
          {t("ListProperty")}
        </button>

        <Link to="/wishlist" className="navibar-btn">
          {t("My Wishlist")}
          {getWishlistCount() > 0 && (
            <span className="wishlist-count-badge">{getWishlistCount()}</span>
          )}
        </Link>

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