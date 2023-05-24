import React from "react";
import { useEffect, useState } from "react";
import styles from "./quiz.module.css";
import QuizResult from "./QuizResult";

const Quiz = () => {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [endQuiz, setEndQuiz] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [totalCorrectAnswer, setTotalCorrectAnswer] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [allAnswers, setAllAnswers] = useState([]);

  const handleClick = (answer) => {
    if (currentQuestion === 36) {
      setEndQuiz(true);
    }
    if (answer === correctAnswer) {
      setTotalCorrectAnswer(totalCorrectAnswer + 1);
    }
    setAllAnswers([...allAnswers, answer]);
    setCurrentQuestion(currentQuestion + 4);
  };

  const questionDB = async () => {
    try {
      const res = await fetch("/quiz");
      const result = await res.json();

      setQuestion(result.data[currentQuestion].question_text);
      setAnswers([
        result.data[currentQuestion].answer_text,
        result.data[currentQuestion + 1].answer_text,
        result.data[currentQuestion + 2].answer_text,
        result.data[currentQuestion + 3].answer_text,
      ]);

      if (result.data[currentQuestion].isCorrect === 1) {
        setCorrectAnswer(result.data[currentQuestion].answer_text);
      } else if (result.data[currentQuestion + 1].isCorrect === 1) {
        setCorrectAnswer(result.data[currentQuestion + 1].answer_text);
      } else if (result.data[currentQuestion + 2].isCorrect === 1) {
        setCorrectAnswer(result.data[currentQuestion + 2].answer_text);
      } else if (result.data[currentQuestion + 3].isCorrect === 1) {
        setCorrectAnswer(result.data[currentQuestion + 3].answer_text);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    questionDB();
  }, [allAnswers]);

  return (
    <div>
      {endQuiz ? (
        <QuizResult totalCorrectAnswer={totalCorrectAnswer} allAnswers={allAnswers} />
      ) : (
        <>
          <div className={styles.progressBar}>
            <p>Question &nbsp;</p> {currentQuestion / 4 + 1}/10
          </div>
          <div className={styles.question} data-testid="question">
            {" "}
            {question}{" "}
          </div>
          <div className={styles.answer} data-testid="answers">
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className={styles.button_answer}
                  onClick={() => handleClick(answer)}
                >
                  {answer}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
