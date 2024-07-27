// pages/index.tsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface DestinationCardProps {
  imageSrc: string;
  title: string;
  location: string;
  rating: number;
  avatarCount: number;
}

interface FavoritePlaceCardProps {
  imageSrc: string;
  title: string;
  location: string;
}

interface NavButtonProps {
  href: string;
  iconSrc: string;
  label: string;
}

interface User {
  name: string;
  avatar: string;
}

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [destinations, setDestinations] = useState<DestinationCardProps[]>([]);
  const [favoritePlaces, setFavoritePlaces] = useState<
    FavoritePlaceCardProps[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, destinationsRes, favoritePlacesRes] = await Promise.all(
          [
            axios.get("http://localhost:3001/user"),
            axios.get("http://localhost:3001/destinations"),
            axios.get("http://localhost:3001/favoritePlaces"),
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
            src={user.avatar || "https://avatar.iran.liara.run/public"}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-medium">{user.name}</span>
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
              <DestinationCard {...destination} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section>
        <h2 className="text-lg font-medium mb-4 mx-5">Favorite Places</h2>
        <div className=" grid grid-cols-2 gap-5 justify-items-center mx-5 lg:grid-cols-4 lg:gap-6">
          {favoritePlaces.map((place, index) => (
            <FavoritePlaceCard key={index} {...place} />
          ))}
        </div>
      </section>
    </div>
  );
};

const DestinationCard: React.FC<DestinationCardProps> = ({
  imageSrc,
  title,
  location,
  rating,
  avatarCount,
}) => {
  const avatars = [
    { src: "https://avatar.iran.liara.run/public/1" },
    { src: "https://avatar.iran.liara.run/public/2" },
    { src: "https://avatar.iran.liara.run/public/3" },
  ];
  return (
    <div className="w-full h-96 flex flex-col items-center justify-center ms-3">
      <div className="relative w-60 h-72">
        <Image
          src={imageSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>
      <div className="flex flex-col w-full py-3 px-4 justify-between">
        <div className="flex flex-row justify-between items-center mb-2">
          <h3 className="text-lg">{title}</h3>
          <div className="flex items-center">
            <Image src="/svg/Star.svg" alt="Rating" width={16} height={16} />
            <p className="text-yellow-500 font-medium text-lg ml-1">{rating}</p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-1 items-center">
            <div className="w-4 h-4">
              <Image src="/svg/map-pin.svg" alt="Map" width={16} height={16} />
            </div>
            <p className="text-p-gray text-sm">{location}</p>
          </div>
          <div className="flex flex-row items-center justify-end w-14">
            <div className="relative w-7 h-7">
              {avatars.map((avatar, index) => (
                <Image
                  key={index}
                  src={avatar.src}
                  alt="Avatar"
                  width={16}
                  height={16}
                  className={`absolute w-4 h-4 rounded-full`}
                  style={{
                    right: (index + 1) * 15,
                    zIndex: avatars.length - index,
                  }}
                />
              ))}
              <span className="absolute right-0 text-xs flex items-center justify-center w-7 h-7 bg-slate-300 text-p-gray rounded-full z-10">
                +{avatarCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FavoritePlaceCard: React.FC<FavoritePlaceCardProps> = ({
  imageSrc,
  title,
  location,
}) => {
  return (
    <div className="w-full flex flex-col items-center overflow-hidden">
      <div className="relative w-40 h-36 lg:w-full lg:h-48">
        <Image
          src={imageSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>
      <div className="px-4 my-1">
        <h3 className="text-base mb-1">{title}</h3>
        <div className="flex">
          <Image src="/svg/map-pin.svg" alt="Map" width={16} height={16} />
          <p className="text-sm text-p-gray">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
