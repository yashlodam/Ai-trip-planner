import { GetPlaceDetails, PHOTO_REF_URL } from '@/sevice/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserTripCardItems({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.destination,
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

  return (
    <Link to={'/view-trip/' + trip.id}>
      <div className="relative group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer">

        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
                        opacity-0 group-hover:opacity-20 transition-opacity duration-500 
                        animate-gradient-bg" />

        {/* Image */}
        <div className="relative h-[180px] w-full">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={trip?.userSelection?.destination}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="h-full w-full bg-gray-200 animate-pulse" />
          )}
        </div>

        {/* Content */}
        <div className="relative p-4">
          <h2 className="font-bold text-lg truncate">
            {trip?.userSelection?.destination}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {trip?.userSelection?.days} Days trip · {trip?.userSelection?.budget} Budget
          </p>

          <div className="mt-3 inline-block px-3 py-1 text-xs font-medium rounded-full 
                          bg-blue-100 text-blue-600 group-hover:bg-blue-600 
                          group-hover:text-white transition-colors duration-300">
            Planned Trip
          </div>
        </div>

        {/* Hover shimmer */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-500">
          <div className="absolute -inset-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent 
                          rotate-12 animate-shimmer" />
        </div>

      </div>
    </Link>
  );
}

export default UserTripCardItems;
