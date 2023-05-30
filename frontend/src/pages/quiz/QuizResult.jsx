import { Link } from "react-router-dom";
import React, {useEffect} from "react";
import styles from "./quizResult.module.css";
import PositionCard from "../../components/resultCards/resultCard/positionCard";
import useFetch from "../../hooks/useFetch";

const QuizResult = (props) => {

  const {
    data: resultData,
    error,
    loading,
  } = useFetch("/individual-position");

  useEffect(() => {
    if (error) {
      window.location.replace("/error");
    }
  }, [error]);
  return (
    <div>  {loading && <div>LOADING!</div>}
    {resultData && (
    <>
      <div className={styles.results}> Results</div>
      <div className={styles.links}>
        <div className={styles.question}>
          <div className={styles.score}>Score</div>
          <div className={styles.yourScore}>Your Score</div>
          <div className={styles.precentage}>
            {props.totalCorrectAnswer * 10}%
          </div>
        </div>
        <div className={styles.result_cards_container}>
        <>
          <PositionCard
            type="Squad"
            date="June 1st 2023"
            position={resultData[0].position}
            lastWeekPosition={resultData[1].position}
          />
          <PositionCard
            type="Club"
            date="June 1st 2023"
            position={resultData[2].position}
            lastWeekPosition={resultData[3].position}
          />
        </>
    </div>
        <button className={styles.dashboard}>
          <Link to="/dashboard" className={styles.resultLink}>
            {" "}
            See dashboard
          </Link>
        </button>
      </div>
    </>
        )}
    </div>

  );
};

export default QuizResult;
