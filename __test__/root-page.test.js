import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Home from "../src/app/page";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../src/context/AuthContext", () => ({
    useAuth: jest.fn(),
  }));

jest.useFakeTimers();

describe("Home Component", () => {
  it("redirects to /home if user is logged in", () => {
    const push = jest.fn();
    useRouter.mockReturnValue({ push });
    useAuth.mockReturnValue({ isLoggedIn: true });

    render(<Home />);
    jest.advanceTimersByTime(3000);

    expect(push).toHaveBeenCalledWith("/home");
  });

  it("redirects to /onboarding if user is not logged in", () => {
    const push = jest.fn();
    useRouter.mockReturnValue({ push });
    useAuth.mockReturnValue({ isLoggedIn: false });

    render(<Home />);
    jest.advanceTimersByTime(3000);

    expect(push).toHaveBeenCalledWith("/onboarding");
  });
});