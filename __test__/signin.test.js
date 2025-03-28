import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Signin from "../src/app/signin/page";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../src/context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("Signin", () => {
  it("renders 'Sign in now' text correctly", () => {
    useAuth.mockReturnValue({ login: jest.fn() });
    useRouter.mockReturnValue({ push: jest.fn(), back: jest.fn() });

    render(<Signin />);
    expect(screen.getByText("Sign in now")).toBeInTheDocument();
  });

  it("handles email and password input correctly", () => {
    useAuth.mockReturnValue({ login: jest.fn() });
    useRouter.mockReturnValue({ push: jest.fn(), back: jest.fn() });

    render(<Signin />);
    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("handles sign in and redirects to home page", () => {
    const loginMock = jest.fn();
    const pushMock = jest.fn();
    useAuth.mockReturnValue({ login: loginMock });
    useRouter.mockReturnValue({ push: pushMock, back: jest.fn() });

    render(<Signin />);
    const signInButton = screen.getByText("Sign In");

    fireEvent.click(signInButton);

    expect(loginMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith("/home");
  });
});
