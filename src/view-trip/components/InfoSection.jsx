import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/sevice/GlobalApi";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";



function InfoSection({ trip }) {
  // Safety check
  if (!trip || trip.length === 0) return null;

  const [photoUrl,setPhotoUrl] = useState()

  const { destination, days, budget, travelers } = trip[0].userSelection;

  useEffect(()=>{
    trip&&GetPlacePhoto();
  },[trip]);

  const GetPlacePhoto = async ()=>{

    const data = {
      textQuery: destination
    }

    const result = await GetPlaceDetails(data)
    .then(resp=>{
        console.log(resp.data.places[0].photos[6].name);

        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
        setPhotoUrl(PhotoUrl);
        console.log(PhotoUrl);
    })
  }
  return (
    <section className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Cover Image */}
      <div className="relative">
        <img src={photoUrl} alt="" className="w-full h-[340px] object-cover rounded-xl"/>
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
