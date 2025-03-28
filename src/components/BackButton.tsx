"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BackButton({
  customClass = "bg-black bg-opacity-15 p-3 rounded-full",
  text,
}: {
  customClass?: string;
  text?: string;
}) {
  const router = useRouter();
  return (
    <button className={customClass} onClick={() => router.back()}>
      <Image
        src="/svg/chevron-left-white.svg"
        alt="Back"
        width={24}
        height={24}
      />
      {text}
    </button>
  );
}
