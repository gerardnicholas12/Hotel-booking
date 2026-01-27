import { useState } from "react";
import Navibar from "./components/Navibar/Navibar";
import PropertyList from "./components/Navibar/PropertyList";
import SearchArea from "./components/Navibar/SearchArea";
import LoginPage from "./components/Navibar/login";
import Signup from "./components/Navibar/Signup";

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
    <div className="App">
      <Navibar 
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
      />

      <SearchArea />
      <PropertyList />

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
  );
};

export default App;