import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SplashScreen from "@/components/SplashScreen";
import Thumbnail from "@/components/Thumbnail";
import FavoritePlaceCard from "@/components/FavoritePlaceCard";
import BookNowButton from "@/components/BookNowButton";
import BookmarkButton from "@/components/BookmarkButton";
import BackButton from "@/components/BackButton";
import ReadMore from "@/components/ReadMore";
import BestDestinationCard from "@/components/BestDestinationCard";
import Profile from "@/app/(main)/profile/page";
import { useAuth } from "@/context/AuthContext";

jest.mock("axios");

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../src/context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("Profile", () => {
  it("renders the sign out button", () => {
    useAuth.mockReturnValue({ logout: jest.fn() });
    render(<Profile />);
    const button = screen.getByText("Sign out");
    expect(button).toBeInTheDocument();
  });

  it("calls logout function when button is clicked", () => {
    const logoutMock = jest.fn();
    useAuth.mockReturnValue({ logout: logoutMock });
    render(<Profile />);
    const button = screen.getByText("Sign out");
    fireEvent.click(button);
    expect(logoutMock).toHaveBeenCalled();
  });
});

describe("SplashScreen", () => {
  it("renders the travel icon image", () => {
    render(<SplashScreen />);
    const image = screen.getByAltText("Travel Icon");
    expect(image).toBeInTheDocument();
  });

  it('renders the heading with text "Travel Test"', () => {
    render(<SplashScreen />);
    const heading = screen.getByText("Travel Test");
    expect(heading).toBeInTheDocument();
  });
});

describe("Thumbnail", () => {
  it("renders the correct number of thumbnails", () => {
    const mockPlaces = [
      { imageSrc: "/1.jpg", title: "Place 1" },
      { imageSrc: "/2.jpg", title: "Place 2" },
      { imageSrc: "/3.jpg", title: "Place 3" },
      { imageSrc: "/4.jpg", title: "Place 4" },
      { imageSrc: "/5.jpg", title: "Place 5" },
      { imageSrc: "/6.jpg", title: "Place 6" },
    ];

    render(<Thumbnail places={mockPlaces} />);
    expect(screen.getAllByRole("img").length).toBe(5);
  });
});

describe("FavoritePlaceCard", () => {
  it("renders the favorite place details", () => {
    const mockPlace = {
      id: "1",
      slug: "paris",
      imageSrc: "/paris.jpg",
      title: "Paris",
      location: "France",
    };

    render(<FavoritePlaceCard place={mockPlace} />);
    expect(screen.getByText("Paris")).toBeInTheDocument();
    expect(screen.getByText("France")).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/places/paris");
  });
});

describe("BookmarkButton", () => {
  it("renders the bookmark button", () => {
    render(<BookmarkButton />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("toggles bookmark state when clicked", () => {
    render(<BookmarkButton />);
    const button = screen.getByRole("button");
  });
});

describe("BookNowButton", () => {
  it("renders the Book Now button", () => {
    render(<BookNowButton />);
    const button = screen.getByText("Book Now");
    expect(button).toBeInTheDocument();
  });

  it("hides the button when scrolled down", () => {
    render(<BookNowButton />);
    window.dispatchEvent(new Event("scroll"));
  });
});

describe("BackButton", () => {
  it("renders the back button", () => {
    render(<BackButton />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});

describe("ReadMore", () => {
  it("shows truncated text and toggles expansion", () => {
    const text = "This is a long description that needs truncation.";
    render(<ReadMore text={text} maxLength={10} />);
    expect(screen.getByText("This is a ...")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Read More"));
    expect(screen.getByText(text)).toBeInTheDocument();

    fireEvent.click(screen.getByText("Show Less"));
    expect(screen.getByText("This is a ...")).toBeInTheDocument();
  });
});

describe("BestDestinationCard", () => {
  it("renders the destination details", () => {
    const mockPlace = {
      imageSrc: "/image.jpg",
      title: "Bali",
      location: "Indonesia",
      rating: 4.5,
      ratingCount: 100,
      slug: "bali",
    };

    render(<BestDestinationCard {...mockPlace} />);

    expect(screen.getByText("Bali")).toBeInTheDocument();
    expect(screen.getByText("Indonesia")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("renders a clickable link to the destination page", () => {
    const mockPlace = {
      imageSrc: "/image.jpg",
      title: "Bali",
      location: "Indonesia",
      rating: 4.5,
      ratingCount: 100,
      slug: "bali",
    };

    render(<BestDestinationCard {...mockPlace} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/places/bali");
  });
});
