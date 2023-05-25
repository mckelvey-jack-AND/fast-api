import React from "react";
import { render, screen } from "@testing-library/react";
import Squad from "./Squad";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

function MockComponent(text = "Dashboard") {
  return <div>{text} Component</div>;
}
jest.mock(
  "../leaderboard/Leaderboard",
  () => () => MockComponent("Leaderboard")
);
jest.mock(
  "../../../../components/graphs/overtimeChart/OvertimeChart",
  () => () => MockComponent("OvertimeChart")
);
jest.mock(
  "../../../../components/resultCards/BestWorseResults",
  () => () => MockComponent("BestWorseResults")
);

describe("Squad component", () => {
  it("should render dashboard content", () => {
    render(<Squad />);

    const squadDashboardContent = screen.getByText("Dashboard");

    expect(squadDashboardContent).toBeVisible();
  });
});
