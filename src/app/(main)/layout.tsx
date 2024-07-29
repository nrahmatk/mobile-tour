import Image from "next/image";
import Link from "next/link";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white p-3 border-t flex justify-around text-[#7D848D]">
        <Link href="/home" className="flex flex-col items-center">
          <Image src="/svg/Home.svg" alt="Home" width={24} height={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/calendar" className="flex flex-col items-center">
          <Image src="/svg/Calendar.svg" alt="Calendar" width={24} height={24} />
          <span className="text-xs mt-1">Calendar</span>
        </Link>
        <Link href="/search" className="flex flex-col items-center">
          <div className="flex justify-center items-center w-12 h-12 bg-p-blue rounded-full">
            <Image src="/svg/Search.svg" alt="Search" width={24} height={24} />
          </div>
        </Link>
        <Link href="/messages" className="flex flex-col items-center">
          <Image src="/svg/Chat.svg" alt="Messages" width={24} height={24} />
          <span className="text-xs mt-1">Messages</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center">
          <Image src="/svg/Profile.svg" alt="Profile" width={24} height={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </nav>
    </>
  );
}
