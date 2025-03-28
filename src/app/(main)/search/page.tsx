"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Place } from "@/components/Interface";
import axios from "axios";

export default function Search() {
  const [query, setQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([
    "Reservoir", "Resort", "Villa", "Beach"
  ]);
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [destinations, setDestinations] = useState<Place[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([
    "Reservoir", "Villa", "Resort", "Mexico", "Island"
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showClearButton, setShowClearButton] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch all destinations on component mount
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get("/api/destinations");
        setDestinations(response.data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };
    
    fetchDestinations();
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    // Save to search history (avoid duplicates)
    if (!searchHistory.includes(searchQuery)) {
      setSearchHistory(prev => [searchQuery, ...prev].slice(0, 5));
    }

    // Filter destinations based on search query
    setTimeout(() => {
      const filteredResults = destinations.filter(dest => 
        dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(filteredResults);
      setIsLoading(false);
    }, 500); // Shorter timeout for better UX
  };

  const clearSearch = () => {
    setQuery("");
    setSearchResults([]);
    setShowClearButton(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowClearButton(!!value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const removeFromHistory = (index: number) => {
    setSearchHistory(prev => prev.filter((_, i) => i !== index));
  };

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

  return (
    <motion.div 
      className="min-h-dvh bg-white pb-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="sticky top-0 z-10 bg-white px-5 py-4 shadow-sm"
        variants={itemVariants}
      >
        <div className="flex items-center gap-3">
          <Link href="/home" className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </Link>
          
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            
            <input
              ref={inputRef}
              type="text"
              placeholder="Search destinations..."
              className="w-full pl-10 pr-10 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-200 focus:bg-white focus:outline-none transition-all"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            
            {showClearButton && (
              <button 
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={clearSearch}
              >
                <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>
          
          <motion.button 
            className="bg-p-blue text-white px-4 py-3 rounded-xl font-medium shadow-sm"
            onClick={() => handleSearch()}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : "Search"}
          </motion.button>
        </div>
      </motion.div>

      <div className="px-5 py-4">
        <AnimatePresence mode="wait">
          {searchResults.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Search Results</h2>
                <span className="text-sm text-gray-500">{searchResults.length} found</span>
              </div>
              
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {searchResults.map((place) => (
                  <motion.div
                    key={place.slug}
                    variants={itemVariants}
                    className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Link href={`/places/${place.slug}`} className="flex h-28">
                      <div className="relative w-28 h-full">
                        <Image 
                          src={place.imageSrc} 
                          alt={place.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 p-3">
                        <h3 className="font-medium text-gray-800">{place.title}</h3>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          {place.location}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <span className="ml-1 text-sm font-medium">{place.rating}</span>
                            <span className="ml-1 text-xs text-gray-400">({place.ratingCount})</span>
                          </div>
                          {place.price && (
                            <span className="text-p-blue font-semibold">${place.price}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="suggestions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {searchHistory.length > 0 && (
                <motion.div className="mb-8" variants={itemVariants}>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold text-gray-800">Recent Searches</h2>
                    <button 
                      className="text-sm text-p-blue"
                      onClick={() => setSearchHistory([])}
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-3">
                    {searchHistory.map((item, index) => (
                      <motion.div 
                        key={`history-${index}`}
                        className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <button 
                          className="flex items-center text-gray-700"
                          onClick={() => {
                            setQuery(item);
                            setShowClearButton(true);
                            handleSearch(item);
                          }}
                        >
                          <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          {item}
                        </button>
                        <button 
                          className="text-gray-400 hover:text-gray-600"
                          onClick={() => removeFromHistory(index)}
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Popular Destinations</h2>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((item, index) => (
                    <motion.button
                      key={`popular-${index}`}
                      className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-full text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setQuery(item);
                        setShowClearButton(true);
                        handleSearch(item);
                      }}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {query && searchResults.length === 0 && !isLoading && (
                <motion.div className="mt-8 text-center py-6" variants={itemVariants}>
                  <div className="mx-auto w-24 h-24 mb-4 opacity-40">
                    <Image 
                      src="/svg/search-cross.svg" 
                      alt="No results" 
                      width={96} 
                      height={96}
                    />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-1">No results found</h3>
                  <p className="text-gray-500 text-sm">Try different keywords or browse popular destinations</p>
                </motion.div>
              )}
              
              {!query && (
                <motion.div className="mt-10 text-center py-8" variants={itemVariants}>
                  <div className="mx-auto w-32 h-32 mb-4 opacity-40">
                    <Image 
                      src="/svg/search-5.svg" 
                      alt="Search" 
                      width={128} 
                      height={128}
                    />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-1">Search for destinations</h3>
                  <p className="text-gray-500 text-sm mb-4">Discover amazing places for your next adventure</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}