import React from "react";
import { Navigate } from "react-router-dom";

const RequireUserAuth = ({ children, currentUser, redirectTo }) => {
  const userExists = currentUser !== "";
  return userExists ? children : <Navigate to={redirectTo} />;
};

const RequireQuizAuth = ({ children, currentUser, redirectTo }) => {
  const userExists = currentUser !== "";
  const userHasTakenQuiz = !!currentUser?.has_taken_most_recent_quiz;

  if (!userExists) {
    return <Navigate to={"/"} />;
  }
  return !userHasTakenQuiz ? children : <Navigate to={redirectTo} />;
};

export { RequireUserAuth, RequireQuizAuth };
