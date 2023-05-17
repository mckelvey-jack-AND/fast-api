import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        {/* Dynamic main content */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
