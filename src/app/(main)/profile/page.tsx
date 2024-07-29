"use client";

import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { logout } = useAuth();
  
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <button
        onClick={logout}
        className="w-full mx-5 h-14 rounded-2xl bg-p-blue text-white py-3 text-lg"
      >
        Sign out
      </button>
    </div>
  );
}
