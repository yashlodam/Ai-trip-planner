import { GetPlaceDetails } from "@/sevice/GlobalApi";
import React, { useEffect, useState } from "react";

function PlacesToVisit({ trip }) {
  if (!trip || trip.length === 0) return null;

  const itinerary = trip[0]?.tripData?.itinerary || [];
  const [photos, setPhotos] = useState({});

  useEffect(() => {
    if (trip) {
      fetchAllPlacePhotos();
    }
  }, [trip]);

  const fetchAllPlacePhotos = async () => {
    try {
      const activities = itinerary.flatMap((day) =>
        Object.values(day.activities || {}),
      );

      for (const activity of activities) {
        if (!activity?.placeName || photos[activity.placeName]) continue;

        const resp = await GetPlaceDetails({
          textQuery: activity.placeName,
        });

        const photoName = resp?.data?.places?.[0]?.photos?.[0]?.name;

        if (photoName) {
          setPhotos((prev) => ({
            ...prev,
            [activity.placeName]: photoName,
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching place photos", error);
    }
  };

  const getMapUrl = (activity) => {
    const lat = activity?.geoCoordinates?.latitude;
    const lng = activity?.geoCoordinates?.longitude;

    if (
      typeof lat === "number" &&
      typeof lng === "number" &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    ) {
      return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    }

    const city = trip?.[0]?.tripData?.location || "";
    const query = `${activity.placeName}, ${city}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  };

  return (
    <section className="mt-20">
      <div className="space-y-16">
        {itinerary.map((dayPlan, index) => (
          <div
            key={index}
            className="relative rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 opacity-10 animate-gradient-bg" />

            <div className="relative bg-white/90 backdrop-blur-xl p-6 md:p-8 rounded-2xl">
              <div className="mb-8">
                <h3 className="font-bold text-2xl text-gray-900">
                  🗓️ Day {dayPlan.day}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  ⏰ Best Time: {dayPlan.bestTimeToVisitThisDay}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(dayPlan.activities || {}).map(
                  ([timeOfDay, activity], idx) => (
                    <a
                      key={idx}
                      href={getMapUrl(activity)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative h-48 overflow-hidden">
                        {photos[activity.placeName] ? (
                          <img
                            src={photos[activity.placeName]}
                            alt={activity.placeName}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200 animate-pulse flex items-center justify-center">
                            <span className="text-gray-400 text-sm">
                              Loading...
                            </span>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                        <span className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-md">
                          📍
                        </span>
                      </div>

                      <div className="p-5 space-y-2">
                        <h4 className="font-semibold text-xs text-orange-600 uppercase tracking-wide">
                          🕒 {timeOfDay}
                        </h4>

                        <h5 className="font-semibold text-lg text-gray-900">
                          {activity.placeName}
                        </h5>

                        <p className="text-sm text-gray-600 line-clamp-2">
                          {activity.placeDetails}
                        </p>

                        <div className="text-sm text-gray-500 space-y-1 mt-3">
                          {activity.timeToTravel && (
                            <p>🚗 {activity.timeToTravel}</p>
                          )}
                          {activity.ticketPricing && (
                            <p>🎟️ {activity.ticketPricing}</p>
                          )}
                        </div>
                      </div>

                      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute -inset-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 animate-shimmer" />
                      </div>
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PlacesToVisit;
