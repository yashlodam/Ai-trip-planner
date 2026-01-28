import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/sevice/GlobalApi";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {
  if (!trip || trip.length === 0) return null;

  const [photoUrl, setPhotoUrl] = useState("");
  const { destination, days, budget, travelers } = trip[0].userSelection;

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const resp = await GetPlaceDetails({ textQuery: destination });
      const photoUrl =
        resp?.data?.places?.[0]?.photos?.[0]?.name;

      if (photoUrl) {
        setPhotoUrl(photoUrl);
      }
    } catch (error) {
      console.error("Error fetching photo:", error);
    }
  };

  const handleShareTrip = () => {
    const shareUrl = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: "My AI Planned Trip ✨",
        text: `Check out my AI-generated trip to ${destination}!`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Trip link copied to clipboard 📋");
    }
  };

  return (
    <section className="relative overflow-hidden rounded-2xl shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 opacity-20 animate-gradient-bg" />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-2xl pointer-events-none" />

      <div className="relative bg-white/90 rounded-2xl overflow-hidden">
        <div className="relative group">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={destination}
              className="w-full h-[340px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-[340px] bg-gray-200 animate-pulse flex items-center justify-center">
              <span className="text-gray-400">Loading image...</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          <Button
            size="icon"
            onClick={handleShareTrip}
            className="absolute bottom-5 right-5 rounded-full bg-orange-500 hover:bg-orange-600 shadow-xl hover:scale-110 transition-all cursor-pointer"
          >
            <IoIosSend className="h-5 w-5 text-white" />
          </Button>
        </div>

        <div className="p-6 md:p-8">
          <h2 className="font-extrabold text-3xl">🌍 {destination}</h2>

          <div className="mt-4 flex gap-3 flex-wrap">
            <span className="info-tag info-tag-blue">📅 {days} Days</span>
            <span className="info-tag info-tag-green">💰 {budget} Budget</span>
            <span className="info-tag info-tag-purple">🧑‍🤝‍🧑 {travelers}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InfoSection;
