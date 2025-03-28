"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const onboardingData = [
  {
    imageSrc:
      "https://res.cloudinary.com/dszhu92hc/image/upload/t_800/v1743151246/onboard1_jbaxjj.webp",
    title: "Life is short and the world is",
    highlight: "wide",
    description:
      "At Friends tours and travel, we customize reliable and trustworthy educational tours to destinations all over the world.",
  },
  {
    imageSrc:
      "https://res.cloudinary.com/dszhu92hc/image/upload/t_800/v1743151677/onboard2_y3nbsb.webp",
    title: "It's a big world out there go",
    highlight: "explore",
    description:
      "To get the best of your adventure you just need to leave and go where you like. We are waiting for you.",
  },
  {
    imageSrc:
      "https://res.cloudinary.com/dszhu92hc/image/upload/t_800/v1743151765/onboard3_tet2j1.webp",
    title: "People don't take trips, trips take",
    highlight: "people",
    description:
      "To get the best of your adventure you just need to leave and go where you like. We are waiting for you.",
  },
];

export default function Onboarding() {
  const [currentPage, setCurrentPage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  // Track when all images are loaded
  useEffect(() => {
    if (imagesLoaded === onboardingData.length) {
      // All images are loaded
      setInitialLoading(false);
    }
  }, [imagesLoaded]);

  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      router.push("/signin");
    }
  };

  const { imageSrc, title, highlight, description } = onboardingData[currentPage];

  if (initialLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="animate-pulse flex space-x-2">
          <div className="w-3 h-3 bg-p-blue rounded-full"></div>
          <div className="w-3 h-3 bg-p-blue rounded-full"></div>
          <div className="w-3 h-3 bg-p-blue rounded-full"></div>
        </div>
        
        {/* Preload all images in the background */}
        <div className="hidden">
          {onboardingData.map((data, index) => (
            <Image
              key={index}
              src={data.imageSrc}
              alt="Preloading"
              width={1}
              height={1}
              onLoad={handleImageLoad}
              priority={true}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen items-center justify-between bg-white overflow-hidden">
      <button
        onClick={() => router.push("/signin")}
        className="z-10 absolute top-6 right-6 py-2 px-5 text-white text-sm font-medium bg-black/30 backdrop-blur-md rounded-full transition-all hover:bg-black/40"
      >
        Skip
      </button>

      {/* Preload images that aren't currently visible */}
      <div className="hidden">
        {onboardingData.map((data, index) => {
          if (index !== currentPage) {
            return (
              <Image
                key={index}
                src={data.imageSrc}
                alt="Preloading"
                width={1}
                height={1}
                priority={index === (currentPage + 1) % onboardingData.length}
              />
            );
          }
          return null;
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full"
          style={{ height: "55%" }}
        >
          <Image
            src={imageSrc}
            alt="Onboarding"
            fill
            priority
            quality={90}
            className="rounded-b-[40px] object-cover shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent rounded-b-[40px]"></div>
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