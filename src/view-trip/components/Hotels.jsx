import React from "react";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  if (!trip || trip.length === 0) return null;

  // ✅ MATCHES STEP-2 GEMINI SCHEMA
  const hotels = trip[0]?.tripData?.hotelsOptions || [];

  const openInMaps = (hotel) => {
    const query = encodeURIComponent(
      `${hotel.hotelName} ${hotel.hotelAddress || ""}`
    );

    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, "_blank");
  };

  if (hotels.length === 0) {
    return (
      <p className="text-gray-500 mt-6">
        No hotel recommendations available.
      </p>
    );
  }

  return (
    <section className="mt-10">
      <h2 className="font-bold text-2xl mb-6">🏨 Hotel Recommendations</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hotels.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} index={index}/>
        ))}
      </div>
    </section>
  );
}

export default Hotels;
