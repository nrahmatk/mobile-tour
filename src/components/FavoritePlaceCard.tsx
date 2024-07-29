import Image from "next/image";
import Link from "next/link";

interface FavoritePlaceCardProps {
  place: {
    id: string;
    slug: string;
    imageSrc: string;
    title: string;
    location: string;
  };
}

export default function FavoritePlaceCard({ place }: FavoritePlaceCardProps) {
  const { id, slug, imageSrc, title, location } = place;

  return (
    <Link
      href={`/places/${slug}`}
      className="w-full flex flex-col items-center overflow-hidden"
    >
      <div className="relative w-40 h-36 lg:w-full lg:h-48">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="rounded-2xl object-cover"
        />
         <div className="absolute top-2 right-2">
          <div className="bg-white opacity-30 rounded-full w-8 h-8 absolute"></div>
          <button className="relative bg-transparent w-8 h-8 flex items-center justify-center">
            <Image
              src="/svg/health.svg"
              alt="Like"
              width={18}
              height={18}
            />
          </button>
        </div>
      </div>
      <div className="px-4 my-1">
        <h3 className="text-base mb-1">{title}</h3>
        <div className="flex">
          <Image src="/svg/map-pin.svg" alt="Map" width={16} height={16} />
          <p className="text-sm text-p-gray">{location}</p>
        </div>
      </div>
    </Link>
  );
}
