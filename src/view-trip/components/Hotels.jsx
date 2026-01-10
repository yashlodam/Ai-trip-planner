import React from "react";

function Hotels({ trip }) {
  if (!trip || trip.length === 0) return null;

  const hotels = trip[0]?.tripData?.hotelsOptions || [];

  const openInMaps = (hotel) => {
    const query = encodeURIComponent(
      `${hotel.hotelName} ${hotel.hotelAddress || ""}`
    );

    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;

    window.open(url, "_blank");
  };

  return (
    <section className="mt-10">
      <h2 className="font-bold text-2xl mb-6">🏨 Hotel Recommendations</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hotels.map((hotel, index) => (
          <div
            key={index}
            onClick={() => openInMaps(hotel)} // ✅ CLICK HANDLER
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer hover:scale-[1.02]"
          >
            {/* Hotel Image */}
            <img
              className="h-48 w-full object-cover"
              src={`https://source.unsplash.com/600x400/?hotel,${hotel.hotelName}`}
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
        ))}
      </div>
    </section>
  );
}

export default Hotels;
