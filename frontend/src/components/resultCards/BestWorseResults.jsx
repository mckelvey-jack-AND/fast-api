import React, { useEffect } from "react";
import ResultCard from "./resultCard/ResultCard";
import styles from "./bestWorseResults.module.css";
import useFetch from "../../hooks/useFetch";
import { UserContext } from "../../hooks/UserContext";

const BestWorseResults = ({ type }) => {
  const { currentUser } = React.useContext(UserContext);

  const {
    data: resultData,
    error,
    loading,
  } = useFetch("/best-results-and-worst-results", {
    type: type,
    squadName: currentUser.squad,
    user_id: currentUser.id,
  });

  useEffect(() => {
    if (error) {
      window.location.replace("/error");
    }
  }, [error]);

  return (
    <section className={styles.result_cards_container}>
      {loading && <div>LOADING!</div>}
      {resultData && (
        <>
          <ResultCard
            type={type}
            isBestResult={true}
            date="June 9th 2023"
            position={resultData?.best_result.position}
            occurrences={resultData?.best_result.occurrences}
          />
          <ResultCard
            type={type}
            isBestResult={false}
            date="May 15th 2023"
            position={resultData.worst_result.position}
            occurrences={resultData.worst_result.occurrences}
          />
        </>
      )}
    </section>
  );
};

export default BestWorseResults;
