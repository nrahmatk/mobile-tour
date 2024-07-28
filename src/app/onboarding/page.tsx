'use client'
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const onboardingData = [
  {
    imageSrc: "/onboard1.png",
    title: "Life is short and the world is",
    highlight: "wide",
    description: "At Friends tours and travel, we customize reliable and trustworthy educational tours to destinations all over the world.",
  },
  {
    imageSrc: "/onboard2.jpeg",
    title: "It’s a big world out there go",
    highlight: "explore",
    description: "To get the best of your adventure you just need to leave and go where you like. we are waiting for you",
  },
  {
    imageSrc: "/onboard3.jpeg",
    title: "People don’t take trips, trips take",
    highlight: "people",
    description: "To get the best of your adventure you just need to leave and go where you like. we are waiting for you",
  },
];

export default function Onboarding() {
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      router.push("/signin");
    }
  };

  const { imageSrc, title, highlight, description } = onboardingData[currentPage];

  return (
    <div className="flex flex-col h-screen items-center justify-between bg-white lg:mx-64">
      <div className="relative w-full" style={{ height: "55%" }}>
        <Image
          src={imageSrc}
          alt="Onboarding"
          layout="fill"
          objectFit="cover"
          className="rounded-b-[30px]"
        />
      </div>
      <div className="flex flex-col items-center px-6 py-4 text-center">
        <h1 className="onboardText text-4xl font-bold text-gray-800 md:text-3xl w-11/12">
          {title} <span className="text-p-orange">{highlight}</span>
        </h1>
        <p className="onboardTextDesc mt-4 text-[#7D848D] text-2xl">
          {description}
        </p>
      </div>
      <div className="flex flex-col items-center w-full px-6 pb-8">
        <div className="flex space-x-1 mb-4">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`h-2 ${currentPage === index ? "w-9 bg-p-blue" : "w-3.5 bg-p-blue2"} rounded-full`}
            ></div>
          ))}
        </div>
        <button onClick={handleNext} className="w-full h-14 rounded-2xl bg-p-blue text-white py-3 text-lg lg:w-1/2">
          {currentPage === 0 ? "Get Started" : "Next"}
        </button>
      </div>
    </div>
  );
}
