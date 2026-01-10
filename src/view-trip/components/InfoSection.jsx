import { Button } from "@/components/ui/button";
import React from "react";
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {
  // Safety check
  if (!trip || trip.length === 0) return null;

  const { destination, days, budget, travelers } = trip[0].userSelection;

  return (
    <section className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Cover Image */}
      <div className="relative">
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/LK5FJVCHXkU?si=JtfNW0HR7alBDecx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

        {/* Floating Action Button */}
        <Button
          size="icon"
          className="absolute bottom-4 right-4 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
        >
          <IoIosSend className="h-5 w-5 text-white" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Destination */}
        <h2 className="font-bold text-3xl text-gray-900 flex items-center gap-2">
          🌍 {destination}
        </h2>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="flex items-center gap-2 px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
            📅 {days} Days
          </span>

          <span className="flex items-center gap-2 px-4 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
            💰 {budget} Budget
          </span>

          <span className="flex items-center gap-2 px-4 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium">
            🧑‍🤝‍🧑 {travelers}
          </span>
        </div>

        {/* Subtitle */}
        <p className="mt-4 text-gray-500 text-sm">
          ✨ A personalized trip crafted just for you
        </p>
      </div>
    </section>
  );
}

export default InfoSection;
