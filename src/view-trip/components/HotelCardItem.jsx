import { GetPlaceDetails } from "@/sevice/GlobalApi";
import React, { useEffect, useState } from "react";

function HotelCardItem({ hotel, index }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (hotel) {
      GetPlacePhoto();
    }
  }, [hotel]);

  const GetPlacePhoto = async () => {
    try {
      const resp = await GetPlaceDetails({
        textQuery: hotel.hotelName,
      });

      const photoUrl = resp?.data?.places?.[0]?.photos?.[0]?.name;

      if (photoUrl) {
        setPhotoUrl(photoUrl);
      }
    } catch (error) {
      console.error("Error fetching hotel photo", error);
    }
  };

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${hotel.hotelName}, ${hotel.hotelAddress}`
  )}`;

  return (
    <a href={mapUrl} target="_blank" rel="noopener noreferrer">
      <div
        className="relative group bg-white rounded-2xl shadow-md 
                   hover:shadow-2xl transition-all duration-500 
                   overflow-hidden cursor-pointer hover:-translate-y-2"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
                        opacity-0 group-hover:opacity-20 transition-opacity duration-500 
                        animate-gradient-bg" />

        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={hotel.hotelName}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full bg-gray-200 animate-pulse flex items-center justify-center">
              <span className="text-gray-400 text-sm">Loading...</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative p-4 space-y-2">
          <h3 className="font-semibold text-lg truncate">
            🏨 {hotel.hotelName}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-2">
            📍 {hotel.hotelAddress || "Near city center"}
          </p>

          <div className="flex justify-between items-center text-sm mt-3">
            <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 
                             group-hover:bg-green-600 group-hover:text-white transition-colors">
              💰 {hotel.pricePerNightRange || "Mid Range"}
            </span>

            <span className="px-4 py-1 rounded-full bg-yellow-50 text-yellow-600 
                             group-hover:bg-yellow-500 group-hover:text-white transition-colors">
              ⭐ {hotel.rating || "4.2"}
            </span>
          </div>
        </div>

        {/* Shimmer */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute -inset-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent 
                          rotate-12 animate-shimmer" />
        </div>
      </div>
    </a>
  );
}

export default HotelCardItem;
