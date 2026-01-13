import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header() {
  const users = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  

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
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* LOGO */}
        {/* LOGO */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer">
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="auraGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>

            <circle
              cx="50"
              cy="50"
              r="45"
              fill="url(#auraGradient)"
              opacity="0.15"
            />
            <path
              d="M50 20L65 70L50 60L35 70L50 20Z"
              fill="url(#auraGradient)"
            />
          </svg>

          <div className="leading-tight">
            <h1 className="text-base sm:text-lg md:text-xl font-extrabold text-gray-800">
              Aura
              <span className="text-purple-600 ml-1">Travel</span>
            </h1>

            {/* Hide subtitle on very small screens */}
            <p className="hidden sm:block text-[10px] sm:text-xs tracking-widest text-gray-500">
              AI TRIP PLANNER
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          {users ? (
            <>
              <a href="/create-trip">
                <Button
                  variant="outline"
                  className="rounded-full px-5 cursor-pointer"
                >
                  + Create Trips
                </Button>
              </a>
              <a href="/my-trips">
                <Button
                  variant="outline"
                  className="rounded-full px-5 cursor-pointer"
                >
                  My Trips
                </Button>
              </a>

              <Popover>
                <PopoverTrigger>
                  <img
                    src={users?.picture}
                    alt="User"
                    className="h-9 w-9 rounded-full border cursor-pointer hover:scale-105 transition"
                  />
                </PopoverTrigger>

                <PopoverContent className="w-40 p-2">
                  <button
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                      window.location.href = "/create-trip";

                      
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-sm 
                               hover:bg-red-50 hover:text-red-600 transition"
                  >
                    Log Out
                  </button>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <Button
              onClick={() => setOpenDialog(true)}
              className="rounded-full px-6 cursor-pointer"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>

      {/* SIGN IN DIALOG */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Sign in to AuraTravel
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Login to generate, save, and manage your trips.
            </DialogDescription>
          </DialogHeader>

          <Button
            onClick={login}
            className="w-full flex gap-3 py-6 text-base font-semibold cursor-pointer"
          >
            <FcGoogle className="h-6 w-6 " />
            Continue with Google
          </Button>
        </DialogContent>
      </Dialog>
    </header>
  );
}

export default Header;
