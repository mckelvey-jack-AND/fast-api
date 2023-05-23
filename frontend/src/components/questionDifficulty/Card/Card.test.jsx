import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./Card";
import { easyQuestionMockProp, hardQuestionMockProp } from "./cardMockData";

describe("Card component", () => {
  it("should render Card content", () => {
    render(<Card />);

    const individualDashboardContent = screen.getByText("Correct Answer");

    expect(individualDashboardContent).toBeVisible();
  });

  it("should render easy question props correctly", () => {
    render(<Card {...easyQuestionMockProp} />);

    expect(screen.getByText(easyQuestionMockProp.title)).toBeVisible();
    expect(
      screen.getByText(easyQuestionMockProp.question.question_text)
    ).toBeVisible();
    expect(
      screen.getByText(easyQuestionMockProp.question.answer_text)
    ).toBeVisible();
  });

  it("should render hard question props correctly", () => {
    render(<Card {...hardQuestionMockProp} />);

    expect(screen.getByText(hardQuestionMockProp.title)).toBeVisible();
    expect(
      screen.getByText(hardQuestionMockProp.question.question_text)
    ).toBeVisible();
    expect(
      screen.getByText(hardQuestionMockProp.question.answer_text)
    ).toBeVisible();
  });

  it("should render green background for easiest question", () => {
    render(<Card {...easyQuestionMockProp} />);
    expect(screen.getByTestId("easy")).toHaveClass("easy_container");
  });

  it("should render red background for hardest question", () => {
    render(<Card {...hardQuestionMockProp} />);
    expect(screen.getByTestId("hard")).toHaveClass("hard_container");
  });
});
