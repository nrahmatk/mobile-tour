'use client'
import React, { useState } from "react";

interface ReadMoreProps {
  text: string;
  maxLength: number;
}

const ReadMore: React.FC<ReadMoreProps> = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded ? text : text.slice(0, maxLength);

  return (
    <div>
      <p className="text-[#7D848D] text-lg mt-3">
        {displayText}
        {!isExpanded && text.length > maxLength && '...'}
        <button onClick={toggleReadMore} className="text-p-orange ms-2">
          {isExpanded ? "Show Less" : "Read More"}
        </button>
      </p>
    </div>
  );
};

export default ReadMore;
