import React from "react";
import styles from "./loadingAnimation.module.css";

const LoadingAnimation = () => {
  return (
    <div className={styles.animation_container}>
      <div className={styles.loading_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
