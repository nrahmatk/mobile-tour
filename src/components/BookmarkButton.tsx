"use client";

import Image from "next/image";
import { useState } from "react";

export default function BookmarkButton() {
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <button
      className={`p-3 rounded-full bg-black bg-opacity-15`}
      onClick={handleBookmark}
    >
      <Image src="/svg/bookmark.svg" alt="Bookmark" width={24} height={24} />
    </button>
  );
}
