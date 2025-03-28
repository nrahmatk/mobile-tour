"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/signin");
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-white px-6 py-8 relative overflow-hidden">
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-6 left-6 text-gray-600 p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-all"
        onClick={() => router.back()}
        whileTap={{ scale: 0.95 }}
      >
        <Image src="/svg/chevron-left.svg" alt="Back" width={24} height={24} />
      </motion.button>

      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-3xl font-bold mb-2 text-center text-gray-800"
        >
          Sign up now
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-gray-500 mb-10 text-center"
        >
          Please fill the details and create account
        </motion.p>

        <motion.div variants={itemVariants}>
          <label
            htmlFor="name"
            className="text-sm text-gray-600 font-medium ml-2 mb-1 block"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            className="w-full p-4 mb-6 h-14 border-none rounded-xl bg-[#F7F7F9] focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all shadow-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label
            htmlFor="email"
            className="text-sm text-gray-600 font-medium ml-2 mb-1 block"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full p-4 mb-6 h-14 border-none rounded-xl bg-[#F7F7F9] focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="relative mb-2">
          <label
            htmlFor="password"
            className="text-sm text-gray-600 font-medium ml-2 mb-1 block"
          >
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a secure password"
            className="w-full p-4 mb-2 h-14 border-none rounded-xl bg-[#F7F7F9] focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all shadow-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="h-14 absolute inset-y-0 right-3 top-6 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <Image
                src="/svg/eye.svg"
                alt="Hide password"
                width={22}
                height={22}
              />
            ) : (
              <Image
                src="/svg/eye-off.svg"
                alt="Show password"
                width={22}
                height={22}
              />
            )}
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="w-5 h-5 mr-2 bg-[#F7F7F9] border border-gray-300 rounded flex items-center justify-center cursor-pointer"
            >
              <div className="w-3 h-3 bg-p-blue rounded opacity-0 hover:opacity-20 transition-opacity"></div>
            </motion.div>
          </div>
          <p className="text-sm text-gray-500">
            Password must be at least 8 characters with a mix of letters,
            numbers & symbols
          </p>
        </motion.div>

        <motion.button
          variants={itemVariants}
          whileTap={{ scale: 0.98 }}
          whileHover={{ boxShadow: "0 4px 12px rgba(66, 133, 244, 0.25)" }}
          onClick={handleSignUp}
          disabled={isSubmitting}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-p-blue to-blue-500 text-white font-medium text-lg shadow-md hover:shadow-lg active:shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Creating account...
            </div>
          ) : (
            "Sign Up"
          )}
        </motion.button>

        <motion.div
          variants={itemVariants}
          className="text-center mb-8 text-gray-500 mt-6"
        >
          <p>
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-p-orange font-medium hover:text-orange-600 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-200"></div>
          <p className="mx-4 text-gray-500 text-sm">Or sign up with</p>
          <div className="flex-grow h-px bg-gray-200"></div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-xs flex justify-center space-x-5 mt-2"
      >
        {[
          { src: "/facebook.svg", alt: "Facebook" },
          { src: "/instagram.svg", alt: "Instagram" },
          { src: "/twitter.svg", alt: "Twitter" },
        ].map((social) => (
          <motion.div
            key={social.alt}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="bg-gray-50 p-3 rounded-full shadow-sm hover:shadow-md transition-all"
          >
            <Link href="#">
              <Image src={social.src} alt={social.alt} width={32} height={32} />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
