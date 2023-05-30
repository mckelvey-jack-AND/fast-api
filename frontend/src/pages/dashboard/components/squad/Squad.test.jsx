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

jest.mock(
  "../../../../components/graphs/GroupedBarChart",
  () => () => MockComponent("GroupedBarChart")
);

describe("Squad component", () => {
  it("should render squad component", () => {
    render(<Squad />);

    const squadDashboardContent = screen.getByText("OvertimeChart Component");

    expect(squadDashboardContent).toBeVisible();
  });
});
