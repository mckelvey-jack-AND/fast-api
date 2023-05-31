import React from "react";
import { render, screen } from "@testing-library/react";
import Quiz from "./Quiz";

const currentUser = {
  first_name: "Bernie",
  has_taken_most_recent_quiz: 0,
  id: 2,
  last_name: "Kleen",
  squad: "squad_1",
};

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: () => currentUser,
}));

describe("Quiz component", () => {
  it("should render the Quiz page", () => {
    render(<Quiz />);
    expect(screen.getByText("Question")).toBeVisible();
    expect(screen.getByTestId("question"));
    expect(screen.getByTestId("answers"));
  });
});
