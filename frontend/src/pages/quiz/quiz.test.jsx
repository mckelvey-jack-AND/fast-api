import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Quiz from "./Quiz";

describe("Quiz component", () => {
  it("should render the Quiz page", () => {
 
    render(<Quiz />);
    expect(screen.getByText('Question')).toBeVisible();
    expect(screen.getByTestId('question'));
    expect(screen.getByTestId('answers'));
  });

});
