"use client";
import BackButton from "@/components/BackButton";
import BookmarkButton from "@/components/BookmarkButton";
import { Place } from "@/components/Interface";
import ReadMore from "@/components/ReadMore";
import Thumbnail from "@/components/Thumbnail";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DetailProps {
  params: { slug: string };
}

export default function Detail({ params }: DetailProps) {
  const [place, setPlace] = useState<Place | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch both in parallel for faster loading
        const [placeRes, placesRes] = await Promise.all([
          fetch(`https://mov-travel.vercel.app/api/places/${params.slug}`),
          fetch(`https://mov-travel.vercel.app/api/places`),
        ]);

        if (!placeRes.ok || !placesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const placeData = await placeRes.json();
        const placesData = await placesRes.json();

        setPlace(placeData);
        setPlaces(placesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 500); // Smooth transition
      }
    };

    if (params.slug) {
      fetchData();
    }
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-dvh items-center justify-center bg-white">
        <div className="w-16 h-16 relative animate-spin">
          <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-transparent border-t-p-blue border-l-p-blue"></div>
        </div>
        <p className="mt-4 text-gray-500 animate-pulse">
          Loading destination details...
        </p>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="flex flex-col min-h-dvh items-center justify-center bg-white px-6 text-center">
        <Image
          src="/svg/not-found.svg"
          alt="Not found"
          width={120}
          height={120}
          className="mb-6 opacity-60"
        />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Destination Not Found
        </h1>
        <BackButton
          customClass="px-6 py-3 bg-p-blue text-white rounded-xl font-medium"
          text="Go Back"
        />
      </div>
    );
  }

  const { imageSrc, title, description, location, rating, ratingCount, price } =
    place;

  return (
    <div className="flex flex-col min-h-dvh relative bg-white">
      <AnimatePresence>
        {booking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
            onClick={() => setBooking(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-6 mx-4 max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4">
                Book your trip to {title}
              </h2>
              <p className="text-gray-600 mb-4">
                Please select your preferred dates and number of people to
                continue with booking.
              </p>
              <div className="mb-6">
                <button
                  className="w-full h-14 rounded-xl bg-gradient-to-r from-p-blue to-blue-500 text-white text-lg font-medium shadow-md"
                  onClick={() => setBooking(false)}
                >
                  Continue Booking
                </button>
              </div>
              <button
                className="w-full text-gray-500 text-center py-2"
                onClick={() => setBooking(false)}
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative w-full h-[45vh]"
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

        <div className="fixed z-30 top-0 w-full max-w-screen-md">
          <div className="flex justify-between items-center px-6 pt-6 pb-4">
            <BackButton />
            <h1 className="text-xl font-medium text-white drop-shadow-md">
              Details
            </h1>
            <BookmarkButton />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative -mt-8 w-full bg-white flex flex-col px-6 py-6 rounded-t-3xl shadow-lg z-10"
      >
        <div className="flex w-full justify-between items-start my-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex-1"
          >
            <h1 className="text-2xl font-bold text-gray-800 md:text-3xl w-11/12">
              {title}
            </h1>
            <div className="flex items-center mt-1 text-gray-600">
              <svg
                className="w-4 h-4 mr-1 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <p className="text-sm">{location}</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-full overflow-hidden shadow-md border-2 border-p-blue/10"
          >
            <Image
              src={"/profile.png"}
              alt="Tour Guide"
              width={60}
              height={60}
              className="rounded-full"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex w-full justify-between py-4 mb-4 border-y border-gray-100"
        >
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-gray-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            <p className="text-gray-600 text-sm">{location}</p>
          </div>
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-yellow-500 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="font-medium">{rating}</span>
            <span className="text-gray-500 ml-1">({ratingCount})</span>
          </div>
          <div className="flex items-center text-p-blue font-semibold">
            <span className="text-xl">${price}</span>
            <span className="text-gray-500 text-sm ml-1">/person</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-lg font-semibold mb-3">Gallery</h2>
          <Thumbnail places={places} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="my-6"
        >
          <h2 className="text-lg font-semibold mb-3">About Destination</h2>
          <ReadMore text={description} maxLength={160} />
        </motion.div>

        <div className="h-24"></div>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-0 w-full max-w-screen-md py-5 px-6 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-20"
      >
        <button
          onClick={() => setBooking(true)}
          className="w-full h-14 rounded-xl bg-gradient-to-r from-p-blue to-blue-500 text-white text-lg font-medium shadow-md active:shadow-sm transform active:scale-[0.99] transition-all"
        >
          Book Now
        </button>
      </motion.div>
    </div>
  );
}
