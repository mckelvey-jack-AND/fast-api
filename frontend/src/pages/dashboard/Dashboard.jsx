import React, { useState } from "react";
import styles from "./dashboard.module.css";
import Individual from "./components/individual/Individual";
import Squad from "./components/squad/Squad";

const Dashboard = () => {
  const [active, setActive] = useState("squad");

  return (
    <div className={styles.tabs}>
      <ul className={styles.nav}>
        <li
          className={active === "individual" ? styles.selected : undefined}
          onClick={() => {
            setActive("individual");
          }}
        >
          Individual
        </li>
        <li
          className={active === "squad" ? styles.selected : undefined}
          onClick={() => {
            setActive("squad");
          }}
        >
          Squad
        </li>
      </ul>
      <div className={styles.outlet}>
        {active === "individual" ? <Individual /> : <Squad />}
      </div>
    </div>
  );
};

export default Dashboard;
