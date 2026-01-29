// App.jsx - ONLY this component
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navibar from "./components/Navibar/Navibar";
import PropertyList from "./components/Navibar/PropertyList";
import SearchArea from "./components/Navibar/SearchArea";
import LoginPage from "./components/Navibar/Login";
import Signup from "./components/Navibar/Signup";
import ListProperty from "./pages/owner/ListProperty";
import WishlistPage from "./components/Navibar/WishListPage";
import BookNowPage from "./components/Navibar/BookNowPage";
import UserProfile from "./components/Navibar/UserProfile";
import WishlistProvider from "./components/Navibar/WishList";

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
      <Router>
        <div className="App">
          <Navibar
            onLoginClick={handleLoginClick}
            onSignupClick={handleSignupClick}
          />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchArea />
                  <PropertyList />
                </>
              }
            />

            <Route
              path="/owner/list-property"
              element={<ListProperty />}
            />

            <Route
              path="/wishlist"
              element={<WishlistPage />}
            />

            <Route
              path="/user-profile"
              element={<UserProfile />}
            />

            <Route
              path="/book-now/:id"
              element={<BookNowPage />}
            />
          </Routes>

          {showLogin && (
            <LoginPage
              onClose={() => setShowLogin(false)}
              onSwitchToSignup={() => {
                setShowLogin(false);
                setShowSignup(true);
              }}
            />
          )}

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
    </WishlistProvider>
  );
};

export default App;