import React from "react";
import { Button } from "../ui/button";

function Header() {
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
        <Button className="cursor-pointer">Sign In</Button>
      </div>
    </div>
  );
}

export default Header;
