"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiBell,
  FiCheck,
  FiEdit2,
  FiUser,
  FiCalendar,
  FiCreditCard,
  FiSettings,
  FiHelpCircle,
  FiChevronRight,
  FiLogOut,
} from "react-icons/fi";

export default function Profile() {
  const { logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const profileSections = [
    {
      title: "Personal Information",
      icon: <FiUser size={24} className="text-gray-700" />,
      route: "#",
      description: "View and edit your personal details",
    },
    {
      title: "My Bookings",
      icon: <FiCalendar size={24} className="text-gray-700" />,
      route: "#",
      description: "Check your trip schedule and bookings",
    },
    {
      title: "Payment Methods",
      icon: <FiCreditCard size={24} className="text-gray-700" />,
      route: "#",
      description: "Manage your payment options",
    },
    {
      title: "Settings",
      icon: <FiSettings size={24} className="text-gray-700" />,
      route: "#",
      description: "App preferences and account settings",
    },
    {
      title: "Help & Support",
      icon: <FiHelpCircle size={24} className="text-gray-700" />,
      route: "#",
      description: "Get help with your account or bookings",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-white pb-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header
        className="relative bg-gradient-to-r from-p-blue to-blue-500 pt-12 pb-20 px-5 text-white rounded-b-3xl"
        variants={itemVariants}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <Link
            href="#"
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <FiBell size={20} />
          </Link>
        </div>

        <div className="flex items-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-white/20 overflow-hidden">
              <Image
                src="/user/profile1.png"
                alt="Profile picture"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full text-p-blue">
              <FiEdit2 size={16} />
            </button>
          </div>

          <div className="ml-4">
            <h2 className="text-xl font-bold">{"Test Nama"}</h2>
            <p className="text-white/80 text-sm">{"mail@example.com"}</p>
            <div className="flex items-center mt-1 bg-white/20 rounded-full px-3 py-1 text-xs">
              <FiCheck size={12} className="mr-1" />
              Premium Member
            </div>
          </div>
        </div>
      </motion.header>

      <motion.div className="px-5 -mt-10 relative z-10" variants={itemVariants}>
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 flex justify-around">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">12</p>
            <p className="text-xs text-gray-500">Trips</p>
          </div>
          <div className="border-r border-gray-200"></div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">5</p>
            <p className="text-xs text-gray-500">Bookmarks</p>
          </div>
          <div className="border-r border-gray-200"></div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">230</p>
            <p className="text-xs text-gray-500">Points</p>
          </div>
        </div>
      </motion.div>

      <motion.div className="px-5" variants={itemVariants}>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Account</h3>
        <div className="space-y-3">
          {profileSections.map((section, index) => (
            <motion.div
              key={section.title}
              variants={itemVariants}
              whileHover={{ x: 5 }}
              className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between"
            >
              <Link href={section.route} className="flex items-center flex-1">
                <div className="bg-gray-50 p-2.5 rounded-lg mr-4">
                  {section.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{section.title}</h4>
                  <p className="text-sm text-gray-500">{section.description}</p>
                </div>
              </Link>
              <FiChevronRight size={20} className="text-gray-400" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div className="px-5 mt-8" variants={itemVariants}>
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full h-14 rounded-xl border border-red-200 text-red-500 font-medium flex items-center justify-center"
        >
          <FiLogOut size={20} className="mr-2" />
          Sign out
        </button>
      </motion.div>

      {/* Logout confirmation modal */}
      {showLogoutConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-5"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-5">
              <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                <FiLogOut size={32} className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Sign Out</h3>
              <p className="text-gray-600 mt-2">
                Are you sure you want to sign out of your account?
              </p>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                onClick={logout}
                className="w-full h-12 rounded-xl bg-red-500 text-white font-medium"
              >
                Yes, Sign Out
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full h-12 rounded-xl border border-gray-200 text-gray-700 font-medium"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
