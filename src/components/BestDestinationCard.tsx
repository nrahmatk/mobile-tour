import Image from "next/image";
import { Place } from "./Interface";
import Link from "next/link";

export default function BestDestinationCard({
  imageSrc,
  title,
  location,
  rating,
  ratingCount,
  slug
}: Place) {
  const avatars = [
    { src: "/user/1.png" },
    { src: "/user/2.png" },
    { src: "/user/3.png" },
  ];
  return (
    <Link
      href={`/places/${slug}`}
      className="w-full flex flex-col items-center overflow-hidden"
    >
      <div className="w-full h-96 flex flex-col items-center justify-center ms-3">
        <div className="relative w-60 h-72">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="rounded-2xl object-cover"
          />
          <div className="absolute top-3 right-3 h-10 w-10">
            <Image
              src="/svg/bookmark.svg"
              alt="bookmark"
              width={20}
              height={20}
              className="bg-black rounded-full bg-opacity-20 p-1.5"
            />
          </div>
        </div>
        <div className="flex flex-col w-full py-3 px-4 justify-between">
          <div className="flex flex-row justify-between items-center mb-2">
            <h3 className="text-p-black text-lg">{title}</h3>
            <div className="flex items-center h-4">
              <Image src="/svg/Star.svg" alt="Rating" width={16} height={16} />
              <p className="text-p-black text-base ml-1">{rating}</p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row gap-1 items-center">
              <div className="w-4 h-4">
                <Image
                  src="/svg/map-pin.svg"
                  alt="Map"
                  width={16}
                  height={16}
                />
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
                  +{ratingCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
