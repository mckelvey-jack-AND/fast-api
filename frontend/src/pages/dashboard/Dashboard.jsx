import React, { useState } from "react";
import styles from "./dashboard.module.css";
import Individual from "./individual/Individual";
import Squad from "./squad/Squad";
import GroupedBarChart from "../../components/graphs/GroupedBarChart";

const Dashboard = () => {
  const [active, setActive] = useState("individual");

  return (
    <div className={styles.tabs}>
      <ul className={styles.nav}>
        <li
          onClick={() => {
            setActive("individual");
          }}
        >
          Individual
        </li>
        <li
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
      <GroupedBarChart />
    </div>
  );
};

export default Dashboard;
