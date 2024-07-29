import BackButton from "@/components/BackButton";
import BookmarkButton from "@/components/BookmarkButton";
import { Place } from "@/components/Interface"; // pastikan tipe Place sudah didefinisikan
import ReadMore from "@/components/ReadMore";
import Thumbnail from "@/components/Thumbnail";
import Image from "next/image";

interface DetailProps {
  params: { slug: string };
}

const fetchData = async (slug: string): Promise<Place | null> => {
  try {
    const response = await fetch(`http://localhost:3000/api/places/${slug}`);
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const fetchPlaces = async (): Promise<Place[] | null> => {
  try {
    const response = await fetch(`http://localhost:3000/api/places`);
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export default async function Detail({ params }: DetailProps) {
  if (!params.slug) {
    return <p>Place not found</p>;
  }

  const place = await fetchData(params.slug);
  const places = await fetchPlaces();

  if (!place) {
    return <p>Place not found</p>;
  }

  const { imageSrc, title, description, location, rating, ratingCount, price } =
    place;

  return (
    <div className="flex flex-col h-screen items-center justify-between bg-white lg:mx-64">
      <div className="flex w-full z-50 justify-between absolute top-6 px-6">
        <BackButton/>
        <h1 className="h-full my-auto text-xl font-medium text-white">Details</h1>
        <BookmarkButton/>
      </div>
      <div className="absolute w-full h-2/5">
        <Image src={imageSrc} alt={title} fill className="object-cover" />
      </div>
      <div className="absolute top-80 w-full bg-white flex flex-col items-center px-6 py-4 rounded-t-3xl pb-24">
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex-1 ">
            <h1 className="text-2xl font-semibold text-gray-800 md:text-3xl w-11/12">
              {title}
            </h1>
            <p className="text-base">{location}</p>
          </div>
          <Image src={"/profile.png"} alt={title} width={60} height={60} />
        </div>
        <div className="flex w-full justify-between mb-6">
          <div className="flex-1">
            <p className="text-p-gray">{location}</p>
          </div>
          <div className="flex-1 text-center">
            {rating}
            <span className="text-p-gray"> ({ratingCount})</span>
          </div>
          <div className="flex-1 text-right text-p-blue">
            ${price}/<span className="text-p-gray">Person</span>
          </div>
        </div>
        <Thumbnail places={places?? []} />
        <div className="my-6">
          <p className="font-semibold text-xl">About Destination</p>
          <ReadMore text={description} maxLength={160} />
        </div>
      </div>
      <div className="fixed bottom-0 pb-5 p text-center bg-white w-full">
        <button className=" w-11/12 h-14 rounded-2xl bg-p-blue text-white text-lg">
          {/* <button className="w-full h-14 rounded-2xl bg-p-blue text-white text-lg"> */}
          Book Now
        </button>
      </div>
    </div>
  );
}
