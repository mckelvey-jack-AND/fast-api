import React from "react";
import { Link } from "react-router-dom";
import andLogo from "../../images/andLogo.png";
import styles from "./header.module.css";

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">
          <div className={styles.logo}>
            <img src={andLogo} className={styles.img} />
          </div>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
