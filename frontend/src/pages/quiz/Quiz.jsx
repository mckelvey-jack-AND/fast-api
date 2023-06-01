import React, { useContext } from "react";
import { useEffect, useState } from "react";
import styles from "./quiz.module.css";
import QuizResult from "./QuizResult";
import { UserContext } from "../../hooks/UserContext";
import { RightArrowIcon } from "../../components/resultCards/resultCard/ArrowIcons";

const Quiz = () => {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [endQuiz, setEndQuiz] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [allCorrectAnswers, setAllCorrectAnswers] = useState([]);
  const [totalCorrectAnswer, setTotalCorrectAnswer] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [allAnswers, setAllAnswers] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [roundId, setRoundId] = useState([]);
  const [answerId, setAnswerId] = useState([]);
  const [questionId, setQuestionId] = useState([]);

  const { currentUser } = useContext(UserContext);
  const sendDataToServer = async () => {
    const reversedAllAnswers = [...allAnswers].reverse();
    const reversedQuestionId = [...questionId].reverse();
    const reversedAnswerId = [...answerId].reverse();

    try {
      await fetch("/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: reversedAllAnswers,
          roundId: roundId,
          questionId: reversedQuestionId,
          answerId: reversedAnswerId,
          userId: Array(10).fill(currentUser.id),
        }),
      });
      setShowResult(true);
    } catch (error) {
      console.log("Error:", error); // eslint-disable-line
    }
  };

  const handleClick = (answer) => {
    if (currentQuestion === 36) {
      if (answer.text === correctAnswer) {
        setTotalCorrectAnswer(totalCorrectAnswer + 1);
      }
      setAllAnswers([...allAnswers, answer.text]);
      setAnswerId([...answerId, answer.id]);
      setEndQuiz(true);
      return;
    }
    if (answer.text === correctAnswer) {
      setTotalCorrectAnswer(totalCorrectAnswer + 1);
    }
    setAllAnswers([...allAnswers, answer.text]);
    setAnswerId([...answerId, answer.id]);
    setCurrentQuestion(currentQuestion + 4);
  };

  const questionDB = async () => {
    try {
      const res = await fetch("/quiz");
      const result = await res.json();
      setQuestion(result.data[currentQuestion].question_text);
      setAllQuestions([
        ...allQuestions,
        result.data[currentQuestion].question_text,
      ]);
      setQuestionId([...questionId, result.data[currentQuestion].question_id]);
      setRoundId([...roundId, result.data[currentQuestion].round_id]);

      setAnswers([
        {
          text: result.data[currentQuestion].answer_text,
          id: result.data[currentQuestion].answer_id,
        },
        {
          text: result.data[currentQuestion + 1].answer_text,
          id: result.data[currentQuestion + 1].answer_id,
        },
        {
          text: result.data[currentQuestion + 2].answer_text,
          id: result.data[currentQuestion + 2].answer_id,
        },
        {
          text: result.data[currentQuestion + 3].answer_text,
          id: result.data[currentQuestion + 3].answer_id,
        },
      ]);

      if (result.data[currentQuestion].isCorrect === 1) {
        setCorrectAnswer(result.data[currentQuestion].answer_text);
        setAllCorrectAnswers([
          ...allCorrectAnswers,
          result.data[currentQuestion].answer_text,
        ]);
      } else if (result.data[currentQuestion + 1].isCorrect === 1) {
        setCorrectAnswer(result.data[currentQuestion + 1].answer_text);
        setAllCorrectAnswers([
          ...allCorrectAnswers,
          result.data[currentQuestion + 1].answer_text,
        ]);
      } else if (result.data[currentQuestion + 2].isCorrect === 1) {
        setCorrectAnswer(result.data[currentQuestion + 2].answer_text);
        setAllCorrectAnswers([
          ...allCorrectAnswers,
          result.data[currentQuestion + 2].answer_text,
        ]);
      } else if (result.data[currentQuestion + 3].isCorrect === 1) {
        setCorrectAnswer(result.data[currentQuestion + 3].answer_text);
        setAllCorrectAnswers([
          ...allCorrectAnswers,
          result.data[currentQuestion + 3].answer_text,
        ]);
      }
    } catch (e) {
      console.log(e); // eslint-disable-line
    }
  };

  useEffect(() => {
    questionDB();
  }, [allAnswers]);

  return (
    <div>
      {showResult ? (
        <QuizResult
          totalCorrectAnswer={totalCorrectAnswer}
          questions={allQuestions}
          answers={allAnswers}
          correctAnswers={allCorrectAnswers}
        />
      ) : (
        <>
          {!endQuiz && (
            <div className={styles.progressBar}>
              <p>Question &nbsp;</p> {currentQuestion / 4 + 1}/10
            </div>
          )}
          <div className={styles.question} data-testid="question">
            {endQuiz ? "You finished the quiz! " : question}
          </div>
          <div className={styles.answer} data-testid="answers">
            <>
              {!endQuiz &&
                answers.map((answer, index) => {
                  return (
                    <button
                      key={index}
                      className={styles.button_answer}
                      onClick={() => handleClick(answer)}
                    >
                      {answer.text}
                    </button>
                  );
                })}
            </>
            {endQuiz && (
              <button
                className={styles.submit}
                onClick={() => {
                  sendDataToServer();
                }}
              >
                <span>See Results</span>
                {<RightArrowIcon />}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
