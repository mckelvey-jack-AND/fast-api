import React from "react";
import { render, screen } from "@testing-library/react";
import PositionCard from "./PositionCard";


describe("PositionCard component", () => {
  it("should render PositionCard content", () => {
    render(<PositionCard type="Club" date="June 1st 2023" position={1} lastWeekPosition={3} />);
    expect(screen.getByText("Club Position")).toBeVisible();
    expect(screen.getByText("1st")).toBeVisible();
  });

});
