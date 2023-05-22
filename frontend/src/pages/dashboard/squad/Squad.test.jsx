import React from "react";
import { render, screen } from "@testing-library/react";
import Squad from "./Squad";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Squad component", () => {
  it("should render Squad dashboard content", () => {
    render(<Squad />);

    const squadDashboardContent = screen.getByText("Squad dashboard content");

    expect(squadDashboardContent).toBeVisible();
  });
});
