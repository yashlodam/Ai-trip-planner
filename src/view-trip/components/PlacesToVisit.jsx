import { GetPlaceDetails, PHOTO_REF_URL } from "@/sevice/GlobalApi";
import React, { useEffect, useState } from "react";

function PlacesToVisit({ trip }) {
  if (!trip || trip.length === 0) return null;

  const itinerary = trip[0]?.tripData?.itinerary || [];
  const [photos, setPhotos] = useState({}); // store photo per place

  useEffect(() => {
    fetchAllPlacePhotos();
  }, [trip]);

  const fetchAllPlacePhotos = async () => {
    try {
      const activities = itinerary.flatMap(
        (day) => Object.values(day.activities || {})
      );

      for (const activity of activities) {
        if (!activity?.placeName || photos[activity.placeName]) continue;

        const resp = await GetPlaceDetails({
          textQuery: activity.placeName,
        });
        console.log(activity.placeName);

        const photoName =
          resp?.data?.places?.[0]?.photos?.[0]?.name;

        if (photoName) {
          const url = PHOTO_REF_URL.replace("{NAME}", photoName);
          setPhotos((prev) => ({
            ...prev,
            [activity.placeName]: url,
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching place photos", error);
    }
  };

  const getMapUrl = (activity) => {
    if (
      activity?.geoCoordinates?.latitude &&
      activity?.geoCoordinates?.longitude
    ) {
      return `https://www.google.com/maps?q=${activity.geoCoordinates.latitude},${activity.geoCoordinates.longitude}`;
    }

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      activity.placeName
    )}`;
  };

  return (
    <section className="mt-12">
      <h2 className="font-bold text-2xl mb-6">📍 Places to Visit</h2>

      <div className="space-y-10">
        {itinerary.map((dayPlan, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6">
            {/* Day Header */}
            <div className="mb-4">
              <h3 className="font-bold text-xl text-gray-800">
                🗓️ Day {dayPlan.day}
              </h3>
              <p className="text-sm text-gray-500">
                ⏰ Best Time: {dayPlan.bestTimeToVisitThisDay}
              </p>
            </div>

            {/* Activities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(dayPlan.activities || {}).map(
                ([timeOfDay, activity], idx) => (
                  <a
                    key={idx}
                    href={getMapUrl(activity)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative border rounded-lg overflow-hidden hover:shadow-lg hover:scale-[1.02] transition cursor-pointer block"
                  >
                    {/* Image */}
                    <img
                      src={
                        photos[activity.placeName] ||
                        `https://source.unsplash.com/600x400/?${activity.placeName}`
                      }
                      alt={activity.placeName}
                      className="h-44 w-full object-cover"
                    />

                    {/* Content */}
                    <div className="p-4 space-y-2">
                      <h4 className="font-semibold text-sm text-blue-600 uppercase">
                        🕒 {timeOfDay}
                      </h4>

                      <h5 className="font-medium text-lg text-gray-800">
                        📌 {activity.placeName}
                      </h5>

                      <p className="text-sm text-gray-600">
                        {activity.placeDetails}
                      </p>

                      <div className="text-sm text-gray-500 space-y-1 mt-2">
                        {activity.timeToTravel && (
                          <p>🚗 Travel Time: {activity.timeToTravel}</p>
                        )}
                        {activity.ticketPricing && (
                          <p>🎟️ Ticket: {activity.ticketPricing}</p>
                        )}
                      </div>
                    </div>

                    {/* Map Icon */}
                    <span className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
                      📍
                    </span>
                  </a>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PlacesToVisit;
