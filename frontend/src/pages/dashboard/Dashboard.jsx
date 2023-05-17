import React, { useState } from "react";
import styles from "./dashboard.module.css";
import Individual from "./Individual";
import Squad from "./Squad";

const Dashboard = () => {
  const [active, setActive]= useState('individual');

  return (
    <div className={styles.tabs}>
    <ul className={styles.nav}>
      <li onClick={()=>{setActive('individual')}}>Individual</li>
      <li onClick={()=>{setActive('Squad')}}>Squad</li>
    </ul>
    <div className={styles.outlet}>
      {(active === 'individual') ? <Individual/> : <Squad/> }
    </div>
  </div>
  );
};

export default Dashboard;