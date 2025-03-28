"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Place, User } from "@/components/Interface";
import FavoritePlaceCard from "@/components/FavoritePlaceCard";
import BestDestinationCard from "@/components/BestDestinationCard";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [destinations, setDestinations] = useState<Place[]>([]);
  const [favoritePlaces, setFavoritePlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [userRes, destinationsRes, favoritePlacesRes] = await Promise.all([
          axios.get("/api/user"),
          axios.get("/api/destinations"),
          axios.get("/api/places"),
        ]);

        setUser(userRes.data[0]);
        setDestinations(destinationsRes.data);
        setFavoritePlaces(favoritePlacesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <div className="h-screen flex flex-col justify-center items-center bg-white">
        <div className="w-16 h-16 relative animate-spin">
          <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-transparent border-t-p-blue border-l-p-blue"></div>
        </div>
        <p className="mt-4 text-gray-500 animate-pulse">Loading amazing destinations...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen mb-28 bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header 
        className="flex justify-between items-center p-5 sticky top-0 z-10 bg-white/80 backdrop-blur-md"
        variants={itemVariants}
      >
        <div className="flex items-center space-x-3">
          <div className="relative overflow-hidden rounded-full ring-2 ring-p-blue/20">
            <Image
              src={"/user/profile1.png"}
              alt="User Avatar"
              width={44}
              height={44}
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs">Welcome back</span>
            <span className="text-p-black font-semibold">{user?.name}</span>
          </div>
        </div>
        <motion.button 
          className="p-2.5 bg-[#F7F7F9] rounded-full hover:bg-gray-100 transition-colors shadow-sm"
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src="/svg/bell.svg"
            alt="Notifications"
            width={22}
            height={22}
          />
        </motion.button>
      </motion.header>

      <motion.section className="mb-8 px-5" variants={itemVariants}>
        <h1 className="text-3xl text-gray-700">Explore the</h1>
        <h1 className="text-3xl font-bold text-gray-900">
          Beautiful <span className="text-p-orange bg-gradient-to-r from-p-orange to-amber-500 bg-clip-text text-transparent">world!</span>
        </h1>
      </motion.section>

      <motion.section 
        className="relative mb-10 overflow-visible"
        variants={itemVariants}
      >
        <div className="flex justify-between items-center mb-3 px-5">
          <h2 className="text-xl font-semibold text-gray-800">Best Destinations</h2>
          <Link 
            href="#" 
            className="text-p-orange font-medium flex items-center hover:text-amber-600 transition-colors"
          >
            View all
            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        
        <Swiper
          spaceBetween={16}
          slidesPerView={"auto"}
          centeredSlides={false}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="destinationSwiper pl-5"
          style={{
            paddingBottom: "40px",
          }}
        >
          {destinations.map((destination, index) => (
            <SwiperSlide key={destination.id || index} style={{ width: 'auto', maxWidth: '85%' }}>
              <motion.div 
                initial={{ scale: 0.95, opacity: 0.8 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <BestDestinationCard {...destination} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.section>

      <motion.section variants={itemVariants}>
        <div className="flex justify-between items-center mb-4 px-5">
          <h2 className="text-xl font-semibold text-gray-800">Favorite Places</h2>
          <Link 
            href="#" 
            className="text-p-orange font-medium flex items-center hover:text-amber-600 transition-colors"
          >
            View all
            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-4 px-5 lg:grid-cols-4 lg:gap-6">
          {favoritePlaces.map((place, index) => (
            <motion.div
              key={place.id || index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <FavoritePlaceCard place={place} />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;