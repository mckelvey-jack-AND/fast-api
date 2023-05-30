import React from "react";
import { render, screen } from "@testing-library/react";
import Individual from "./Individual";
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Individual component", () => {
  it("should render dashboard content", () => {
    render(<Individual />);
    const individualDashboardContent = screen.getByText("LOADING!");

    expect(individualDashboardContent).toBeVisible();
  });
});
