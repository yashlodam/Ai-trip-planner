import React from "react";

function PlacesToVisit({ trip }) {
  if (!trip || trip.length === 0) return null;

  const itinerary = trip[0]?.tripData?.itinerary || [];

  return (
    <section className="mt-12">
      <h2 className="font-bold text-2xl mb-6">📍 Places to Visit</h2>

      <div className="space-y-10">
        {itinerary.map((dayPlan, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6"
          >
            {/* Day Header */}
            <div className="mb-4">
              <h3 className="font-bold text-xl text-gray-800">
                🗓️ Day {dayPlan.day}: {dayPlan.theme}
              </h3>
              <p className="text-sm text-gray-500">
                ⏰ Best Time: {dayPlan.bestTimeToVisitDay}
              </p>
            </div>

            {/* Activities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dayPlan.activities?.map((activity, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  {/* Image */}
                  <img
                    src={
                      activity.placeImageUrl ||
                      `https://source.unsplash.com/600x400/?${activity.placeName}`
                    }
                    alt={activity.placeName}
                    className="h-44 w-full object-cover"
                  />

                  {/* Content */}
                  <div className="p-4 space-y-2">
                    <h4 className="font-semibold text-lg">
                      📌 {activity.placeName}
                    </h4>

                    <p className="text-sm text-gray-600">
                      {activity.placeDetails}
                    </p>

                    <div className="text-sm text-gray-500 space-y-1 mt-2">
                      {activity.timeTravel && (
                        <p>🚗 Travel Time: {activity.timeTravel}</p>
                      )}
                      {activity.ticketPricing && (
                        <p>🎟️ Ticket: {activity.ticketPricing}</p>
                      )}
                      {activity.luxuryExperience && (
                        <p>✨ Experience: {activity.luxuryExperience}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PlacesToVisit;
