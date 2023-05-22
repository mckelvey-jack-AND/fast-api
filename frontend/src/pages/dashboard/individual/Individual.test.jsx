import React from "react";
import { render, screen } from "@testing-library/react";
import Individual from "./Individual";
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Individual component", () => {
  it("should render Individual dashboard content", () => {
    render(<Individual />);

    const individualDashboardContent = screen.getByText(
      "Individual dashboard content"
    );

    expect(individualDashboardContent).toBeVisible();
  });
});
