import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navibar from "./components/Navibar/Navibar";
import PropertyList from "./components/Navibar/PropertyList";
import SearchArea from "./components/Navibar/SearchArea";
import LoginPage from "./components/Navibar/Login";
import Signup from "./components/Navibar/Signup";
import ListProperty from "./pages/owner/ListProperty";
import { WishlistProvider } from "./components/Navibar/WishList";
import WishlistPage from "./components/Navibar/WishListPage";
import BookNowPage from "./components/Navibar/BookNowPage";
import { BookingProvider } from "./components/Navibar/BookingContext";
import MyBookingsPage from "./components/Navibar/MyBookingPage";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  return (
    <WishlistProvider>
      <BookingProvider>
        <Router>
          <div className="App">
            {/* NAVBAR ALWAYS VISIBLE */}
            <Navibar
              onLoginClick={handleLoginClick}
              onSignupClick={handleSignupClick}
            />

            {/* ROUTING */}
            <Routes>
              {/* CLIENT / HOME PAGE */}
              <Route
                path="/"
                element={
                  <>
                    <SearchArea />
                    <PropertyList />
                  </>
                }
              />

              {/* OWNER PAGE */}
              <Route
                path="/owner/list-property"
                element={<ListProperty />}
              />

              {/* BOOK NOW PAGE */}
              <Route
                path="/book-now/:propertyId"
                element={<BookNowPage />}
              />

              {/* WISHLIST PAGE */}
              <Route
                path="/wishlist"
                element={<WishlistPage />}
              />

              {/* MY BOOKINGS PAGE */}
              <Route
                path="/my-bookings"
                element={<MyBookingsPage />}
              />
            </Routes>

            {/* LOGIN POPUP */}
            {showLogin && (
              <LoginPage
                onClose={() => setShowLogin(false)}
                onSwitchToSignup={() => {
                  setShowLogin(false);
                  setShowSignup(true);
                }}
              />
            )}

            {/* SIGNUP POPUP */}
            {showSignup && (
              <Signup
                onClose={() => setShowSignup(false)}
                onSwitchToLogin={() => {
                  setShowSignup(false);
                  setShowLogin(true);
                }}
              />
            )}
          </div>
        </Router>
      </BookingProvider>
    </WishlistProvider>
  );
};

export default App;