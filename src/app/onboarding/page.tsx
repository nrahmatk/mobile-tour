"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const onboardingData = [
  {
    imageSrc: "/onboard1.svg",
    title: "Life is short and the world is",
    highlight: "wide",
    description:
      "At Friends tours and travel, we customize reliable and trustworthy educational tours to destinations all over the world.",
  },
  {
    imageSrc: "/onboard2.svg",
    title: "It's a big world out there go",
    highlight: "explore",
    description:
      "To get the best of your adventure you just need to leave and go where you like. We are waiting for you.",
  },
  {
    imageSrc: "/backpack.svg",
    title: "People don't take trips, trips take",
    highlight: "people",
    description:
      "To get the best of your adventure you just need to leave and go where you like. We are waiting for you.",
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

  const { imageSrc, title, highlight, description } =
    onboardingData[currentPage];

  return (
    <div className="flex flex-col min-h-dvh items-center justify-between bg-white overflow-hidden">
      <button
        onClick={() => router.push("/signin")}
        className="z-10 absolute top-6 right-6 py-2 px-5 text-white text-sm font-medium bg-black/30 backdrop-blur-md rounded-full transition-all hover:bg-black/40"
      >
        Skip
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full overflow-hidden rounded-b-[40px]"
          style={{ height: "45vh" }}
        >
          <Image
            src={imageSrc}
            alt={`Onboarding slide ${currentPage + 1}`}
            fill
            priority
            quality={90}
            className="object-cover shadow-lg scale-[1.3]"
          />
        </motion.div>
      </AnimatePresence>

      <motion.div
        key={`content-${currentPage}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center px-8 py-6 text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 md:text-4xl tracking-tight">
          {title}{" "}
          <span className="text-p-orange font-extrabold bg-gradient-to-r from-p-orange to-amber-500 bg-clip-text text-transparent">
            {highlight}
          </span>
        </h1>
        <p className="mt-4 text-gray-600 text-lg leading-relaxed max-w-md">
          {description}
        </p>
      </motion.div>

      <div className="flex flex-col items-center w-full px-8 pb-12 space-y-6">
        <div className="flex space-x-2">
          {onboardingData.map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0.5 }}
              animate={{
                opacity: 1,
                width: currentPage === index ? "2.25rem" : "0.75rem",
                backgroundColor:
                  currentPage === index ? "var(--p-blue)" : "var(--p-blue2)",
              }}
              transition={{ duration: 0.3 }}
              className={`h-2 rounded-full cursor-pointer`}
              onClick={() => setCurrentPage(index)}
            ></motion.div>
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleNext}
          className="w-full md:w-2/3 lg:w-1/2 h-14 rounded-2xl bg-gradient-to-r from-p-blue to-blue-500 text-white font-medium text-lg shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all"
        >
          {currentPage === onboardingData.length - 1 ? "Get Started" : "Next"}
        </motion.button>
      </div>
    </div>
  );
}
