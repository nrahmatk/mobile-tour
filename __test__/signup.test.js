import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Signin from "../src/app/signup/page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Signin", () => {
  it("renders 'Sign up now' text correctly", () => {
    useRouter.mockReturnValue({ push: jest.fn(), back: jest.fn() });

    render(<Signin />);
    expect(screen.getByText("Sign up now")).toBeInTheDocument();
  });

  it("handles name, email, and password input correctly", () => {
    useRouter.mockReturnValue({ push: jest.fn(), back: jest.fn() });

    render(<Signin />);
    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("handles sign up button click", () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock, back: jest.fn() });

    render(<Signin />);
    const signUpButton = screen.getByText("Sign Up");

    fireEvent.click(signUpButton);

    expect(pushMock).not.toHaveBeenCalled(); // Ensure no redirection happens
  });
});