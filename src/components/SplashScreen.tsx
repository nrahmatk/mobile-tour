"use client";
import Image from "next/image";

const SplashScreen = () => {

  return (
    <div className="flex flex-col items-center justify-between min-h-dvh bg-p-blue p-4">
      <div className="flex-grow flex items-center justify-center">
        <Image src="/travel.svg" alt="Travel Icon" width={200} height={200} priority/>
      </div>
      <h1
        className="mb-10 text-white text-4xl"
        style={{ fontFamily: "Geometr415 Blk BT", color: "white" }}
      >
        Travel Test
      </h1>
    </div>
  );
};

export default SplashScreen;
