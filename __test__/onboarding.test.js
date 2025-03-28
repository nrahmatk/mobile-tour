import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Onboarding from "../src/app/onboarding/page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Onboarding", () => {
  it("renders initial onboarding screen correctly", () => {
    render(<Onboarding />);
    expect(screen.getByText("Life is short and the world is")).toBeInTheDocument();
    expect(screen.getByText("wide")).toBeInTheDocument();
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("navigates to the next onboarding screen when 'Next' button is clicked", () => {
    render(<Onboarding />);
    fireEvent.click(screen.getByText("Get Started"));
    expect(screen.getByText("It’s a big world out there go")).toBeInTheDocument();
    expect(screen.getByText("explore")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("redirects to sign-in page when 'Skip' button is clicked", () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });

    render(<Onboarding />);
    fireEvent.click(screen.getByText("Skip"));
    expect(pushMock).toHaveBeenCalledWith("/signin");
  });

  it("redirects to sign-in page after the last onboarding screen", () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });

    render(<Onboarding />);
    fireEvent.click(screen.getByText("Get Started"));
    fireEvent.click(screen.getByText("Next"));
    fireEvent.click(screen.getByText("Next"));
    expect(pushMock).toHaveBeenCalledWith("/signin");
  });
});