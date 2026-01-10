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

  // Days validation
  useEffect(() => {
    if (days > 50) {
      toast.error("Please enter less than 50 days");
    }
  }, [days]);

  // 🔹 MAIN FUNCTION
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

    // ⏳ SLOW PART (AI)
    const tripResult = await generateTrip(FINAL_PROMPT);

    // ✅ STOP LOADING IMMEDIATELY
    setLoading(false);

    // 🔥 SAVE IN BACKGROUND (DON'T AWAIT)
    saveTripToFirebase(userSelection, tripResult);

    toast.success("Trip generated successfully 🎉");
    
  } catch (error) {
    setLoading(false);
    toast.error("Failed to generate trip");
  }
};


  // 🔹 GOOGLE LOGIN
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      getUserProfile(tokenResponse);
    },
    onError: (error) => {
      console.log(error);
    },
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
    setOpenDialog(false);
    handleGenerateTrip();
  };

  // 🔹 FIREBASE SAVE (NO NULL)
  const saveTripToFirebase = async (userSelection, tripData) => {
    const user = JSON.parse(localStorage.getItem("user"));

   const docRef =  await addDoc(collection(db, "trips"), {
      userSelection,        // ✅ NOT NULL
      tripData,             // ✅ NOT NULL
      userEmail: user?.email || null,
      createdAt: new Date(),
    });
    navigate('/view-trip/'+docRef.id)
  };

  return (
    <section className="px-5 sm:px-10 md:px-24 lg:px-40 xl:px-56 mt-12 mb-20">
      <h2 className="font-bold text-3xl text-gray-900">
        Tell us your travel preferences
      </h2>
      <p className="mt-4 text-gray-500 text-lg max-w-3xl">
        Just provide some basic information and our AI trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-16 max-w-3xl space-y-14">
        {/* Destination */}
        <div>
          <h3 className="text-xl font-semibold mb-3">🌍 Destination</h3>
          <ReactGoogleAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            placeholder="Search city, place, or country"
            onPlaceSelected={setPlace}
            options={{ types: ["(cities)"] }}
            className="w-full px-4 py-3 rounded-xl border"
          />
        </div>

        {/* Days */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            📅 Trip Duration (Days)
          </h3>
          <Input
            type="number"
            min={1}
            placeholder="Ex. 3"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="max-w-xs"
          />
        </div>

        {/* Budget */}
        <div>
          <h3 className="text-xl font-semibold mb-4">💰 Budget</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => setBudget(item.title)}
                className={clsx(
                  "p-5 border rounded-xl cursor-pointer",
                  budget === item.title &&
                    "border-blue-600 bg-blue-50 shadow-md"
                )}
              >
                <div className="text-4xl">{item.icon}</div>
                <h4 className="font-bold text-lg mt-2">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travelers */}
        <div>
          <h3 className="text-xl font-semibold mb-4">🧑‍🤝‍🧑 Travelers</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {SelectTravelersList.map((item, index) => (
              <div
                key={index}
                onClick={() => setTravelers(item.title)}
                className={clsx(
                  "p-5 border rounded-xl cursor-pointer",
                  travelers === item.title &&
                    "border-blue-600 bg-blue-50 shadow-md"
                )}
              >
                <div className="text-4xl">{item.icon}</div>
                <h4 className="font-bold text-lg mt-2">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        <Button
          disabled={!isFormValid || loading}
          onClick={handleGenerateTrip}
          className="px-10 py-6 text-lg rounded-xl"
        >
          {loading ? (
            <>
              <AiOutlineLoading3Quarters className="animate-spin mr-2" />
              Generating...
            </>
          ) : (
            "Generate Trip ✨"
          )}
        </Button>
      </div>

      {/* LOGIN DIALOG */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In With Google</DialogTitle>
            <DialogDescription>
              Login to generate and save your trip
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
