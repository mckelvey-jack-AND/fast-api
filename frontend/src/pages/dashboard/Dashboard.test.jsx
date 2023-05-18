import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";

describe("Dashboard component", () => {
  it("should render Individual dashboard content as a default", () => {
    render(<Dashboard />);

    const individualDashboardContent = screen.getByText(
      "Individual dashboard content"
    );

    expect(individualDashboardContent).toBeVisible();
  });

  it("should render Squad content after clicking on Squad tab", () => {
    render(<Dashboard />);

    const individualTab = screen.getByText("Squad");

    // Check that 'Individual dashboard content' text is not visible initially
    expect(screen.queryByText("Squad dashboard content")).toBeNull();

    // Click on individual tab
    fireEvent.click(individualTab);

    expect(screen.queryByText("Squad dashboard content")).toBeVisible();
  });
});
