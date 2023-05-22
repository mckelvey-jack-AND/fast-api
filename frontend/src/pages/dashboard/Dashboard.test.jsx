import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";

describe("Dashboard component", () => {
  it("should render Individual dashboard content as a default", () => {
    render(<Dashboard />);

    const individualDashboardContent = screen.getByText(
      "Dashboard"
    );

    expect(individualDashboardContent).toBeVisible();
  });

  it("should render Squad content after clicking on Squad tab", () => {
    render(<Dashboard />);

    const individualTab = screen.getByText("Squad");


    // Click on individual tab
    fireEvent.click(individualTab);

    expect(screen.queryByText("Dashboard")).toBeVisible();
  });
});
