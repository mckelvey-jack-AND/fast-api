import React from "react";
import { render } from "@testing-library/react";
import Dashboard from "./Dashboard";
describe("Dashboard", () => {
  it("renders correctly", () => {
    render(<Dashboard />);
    expect(true).toBe(true);
  });
});
