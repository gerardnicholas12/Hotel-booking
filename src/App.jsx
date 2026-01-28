import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navibar from "./components/Navibar/Navibar";
import PropertyList from "./components/Navibar/PropertyList";
import SearchArea from "./components/Navibar/SearchArea";
import LoginPage from "./components/Navibar/Login";
import Signup from "./components/Navibar/Signup";
import ListProperty from "./pages/owner/ListProperty";

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
  );
};

export default App;
