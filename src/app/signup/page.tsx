"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignIn = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white px-4 relative">
      <button
        className="absolute top-6 left-6 text-gray-600 p-3 rounded-full"
        onClick={() => router.back()}
      >
        <Image src="/svg/chevron-left.svg" alt="Back" width={24} height={24} />
      </button>
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-center">Sign up now</h1>
        <p className="text-gray-500 mb-8 text-center">
          Please fill the details and create account
        </p>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-4 mb-5 h-14 border-none rounded-xl bg-[#F7F7F9]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email address"
          className="w-full p-4 mb-5 h-14 border-none rounded-xl bg-[#F7F7F9]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-4 mb-5 h-14 border-none rounded-xl bg-[#F7F7F9]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="h-14 absolute inset-y-0 right-3 flex items-center justify-center"
            onClick={() => setShowPassword(!showPassword)}
            style={{ color: "#7D848D" }} // Warna tombol
          >
            {showPassword ? (
              <Image
                src="/svg/eye.svg"
                alt="Eye"
                width={24}
                height={24}
              />
            ) : (
              <Image
                src="/svg/eye-off.svg"
                alt="Eye"
                width={24}
                height={24}
              />
            )}
          </button>
        </div>
        <div className="flex justify-start mb-8">
          <p className="text-[#7D848D] text-base">Password must be 8 characters</p>
        </div>
        <button
          onClick={handleSignIn}
          className="w-full h-14 rounded-2xl bg-p-blue text-white py-3 text-lg"
        >
          Sign Up
        </button>
        <div className="text-center mb-6 text-[#707B81] mt-5">
          <p>
            Already have an account?{" "}
            <Link href="/signin" className="text-p-orange">
              Sign in
            </Link>
          </p>
        </div>
        <div className="text-center mb-6 text-[#707B81]">
          <p>Or connect</p>
        </div>
      </div>
      <div className="w-full bg-white p-4 flex justify-center space-x-4">
        <Link href="#">
          <Image src="/facebook.svg" alt="Facebook" width={40} height={40} />
        </Link>
        <Link href="#">
          <Image src="/instagram.svg" alt="Instagram" width={40} height={40} />
        </Link>
        <Link href="#">
          <Image src="/twitter.svg" alt="Twitter" width={40} height={40} />
        </Link>
      </div>
    </div>
  );
}
