import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/sevice/GlobalApi";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {
  if (!trip || trip.length === 0) return null;

  const [photoUrl, setPhotoUrl] = useState("");
  const { destination, days, budget, travelers } = trip[0].userSelection;

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = { textQuery: destination };

    await GetPlaceDetails(data).then((resp) => {
      const photoName = resp?.data?.places?.[0]?.photos?.[3]?.name;
      if (photoName) {
        const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);
        setPhotoUrl(PhotoUrl);
      }
    });
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

      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 
                      opacity-20 animate-gradient-bg" />

      {/* Glass layer */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-2xl pointer-events-none" />

      {/* Main container */}
      <div className="relative bg-white/90 rounded-2xl overflow-hidden">

        {/* IMAGE */}
        <div className="relative group">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={destination}
              className="w-full h-[340px] object-cover 
                         transition-transform duration-700 
                         group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-[340px] bg-gray-200 animate-pulse" />
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Floating action */}
          <Button
  size="icon"
  onClick={handleShareTrip}
  className="absolute bottom-5 right-5 rounded-full 
             bg-orange-500 hover:bg-orange-600 
             shadow-xl hover:scale-110 
             transition-all duration-300 cursor-pointer"
>
  <IoIosSend className="h-5 w-5 text-white" />
</Button>

        </div>

        {/* CONTENT */}
        <div className="p-6 md:p-8">
          <h2 className="font-extrabold text-3xl text-gray-900 tracking-tight">
            🌍 {destination}
          </h2>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="info-tag info-tag-blue">
              📅 {days} Days
            </span>
            <span className="info-tag info-tag-green">
              💰 {budget} Budget
            </span>
            <span className="info-tag info-tag-purple">
              🧑‍🤝‍🧑 {travelers}
            </span>
          </div>

          <p className="mt-4 text-gray-500 text-sm">
            ✨ A personalized trip crafted just for you
          </p>
        </div>
      </div>
    </section>
  );
}

export default InfoSection;
