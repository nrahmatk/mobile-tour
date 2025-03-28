"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiChevronLeft, FiMoreVertical, FiCheck, FiSend, FiMessageCircle } from "react-icons/fi";

type ChatType = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
};

export default function Messages() {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Simulate API call
    const loadChats = setTimeout(() => {
      const mockChats: ChatType[] = [
        {
          id: "1",
          name: "Sarah Johnson",
          avatar: "/user/profile1.png",
          lastMessage: "Perfect! I'll see you at the hotel lobby tomorrow at 9am.",
          timestamp: "10:42 AM",
          unread: 2,
          isOnline: true
        },
        {
          id: "2",
          name: "Bali Tour Guide",
          avatar: "/user/1.png",
          lastMessage: "Your tour package is confirmed. We'll send you details shortly.",
          timestamp: "Yesterday",
          unread: 0,
          isOnline: true
        },
        {
          id: "3",
          name: "Resort Booking Support",
          avatar: "/user/2.png",
          lastMessage: "Thank you for your reservation! Your booking ID is BK12345.",
          timestamp: "Mar 25",
          unread: 0,
          isOnline: false
        },
        {
          id: "4",
          name: "Michael Chen",
          avatar: "/user/3.png",
          lastMessage: "Hey! Are you still interested in the island hopping tour?",
          timestamp: "Mar 24",
          unread: 3,
          isOnline: false
        },
        {
          id: "5",
          name: "Emma Wilson",
          avatar: "/user/1.png",
          lastMessage: "I can recommend some great restaurants in the area.",
          timestamp: "Mar 22",
          unread: 0,
          isOnline: true
        }
      ];
      
      setChats(mockChats);
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(loadChats);
  }, []);

  const filteredChats = chats.filter(chat => {
    // Filter by search query
    const nameMatches = chat.name.toLowerCase().includes(query.toLowerCase());
    const messageMatches = chat.lastMessage.toLowerCase().includes(query.toLowerCase());
    const matchesQuery = nameMatches || messageMatches;
    
    // Filter by read/unread status
    if (selectedFilter === 'unread') return chat.unread > 0 && matchesQuery;
    if (selectedFilter === 'read') return chat.unread === 0 && matchesQuery;
    return matchesQuery;
  });

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

  if (isLoading) {
    return (
      <div className="min-h-dvh flex flex-col justify-center items-center bg-white">
        <div className="w-16 h-16 relative animate-spin">
          <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-transparent border-t-p-blue border-l-p-blue"></div>
        </div>
        <p className="mt-4 text-gray-500 animate-pulse">Loading conversations...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-dvh bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header 
        className="sticky top-0 z-20 bg-white px-5 py-4 border-b border-gray-100"
        variants={itemVariants}
      >
        <div className="flex items-center justify-between">
          <Link href="/home" className="p-2 -ml-2">
            <FiChevronLeft size={24} className="text-gray-800" />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Messages</h1>
          <button className="p-2">
            <FiMoreVertical size={24} className="text-gray-700" />
          </button>
        </div>
      </motion.header>

      <motion.div className="px-5 py-3" variants={itemVariants}>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <FiSearch size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full bg-gray-50 py-3 pl-10 pr-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-p-blue/20 focus:bg-white transition-colors"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </motion.div>

      <motion.div className="px-5 py-2 flex space-x-2" variants={itemVariants}>
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedFilter === 'all' 
              ? 'bg-p-blue text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedFilter('unread')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedFilter === 'unread' 
              ? 'bg-p-blue text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Unread
        </button>
        <button
          onClick={() => setSelectedFilter('read')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedFilter === 'read' 
              ? 'bg-p-blue text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Read
        </button>
      </motion.div>

      <motion.div className="px-5 mt-2" variants={itemVariants}>
        {filteredChats.length > 0 ? (
          <div className="space-y-2">
            {filteredChats.map((chat) => (
              <motion.div
                key={chat.id}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                className={`p-3 rounded-xl transition-colors ${
                  chat.unread > 0 ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
              >
                <Link href="#" className="flex items-start">
                  <div className="relative">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden">
                      <Image 
                        src={chat.avatar} 
                        alt={chat.name} 
                        width={56} 
                        height={56}
                        className="object-cover"
                      />
                    </div>
                    {chat.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-800">{chat.name}</h3>
                      <span className="text-xs text-gray-500">{chat.timestamp}</span>
                    </div>
                    <p className={`text-sm mt-1 ${chat.unread > 0 ? 'text-gray-800' : 'text-gray-500'} line-clamp-2`}>
                      {chat.lastMessage}
                    </p>
                  </div>
                  
                  {chat.unread > 0 && (
                    <div className="ml-2 bg-p-blue text-white text-xs font-bold min-w-[20px] h-5 rounded-full flex items-center justify-center">
                      {chat.unread}
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-50">
              <FiMessageCircle size={40} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-1">No messages found</h3>
            <p className="text-gray-500 text-sm mb-6">
              {query 
                ? "No messages match your search criteria" 
                : "Start a conversation or check back later"}
            </p>
            <Link href="/home" 
              className="inline-flex items-center px-6 py-3 bg-p-blue text-white font-medium rounded-xl shadow-sm"
            >
              Explore Tours
            </Link>
          </div>
        )}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed right-5 bottom-20 z-10"
      >
        <Link 
          href="/messages/new" 
          className="w-14 h-14 flex items-center justify-center rounded-full bg-p-blue text-white shadow-lg"
        >
          <FiSend size={24} />
        </Link>
      </motion.div>
    </motion.div>
  );
}