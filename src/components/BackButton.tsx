'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className="bg-black bg-opacity-15 p-3 rounded-full"
      onClick={() => router.back()}
    >
      <Image src="/svg/chevron-left-white.svg" alt="Back" width={24} height={24} />
    </button>
  );
}
