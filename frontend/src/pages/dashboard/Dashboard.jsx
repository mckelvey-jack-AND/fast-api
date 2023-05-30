import React, { useState } from "react";
import styles from "./dashboard.module.css";
import Individual from "./components/individual/Individual";
import Squad from "./components/squad/Squad";

const Dashboard = () => {
  const [active, setActive] = useState("squad");

  return (
    <div className={styles.tabs}>
      <h2 className={styles.dashboard_header}>Dashboard</h2>
      <ul className={styles.nav}>
        <li
          className={active === "individual" ? styles.active : undefined}
          onClick={() => {
            setActive("individual");
          }}
        >
          <span>Individual</span>
        </li>
        <li
          className={active === "squad" ? styles.active : undefined}
          onClick={() => {
            setActive("squad");
          }}
        >
          <span>Squad</span>
        </li>
      </ul>
      <div className={styles.outlet}>
        {active === "individual" ? <Individual /> : <Squad />}
      </div>
    </div>
  );
};

export default Dashboard;
