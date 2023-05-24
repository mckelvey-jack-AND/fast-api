import React from "react";
import ResultCard from "./resultCard/ResultCard";
import styles from "./bestWorseResults.module.css";
const BestWorseResults = ({ type }) => {
  return (
    <section className={styles.result_cards_container}>
      <ResultCard type={type} isBestResult={true} />
      <ResultCard type={type} isBestResult={false} />
    </section>
  );
};

export default BestWorseResults;
