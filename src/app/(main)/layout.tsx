"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Function to check if a path is active
  const isActive = (path: string) => {
    if (path === "/home" && pathname === "/") return true;
    return pathname.startsWith(path);
  };

  const navItems = [
    { path: "/home", label: "Home", icon: "/svg/Home.svg", activeIcon: "/svg/Home.svg" },
    { path: "/calendar", label: "Calendar", icon: "/svg/Calendar.svg", activeIcon: "/svg/Calendar.svg" },
    { path: "/search", label: "Search", icon: "/svg/Search.svg", activeIcon: "/svg/Search.svg", centerIcon: true },
    { path: "/messages", label: "Messages", icon: "/svg/Chat.svg", activeIcon: "/svg/Chat.svg" },
    { path: "/profile", label: "Profile", icon: "/svg/Profile.svg", activeIcon: "/svg/Profile.svg" },
  ];

  return (
    <div className="pb-20">
      {children}
      <nav className="max-w-screen-md fixed bottom-0 w-full z-50 bg-white pt-3 pb-3 px-2 border-t border-gray-100 flex justify-around items-center shadow-[0_-1px_5px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => (
          <Link 
            key={item.path}
            href={item.path} 
            className={`relative flex flex-col items-center ${item.centerIcon ? "" : "px-2 py-1"}`}
          >
            {item.centerIcon ? (
              <motion.div 
                className="flex justify-center items-center w-12 h-12 bg-gradient-to-r from-p-blue to-blue-500 rounded-full shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image 
                  src={item.icon} 
                  alt={item.label} 
                  width={24} 
                  height={24} 
                  className=""
                />
              </motion.div>
            ) : (
              <>
                <div className="relative">
                  <Image 
                    src={isActive(item.path) ? item.activeIcon : item.icon} 
                    alt={item.label} 
                    width={24} 
                    height={24} 
                  />
                  {item.path === "/messages" && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </div>
                <span className={`text-xs mt-1 font-medium ${
                  isActive(item.path) ? "text-p-blue" : "text-[#7D848D]"
                }`}>
                  {item.label}
                </span>
                {isActive(item.path) && !item.centerIcon && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -bottom-3 w-5 h-1 bg-p-blue rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}