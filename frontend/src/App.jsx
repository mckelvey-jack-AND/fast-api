import React, { useState, useEffect } from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { UserContext } from "./hooks/UserContext";

function App() {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser"))
      : null
  );

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    if (!currentUser) {
      navigate("/");
    } else if (currentUser.has_taken_most_recent_quiz === 1) {
      navigate("/dashboard");
    } else {
      navigate("/quiz");
    }
  }, [currentUser, navigate]);

  return (
    <>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Header />
        <main>
          {/* Dynamic main content */}
          <Outlet />
        </main>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
