import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative flex flex-col items-center text-center px-6 md:px-16 lg:px-32 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute -top-24 -z-10 h-96 w-96 rounded-full bg-orange-400/20 blur-3xl"></div>

      {/* Main Heading */}
      <h1 className="mt-24 max-w-5xl font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight">
        <span className="text-[#f56551]">
          Discover Your Next Adventure with AI
        </span>
        <br />
        Smart, Personalized Travel Planning
      </h1>

      {/* Sub Text */}
      <p className="mt-6 max-w-3xl text-lg md:text-xl text-gray-500">
        Plan trips in seconds. Our AI curates destinations, daily itineraries,
        budgets, and experiences tailored exactly to your preferences.
      </p>

      {/* CTA */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Link to="/create-trip">
          <Button className="px-8 py-6 text-lg font-semibold rounded-xl">
            Plan My Trip 🚀
          </Button>
        </Link>

        <Link to="/how-it-works">
          <Button
            variant="outline"
            className="px-8 py-6 text-lg font-semibold rounded-xl"
          >
            How It Works
          </Button>
        </Link>
      </div>

      {/* Trust / Feature Points */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl text-left">
        <div className="p-5 border rounded-xl hover:shadow transition">
          <h3 className="font-semibold text-lg">🤖 AI-Powered</h3>
          <p className="text-sm text-gray-500 mt-1">
            Intelligent trip planning based on your travel style and budget.
          </p>
        </div>

        <div className="p-5 border rounded-xl hover:shadow transition">
          <h3 className="font-semibold text-lg">⏱️ Save Time</h3>
          <p className="text-sm text-gray-500 mt-1">
            No more endless research. Get a complete itinerary in seconds.
          </p>
        </div>

        <div className="p-5 border rounded-xl hover:shadow transition">
          <h3 className="font-semibold text-lg">🌍 Travel Smarter</h3>
          <p className="text-sm text-gray-500 mt-1">
            Discover hidden gems, optimized routes, and smart suggestions.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
