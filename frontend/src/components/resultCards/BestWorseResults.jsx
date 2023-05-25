import React from "react";
import ResultCard from "./resultCard/ResultCard";
import styles from "./bestWorseResults.module.css";
const BestWorseResults = ({ type }) => {
  return (
    <section className={styles.result_cards_container}>
      <ResultCard
        type={type}
        isBestResult={true}
        date="June 9th 2023"
        degree="1st"
        occasion="2"
      />
      <ResultCard
        type={type}
        isBestResult={false}
        date="May 15th 2023"
        degree="16th"
        occasion="1"
      />
    </section>
  );
};

export default BestWorseResults;
