import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function HowItWork() {
  return (
    <section className="relative bg-gradient-to-b from-white to-orange-50 py-24">
      
      {/* Subtle background accents */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            How It <span className="text-[#f56551]">Works</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            A simple, intelligent process to plan your entire trip with AI —
            from idea to itinerary.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
            <div className="text-[#f56551] text-sm font-semibold mb-2">
              STEP 01
            </div>
            <h3 className="text-xl font-bold mb-3">
              Share Your Travel Preferences
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Tell us your destination, number of days, budget, and travelers.
              This helps our AI understand your travel style instantly.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
            <div className="text-[#f56551] text-sm font-semibold mb-2">
              STEP 02
            </div>
            <h3 className="text-xl font-bold mb-3">
              AI Generates Your Trip Plan
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our AI creates a complete itinerary including daily activities,
              places to visit, hotels, travel time, and budget-friendly options.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
            <div className="text-[#f56551] text-sm font-semibold mb-2">
              STEP 03
            </div>
            <h3 className="text-xl font-bold mb-3">
              Review & Explore
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Explore your itinerary with interactive maps, place details,
              and smart suggestions — all organized day by day.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
            <div className="text-[#f56551] text-sm font-semibold mb-2">
              STEP 04
            </div>
            <h3 className="text-xl font-bold mb-3">
              Travel With Confidence
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Follow your personalized plan, save time during travel,
              and enjoy a smooth, stress-free experience.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-20 border-t" />

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to plan smarter?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Let AI handle the planning while you focus on the experience.
          </p>

          <Link to="/create-trip">
            <Button className="px-10 py-6 text-lg font-semibold rounded-xl shadow-md hover:scale-105 transition">
              Start Planning 🚀
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}

export default HowItWork;
