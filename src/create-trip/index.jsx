import React, { useEffect, useState } from "react";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelersList,
} from "@/constants/options";
import clsx from "clsx";
import { toast } from "sonner";
import { generateTrip } from "@/sevice/AiModel";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/sevice/firebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState(null);
  const [travelers, setTravelers] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isFormValid =
    place &&
    days &&
    budget &&
    travelers &&
    Number(days) > 0 &&
    Number(days) <= 50;

  useEffect(() => {
    if (days > 50) toast.error("Please enter less than 50 days");
  }, [days]);

  /* -------------------- MAIN ACTION -------------------- */
  const handleGenerateTrip = async () => {
    if (!isFormValid) {
      toast.error("Please fill all details correctly");
      return;
    }

    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    const userSelection = {
      destination: place.formatted_address,
      days: Number(days),
      budget,
      travelers,
    };

    try {
      setLoading(true);

      const FINAL_PROMPT = AI_PROMPT.replace(
        "{location}",
        userSelection.destination
      )
        .replace("{totalDays}", userSelection.days)
        .replace("{traveler}", userSelection.travelers)
        .replace("{budget}", userSelection.budget);

      const tripResult = await generateTrip(FINAL_PROMPT);

      setLoading(false);
      saveTripToFirebase(userSelection, tripResult);

      toast.success("Trip generated successfully 🎉");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to generate trip");
    }
  };

  /* -------------------- GOOGLE LOGIN -------------------- */
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserProfile(tokenResponse),
    onError: (error) => console.log(error),
  });

const getUserProfile = async (tokenInfo) => {
  const res = await axios.get(
    "https://www.googleapis.com/oauth2/v1/userinfo",
    {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: "application/json",
      },
    }
  );

  localStorage.setItem("user", JSON.stringify(res.data));

  // 🔔 Notify navbar to update
  window.dispatchEvent(new Event("user-login"));

  setOpenDialog(false);
  handleGenerateTrip();
};


  /* -------------------- FIREBASE -------------------- */
  const saveTripToFirebase = async (userSelection, tripData) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const docRef = await addDoc(collection(db, "trips"), {
      userSelection,
      tripData,
      userEmail: user?.email || null,
      createdAt: new Date(),
    });

    navigate("/view-trip/" + docRef.id);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-orange-50">

      {/* Background glow */}
      <div className="absolute -top-32 -left-32 h-96 w-96 bg-orange-400/20 rounded-full blur-3xl" />
      <div className="absolute top-52 -right-32 h-96 w-96 bg-pink-400/20 rounded-full blur-3xl" />

      <div className="relative px-5 sm:px-10 md:px-24 lg:px-40 xl:px-56 mt-16 mb-24">

        {/* HEADER */}
        <div className="max-w-4xl mb-16">
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold">
            Trip Preferences
          </span>
          <h2 className="font-extrabold text-3xl md:text-4xl text-gray-900">
            Tell us about your trip
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Just provide a few details and our AI will create a personalized
            travel itinerary tailored to your preferences.
          </p>
        </div>

        {/* FORM */}
        <div className="max-w-4xl space-y-16">

          {/* DESTINATION */}
          <div>
            <h3 className="text-xl font-semibold mb-3">🌍 Destination</h3>
            <ReactGoogleAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              placeholder="Search city, place, or country"
              onPlaceSelected={setPlace}
              options={{ types: ["(cities)"] }}
              className="w-full px-5 py-4 rounded-xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* DAYS */}
          <div>
            <h3 className="text-xl font-semibold mb-3">
              📅 Trip Duration
            </h3>
            <Input
              type="number"
              min={1}
              placeholder="Number of days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="max-w-xs rounded-xl py-4"
            />
          </div>

          {/* BUDGET */}
          <div>
            <h3 className="text-xl font-semibold mb-5">💰 Budget</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setBudget(item.title)}
                  className={clsx(
                    "p-6 rounded-2xl border cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg",
                    budget === item.title
                      ? "border-orange-500 bg-orange-50 shadow-lg"
                      : "bg-white"
                  )}
                >
                  <div className="text-4xl">{item.icon}</div>
                  <h4 className="font-bold text-lg mt-3">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TRAVELERS */}
          <div>
            <h3 className="text-xl font-semibold mb-5">🧑‍🤝‍🧑 Travelers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {SelectTravelersList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setTravelers(item.title)}
                  className={clsx(
                    "p-6 rounded-2xl border cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg",
                    travelers === item.title
                      ? "border-orange-500 bg-orange-50 shadow-lg"
                      : "bg-white"
                  )}
                >
                  <div className="text-4xl">{item.icon}</div>
                  <h4 className="font-bold text-lg mt-3">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <Button
            disabled={!isFormValid || loading}
            onClick={handleGenerateTrip}
            className="px-12 py-6 text-lg rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
            {loading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                Generating Trip...
              </>
            ) : (
              "Generate Trip ✨"
            )}
          </Button>
        </div>
      </div>

      {/* LOGIN DIALOG */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in to continue</DialogTitle>
            <DialogDescription>
              Login with Google to generate and save your trip.
            </DialogDescription>
          </DialogHeader>

          <Button onClick={login} className="w-full flex gap-3 mt-4">
            <FcGoogle className="h-6 w-6" />
            Continue with Google
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default CreateTrip;
