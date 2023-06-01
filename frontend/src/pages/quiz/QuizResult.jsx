import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import styles from "./quizResult.module.css";
import PositionCard from "../../components/resultCards/resultCard/PositionCard";
import useFetch from "../../hooks/useFetch";
import ReviewAnswers from "./ReviewAnswers";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";

const QuizResult = (props) => {
  const { currentUser } = React.useContext(UserContext);

  const {
    data: resultData,
    error,
    loading,
  } = useFetch("/individual-position", {
    user_id: currentUser.id,
  });

  const navigate = useNavigate();
  useEffect(() => {
    error && navigate("/error");
  }, [error]);
  return (
    <div>
      {" "}
      {loading && <div>LOADING!</div>}
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

            <ReviewAnswers
              questions={props.questions}
              answers={props.answers}
              correctAnswers={props.correctAnswers}
            />
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
