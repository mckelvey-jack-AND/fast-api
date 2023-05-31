import React, { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../../App";
import Home from "../home/Home";
import Dashboard from "../dashboard/Dashboard";
import Quiz from "../quiz/Quiz";
import NotFound from "../notFound/NotFound";
import { UserContext } from "../../hooks/UserContext";
import { RequireQuizAuth, RequireUserAuth } from "./authentication/RouteAuths";

const Routes = () => {
  const [currentUser, setCurrentUser] = useState("");

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />

        <Route
          path="dashboard"
          element={
            <RequireUserAuth currentUser={currentUser} redirectTo="/">
              <Dashboard />
            </RequireUserAuth>
          }
        />
        <Route
          path="quiz"
          element={
            <RequireQuizAuth currentUser={currentUser} redirectTo="/dashboard">
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
