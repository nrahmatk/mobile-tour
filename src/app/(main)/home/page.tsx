"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Place, User } from "@/components/Interface";
import FavoritePlaceCard from "@/components/FavoritePlaceCard";
import BestDestinationCard from "@/components/BestDestinationCard";

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [destinations, setDestinations] = useState<Place[]>([]);
  const [favoritePlaces, setFavoritePlaces] = useState<Place[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, destinationsRes, favoritePlacesRes] = await Promise.all(
          [
            axios.get("http://localhost:3000/api/user"),
            axios.get("http://localhost:3000/api/destinations"),
            axios.get("http://localhost:3000/api/places"),
          ]
        );

        setUser(userRes.data[0]);
        setDestinations(destinationsRes.data);
        setFavoritePlaces(favoritePlacesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!user) {
    return (
      <div className="w-scree h-screen flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:mx-80 mb-28">
      <header className="flex justify-between items-center mb-3 p-5">
        <div className="flex items-center space-x-2">
          <Image
            src={"/user/profile1.png"}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-p-black font-medium">{user.name}</span>
        </div>
        <button className="p-2 bg-[#F7F7F9] rounded-full">
          <Image
            src="/svg/bell.svg"
            alt="Notifications"
            width={24}
            height={24}
          />
        </button>
      </header>

      <section className="mb-6 px-5">
        <h1 className="text-3xl">Explore the</h1>
        <h1 className="text-3xl font-semibold">
          Beautiful <span className="text-p-orange">world!</span>
        </h1>
      </section>

      <section className="mb-6">
        <div className="flex justify-between items-center mb-1 px-5">
          <h2 className="text-lg font-medium">Best Destination</h2>
          <Link href="/destinations" className="text-p-orange">
            View all
          </Link>
        </div>
        <Swiper
          spaceBetween={5}
          slidesPerView={"auto"}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
          // modules={[Pagination]}
        >
          {destinations.map((destination, index) => (
            <SwiperSlide key={index}>
              <BestDestinationCard {...destination} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section>
        <h2 className="text-lg font-medium mb-4 mx-5">Favorite Places</h2>
        <div className=" grid grid-cols-2 gap-5 justify-items-center mx-5 lg:grid-cols-4 lg:gap-6">
          {favoritePlaces.map((place, index) => (
            <FavoritePlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
