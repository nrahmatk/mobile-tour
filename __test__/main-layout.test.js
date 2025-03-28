import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MainLayout from "../src/app/(main)/layout";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("MainLayout", () => {
  it("renders children correctly", () => {
    render(
      <MainLayout>
        <div>Test Child</div>
      </MainLayout>
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("renders navigation links correctly", () => {
    render(<MainLayout><div /></MainLayout>);
    expect(screen.getByAltText("Home")).toBeInTheDocument();
    expect(screen.getByAltText("Calendar")).toBeInTheDocument();
    expect(screen.getByAltText("Search")).toBeInTheDocument();
    expect(screen.getByAltText("Messages")).toBeInTheDocument();
    expect(screen.getByAltText("Profile")).toBeInTheDocument();
  });
});