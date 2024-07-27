"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/onboarding"); // Replace "/home" with the desired page to navigate after the splash screen
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-p-blue p-4">
      <div className="flex-grow flex items-center justify-center">
        <Image src="/travel.svg" alt="Travel Icon" width={200} height={200} />
      </div>
      <h1
        className="mb-4 text-white text-4xl"
        style={{ fontFamily: "Geometr415 Blk BT", color: "white" }}
      >
        Travenor
      </h1>
    </div>
  );
};

export default SplashScreen;
