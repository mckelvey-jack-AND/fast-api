import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        © 2023 Created by @
        <a href="https://www.and.digital/" rel="noreferrer" target="_blank">
          and digital
        </a>
      </p>
    </footer>
  );
};

export default Footer;
