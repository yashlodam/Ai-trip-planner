import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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

function Header() {

  const users = JSON.parse(localStorage.getItem('user'));
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
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <svg
        width="300"
        height="90"
        viewBox="0 0 400 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="auraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6366f1" />
            <stop offset="100%" stop-color="#a855f7" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <circle
          cx="50"
          cy="50"
          r="35"
          fill="url(#auraGradient)"
          fill-opacity="0.1"
        />
        <path
          d="M50 25L65 65L50 58L35 65L50 25Z"
          fill="url(#auraGradient)"
          filter="url(#glow)"
        />

        <circle cx="35" cy="40" r="2" fill="#6366f1" />
        <circle cx="70" cy="50" r="2" fill="#a855f7" />
        <circle cx="45" cy="75" r="2" fill="#6366f1" />
        <path
          d="M35 40Q50 30 70 50"
          stroke="#6366f1"
          stroke-width="0.5"
          stroke-dasharray="2 2"
        />

        <text
          x="100"
          y="55"
          font-family="Arial, sans-serif"
          font-weight="800"
          font-size="32"
          fill="#1f2937"
        >
          Aura<tspan fill="url(#auraGradient)">Travel</tspan>
        </text>

        <text
          x="100"
          y="75"
          font-family="Arial, sans-serif"
          font-weight="500"
          font-size="12"
          fill="#6b7280"
          letter-spacing="2"
        >
          AI TRIP PLANNER
        </text>
      </svg>
      <div>
        {
          users ? 
          <div className="flex items-center gap-3">
            <a href="/my-trips">
            <Button variant="outline" className="rounded-full cursor-pointer">My Trips</Button>
            </a>


            <Popover>
                <PopoverTrigger><img src={users?.picture} alt="" className="h-[35px] w-[35px] rounded-full cursor-pointer"/></PopoverTrigger>
                <PopoverContent>
                  <h2 onClick={()=>{
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }} className="cursor-pointer">Log Out</h2>
                </PopoverContent>
              </Popover>
          </div>
          : <Button onClick={()=> setOpenDialog(!openDialog)} className="cursor-pointer">Sign In</Button>
        }
      </div>
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
    </div>
  );
}

export default Header;
