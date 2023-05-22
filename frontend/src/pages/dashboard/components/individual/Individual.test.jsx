import React from "react";
import { render, screen } from "@testing-library/react";
import Individual from "./Individual";

describe("Individual component", () => {
  it("should render dashboard content", () => {
    render(<Individual />);
    const individualDashboardContent = screen.getByText(
      "Dashboard"
    );

    expect(individualDashboardContent).toBeVisible();
  });
});
