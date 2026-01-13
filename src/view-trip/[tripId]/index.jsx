import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "@/sevice/firebaseConfig";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

function ViewTrip() {
  const { tripId } = useParams();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTop, setShowTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const getTripData = async () => {
      try {
        const docRef = doc(db, "trips", tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
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

    if (tripId) getTripData();
  }, [tripId]);

  /* Show button only after scrolling */
  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-orange-50">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading your trip...</p>
        </div>
      </div>
    );
  }

  /* ---------- EMPTY ---------- */
  if (trips.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-orange-50">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Trip not found
          </h2>
          <p className="text-gray-500 text-sm">
            The trip you’re looking for doesn’t exist or was removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-orange-50">
      {/* Background accents */}
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] bg-orange-400/20 rounded-full blur-3xl" />
      <div className="absolute top-60 -right-40 h-[520px] w-[520px] bg-pink-400/20 rounded-full blur-3xl" />

      <div className="relative p-6 sm:p-10 md:px-20 lg:px-44 xl:px-56 space-y-20">
        {/* INFO */}
        <div className="animate-fade-in-up">
          <InfoSection trip={trips} />
        </div>

        {/* HOTELS */}
        <div className="animate-fade-in-up">
          <Hotels trip={trips} />
        </div>

        {/* DAILY PLAN */}
        <div className="animate-fade-in-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📅 Daily Travel Plan
          </h2>
          <PlacesToVisit trip={trips} />
        </div>

        {/* FOOTER */}
        <div className="pt-10 border-t">
          <Footer tirp={trips} />
        </div>
      </div>

      {/* 🔼 FLOATING BACK TO TOP */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 
                     flex items-center justify-center
                     h-12 w-12 rounded-full
                     bg-white/90 backdrop-blur-xl 
                     shadow-xl border
                     hover:shadow-2xl hover:-translate-y-1
                     transition-all duration-300 animate-fade-in cursor-pointer"
        >
          ⬆️
        </button>
      )}
    </section>
  );
}

export default ViewTrip;
