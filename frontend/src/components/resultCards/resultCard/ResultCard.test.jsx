import React from "react";
import { render, screen } from "@testing-library/react";
import ResultCard from "./ResultCard";
import {
  resultCardMockData,
  resultMockPropForOneOccurrence,
} from "./resultCardMockData";

describe("ResultCard component", () => {
  it("should render ResultCard content", () => {
    render(<ResultCard {...resultCardMockData} />);

    const resultCardContent = screen.getByText("1st");

    expect(resultCardContent).toBeVisible();
  });

  it("should show the correct occurrence", () => {
    render(<ResultCard {...resultMockPropForOneOccurrence} />);

    const resultCardContent = screen.getByText("occasion");

    expect(resultCardContent).toBeVisible();
  });

  it("should show the correct occurrence", () => {
    render(<ResultCard {...resultCardMockData} />);

    const resultCardContent = screen.getByText("occasions");

    expect(resultCardContent).toBeVisible();
  });
});
