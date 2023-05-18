import React from "react";
import { render, screen } from "@testing-library/react";
import Squad from "./Squad";

describe("Squad component", () => {
  it("should render Squad dashboard content", () => {
    render(<Squad />);

    const squadDashboardContent = screen.getByText("Squad dashboard content");

    expect(squadDashboardContent).toBeVisible();
  });
});