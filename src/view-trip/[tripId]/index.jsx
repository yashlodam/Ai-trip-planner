import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "@/sevice/firebaseConfig";
import InfoSection from "../components/InfoSection";
import { Hotel } from "lucide-react";
import Hotels from "../components/Hotels";

function ViewTrip() {
  const { tripId } = useParams();
  const [trips, setTrips] = useState([]); // ✅ ARRAY STATE
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTripData = async () => {
      try {
        const docRef = doc(db, "trips", tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // ✅ Wrap single document in array
          setTrips([{ id: docSnap.id, ...docSnap.data() }]);
        } else {
          setTrips([]);
        }
      } catch (error) {
        console.error("Error fetching trip:", error);
        setTrips([]);
      } finally {
        setLoading(false);
      }
    };

    if (tripId) {
      getTripData();
    }
  }, [tripId]);

  if (loading) {
    return <p className="p-6">Loading trip...</p>;
  }

  if (trips.length === 0) {
    return <p className="p-6">Trip not found</p>;
  }
  console.log(trips)

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
        {/* Information Section */}
        <InfoSection trip = {trips}/>
        {/* Recomeended Hotess */}
        <Hotels trip={trips}/>
        {/*Daily Plan*/}

        {/*Footer*/}
    </div>
  );
}

export default ViewTrip;
