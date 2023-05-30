import React, { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import Home from "./home/Home";
import Dashboard from "./dashboard/Dashboard";
import Quiz from "./quiz/Quiz";
import NotFound from "./notFound/NotFound";
import { UserContext } from "../hooks/UserContext";

const Routes = () => {
  const [currentUser, setCurrentUser] = useState("");

  function RequireUserAuth({ children, redirectTo }) {
    const userExists = currentUser !== "";
    return userExists ? children : <Navigate to={redirectTo} />;
  }

  function RequireQuizAuth({ children, redirectTo }) {
    const userExists = currentUser !== "";
    const userHasTakenQuiz = !!currentUser?.has_taken_most_recent_quiz;

    if (!userExists) {
      return <Navigate to={"/"} />;
    }
    return !userHasTakenQuiz ? children : <Navigate to={redirectTo} />;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />

        <Route
          path="dashboard"
          element={
            <RequireUserAuth redirectTo="/">
              <Dashboard />
            </RequireUserAuth>
          }
        />
        <Route
          path="quiz"
          element={
            <RequireQuizAuth redirectTo="/dashboard">
              <Quiz />
            </RequireQuizAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
};

export default Routes;
