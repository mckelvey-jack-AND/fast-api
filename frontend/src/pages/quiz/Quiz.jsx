import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./quiz.module.css";

const Quiz = () => {
  //const [quizData, setQuizData] = useState(null);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [endQuiz, setEndQuiz] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [totalCorrectAnswer, setTotalCorrectAnswer] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleNextClick = (answer) => {
    if (currentQuestion === 40) {
      setEndQuiz(true);
    }
    if (answer === correctAnswer) {
      setTotalCorrectAnswer(totalCorrectAnswer + 1);
    }
    setCurrentQuestion(currentQuestion + 4);
    questionDB();
  };

  
  const questionDB = async () => {
    try {
      let res = await axios.get('/quiz');
      let result = res.data;
     
      setQuestion(result.data[currentQuestion].question_text);
      setAnswers(
        [result.data[currentQuestion].answer_text,
        result.data[currentQuestion+1].answer_text,
        result.data[currentQuestion+2].answer_text,
        result.data[currentQuestion+3].answer_text]);
        if (result.data[currentQuestion].isCorrect === 1) {
          setCorrectAnswer(result.data[currentQuestion]);
        } else if (result.data[currentQuestion+1].answer_text){
          setCorrectAnswer(result.data[currentQuestion+1].answer_text);
        } else if (result.data[currentQuestion+2].answer_text){
          setCorrectAnswer(result.data[currentQuestion+2].answer_text);
        } else if (result.data[currentQuestion+3].answer_text){
          setCorrectAnswer(result.data[currentQuestion+3].answer_text);
        }
    } catch (e) {
      console.log(e);
    }
  }
   
  useEffect( () => {
    questionDB()
  }, []);

  return (
    <div>
        {endQuiz ? (
          <>
            <div className={styles.question}> Quiz End!</div>
            <div>{totalCorrectAnswer - 1} correct answers</div>
          </>
        ) : (
          <>
            <div className={styles.question}>{question}</div>
            <div className={styles.answer}>
                {answers.map((answer, index) => {
                  return <button key={index} className={styles.button_answer} onClick={() => handleNextClick(answer)}>{answer}</button>
                })}
              </div>
          </>
        )}

    </div>

  );
};

export default Quiz;
