import { GetPlaceDetails, PHOTO_REF_URL } from "@/sevice/GlobalApi";
import React, { useEffect, useState } from "react";

function HotelCardItem({ hotel, index }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (hotel) {
      GetPlacePhoto();
    }
  }, [hotel]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: hotel.hotelName,
      };

      const resp = await GetPlaceDetails(data);

      const photoName = resp?.data?.places?.[0]?.photos?.[0]?.name;

      if (photoName) {
        const url = PHOTO_REF_URL.replace("{NAME}", photoName);
        setPhotoUrl(url);
      }
    } catch (error) {
      console.error("Error fetching hotel photo", error);
    }
  };

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${hotel.hotelName}, ${hotel.hotelAddress}`
  )}`;

  return (
    <a
      href={mapUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        key={index}
        className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer hover:scale-[1.02]"
      >
        {/* Hotel Image */}
        <img
          className="h-48 w-full object-cover"
          src={photoUrl || "/placeholder-hotel.jpg"}
          alt={hotel.hotelName}
        />

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-lg text-gray-800">
            🏨 {hotel.hotelName}
          </h3>

          <p className="text-sm text-gray-500">
            📍 {hotel.hotelAddress || "Near city center"}
          </p>

          <div className="flex justify-between items-center text-sm mt-2">
            <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full">
              💰 {hotel.pricePerNightRange || "Mid Range"}
            </span>

            <span className="bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full">
              ⭐ {hotel.rating || "4.2"}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default HotelCardItem;
