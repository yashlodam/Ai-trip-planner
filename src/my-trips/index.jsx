import { db } from '@/sevice/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripCardItems from './UserTripCardItems';

function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserTrips();
  }, []);

  /* Used to get all user trips */
  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/');
      return;
    }

    const q = query(
      collection(db, 'trips'),
      where('userEmail', '==', user.email)
    );

    const querySnapshot = await getDocs(q);

    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push({ id: doc.id, ...doc.data() });
    });

    setUserTrips(trips);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-5">
        {userTrips.map((trip, index) => (
          <UserTripCardItems
            key={trip.id || index}
            trip={trip}
          />
        ))}
      </div>
    </div>
  );
}

export default MyTrip;
