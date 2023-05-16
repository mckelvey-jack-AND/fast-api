import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
