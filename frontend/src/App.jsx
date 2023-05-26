import React, { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { UserContext } from "./hooks/UserContext";

function App() {
  const [currentUser, setCurrentUser] = useState("");

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
