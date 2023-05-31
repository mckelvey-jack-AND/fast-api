import React from "react";
import { render } from "@testing-library/react";
import Individual from "./Individual";
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Individual component", () => {
  it("should render animation when loading page", () => {
    const { container } = render(<Individual />);
    const individualDashboardContent = container.getElementsByClassName(
      "animation_container"
    );

    expect(individualDashboardContent.length).toBe(1);
  });
});
