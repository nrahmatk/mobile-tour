'use client'
import SplashScreen from "@/components/SplashScreen";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();


  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        router.push('/home');
      } else {
        router.push('/onboarding');
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isLoggedIn, router]);

  return (
    <>
      <SplashScreen />
    </>
  );
}
