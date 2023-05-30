import React, { useEffect } from "react";
import Card from "./Card/Card";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import styles from "./questionDifficulty.module.css";
const QuestionDifficulty = () => {
  const {
    data: question,
    error,
    loading,
  } = useFetch("/individual-questions-difficulty");
  const navigate = useNavigate();

  useEffect(() => {
    error && navigate("/error");
  }, [error]);

  return (
    <section className={styles.question_card_container}>
      {loading && <div>Loading...</div>}
      <Card
        title="Individuals easiest question this week
"
        question={question?.easiest_question}
        type="easy"
      />
      <Card
        title="Individuals Hardest question this week
"
        question={question?.hardest_question}
        type="hard"
      />
    </section>
  );
};

export default QuestionDifficulty;
