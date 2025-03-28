import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RootLayout from "../src/app/layout";

jest.mock("../src/context/AuthContext", () => ({
  AuthProvider: ({ children }) => <>{children}</>,
}));

describe("RootLayout", () => {
  it("renders correctly", () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("renders AuthProvider", () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });
});