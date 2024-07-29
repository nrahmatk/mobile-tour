import Image from "next/image";
import { Place } from "./Interface";

interface Places {
  places: Place[]
}


const Thumbnail = ({ places }: Places) => {
  const maxDisplay = 5;
  const remaining = places.length - maxDisplay;
  const displayPlaces = places.slice(0, maxDisplay - 1);
  const fifthPlace = places[maxDisplay - 1];

  return (
    <div className="flex flex-row w-full justify-between">
      {displayPlaces.map((place, index) => (
        <div
          key={index}
          className="relative w-14 h-14 rounded-2xl overflow-hidden"
        >
          <Image
            src={place.imageSrc}
            alt={place.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      ))}
      {places.length > maxDisplay ? (
        <div className="relative w-14 h-14 rounded-2xl overflow-hidden">
          <Image
            src={fifthPlace.imageSrc}
            alt={fifthPlace.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-sm font-bold">
            +{remaining}
          </div>
        </div>
      ) : (
        places.length === maxDisplay && (
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden">
            <Image
              src={fifthPlace.imageSrc}
              alt={fifthPlace.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        )
      )}
    </div>
  );
};

export default Thumbnail;
