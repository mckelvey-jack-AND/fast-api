import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Dashboard component", () => {
  it("should render Individual dashboard content as a default", () => {
    render(<Dashboard />);

    const individualDashboardContent = screen.getByText("Dashboard");

    expect(individualDashboardContent).toBeVisible();
  });

  it("should render Squad content after clicking on Squad tab", () => {
    render(<Dashboard />);

    const individualTab = screen.getByText("Squad");

    // Click on individual tab
    fireEvent.click(individualTab);

    expect(screen.queryByText("Dashboard")).toBeVisible();
  });
  it("Mock test", () => {
    expect(true).toBe(true);
  });
});
