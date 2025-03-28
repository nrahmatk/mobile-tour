"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isWithinInterval, addDays } from "date-fns";

type EventType = {
  id: string;
  title: string;
  date: Date;
  location: string;
  type: 'tour' | 'hotel' | 'flight';
  status: 'upcoming' | 'completed' | 'cancelled';
};

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  // Generate some sample events
  useEffect(() => {
    setLoading(true);
    
    // Mock API call for events
    setTimeout(() => {
      const today = new Date();
      const sampleEvents: EventType[] = [
        {
          id: '1',
          title: 'Bali Beach Tour',
          date: addDays(today, 2),
          location: 'Bali, Indonesia',
          type: 'tour',
          status: 'upcoming'
        },
        {
          id: '2',
          title: 'Hotel Check-in',
          date: addDays(today, 2),
          location: 'Grand Hyatt, Bali',
          type: 'hotel',
          status: 'upcoming'
        },
        {
          id: '3',
          title: 'Flight to Bangkok',
          date: addDays(today, 7),
          location: 'Ngurah Rai Airport',
          type: 'flight',
          status: 'upcoming'
        },
        {
          id: '4',
          title: 'Temple Tour',
          date: addDays(today, -5),
          location: 'Bangkok, Thailand',
          type: 'tour',
          status: 'completed'
        }
      ];
      
      setEvents(sampleEvents);
      setLoading(false);
    }, 800);
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  // Get days of current month
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get events for selected date
  const selectedDateEvents = selectedDate 
    ? events.filter(event => isSameDay(event.date, selectedDate))
    : [];

  // Generate calendar days with proper padding for start of month
  const startDayOfWeek = monthStart.getDay();
  const calendarDays = Array(startDayOfWeek).fill(null).concat(daysInMonth);

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

  if (loading) {
    return (
      <div className="min-h-dvh flex flex-col justify-center items-center bg-white">
        <div className="w-10 h-10 border-4 border-p-blue border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 animate-pulse">Loading your schedule...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-dvh bg-white pb-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header 
        className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-5 py-4 flex justify-between items-center border-b border-gray-100"
        variants={itemVariants}
      >
        <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
        <div className="flex space-x-2">
          <motion.button 
            className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </motion.button>
          <motion.button 
            className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
            </svg>
          </motion.button>
        </div>
      </motion.header>

      <motion.div className="px-5 py-4" variants={itemVariants}>
        <div className="flex items-center justify-between mb-6">
          <motion.button 
            onClick={handlePrevMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </motion.button>
          <h2 className="text-xl font-semibold text-gray-800">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <motion.button 
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </motion.button>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            if (!day) {
              return <div key={`empty-${index}`} className="h-12 rounded-lg"></div>;
            }

            const hasEvent = events.some(event => isSameDay(event.date, day));
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isCurrentDay = isToday(day);

            return (
              <motion.button
                key={day.toString()}
                onClick={() => handleDateClick(day)}
                className={`h-12 rounded-lg flex flex-col items-center justify-center relative ${
                  isSelected 
                    ? 'bg-p-blue text-white' 
                    : isCurrentDay 
                      ? 'bg-blue-50 text-p-blue' 
                      : 'hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={`text-sm ${isSelected ? 'font-bold' : ''}`}>
                  {format(day, 'd')}
                </span>
                {hasEvent && (
                  <div className={`w-1.5 h-1.5 rounded-full mt-0.5 ${isSelected ? 'bg-white' : 'bg-p-orange'}`}></div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <motion.div className="mt-6 px-5" variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {selectedDate 
              ? `Events on ${format(selectedDate, 'MMMM d, yyyy')}` 
              : 'Upcoming Events'}
          </h3>
          {selectedDate && (
            <motion.button
              onClick={() => setSelectedDate(null)}
              className="text-sm text-p-blue"
              whileTap={{ scale: 0.95 }}
            >
              Show all
            </motion.button>
          )}
        </div>

        <div className="space-y-4">
          {(selectedDate ? selectedDateEvents : events).length > 0 ? (
            (selectedDate ? selectedDateEvents : events)
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map((event) => (
                <motion.div 
                  key={event.id}
                  className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
                  whileHover={{ y: -2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start">
                    <div className={`p-2.5 rounded-lg mr-3 ${
                      event.type === 'tour' ? 'bg-green-100' : 
                      event.type === 'hotel' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      {event.type === 'tour' ? (
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      ) : event.type === 'hotel' ? (
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-semibold text-gray-800">{event.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          event.status === 'upcoming' ? 'bg-blue-50 text-blue-700' : 
                          event.status === 'completed' ? 'bg-green-50 text-green-700' : 
                          'bg-red-50 text-red-700'
                        }`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center mt-1 text-gray-500 text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        {format(event.date, 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center mt-1 text-gray-500 text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        {event.location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-20 h-20 mb-4 opacity-50">
                <Image src="/svg/calendar-empty.svg" alt="No events" width={80} height={80} />
              </div>
              <p className="text-gray-500 mb-2">
                {selectedDate ? "No events scheduled for this day" : "No upcoming events found"}
              </p>
              <motion.button
                className="text-p-blue font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                + Add New Event
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}