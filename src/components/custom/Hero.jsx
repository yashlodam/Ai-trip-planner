import React, { useRef } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 30;
    const y = (e.clientY - top - height / 2) / 30;
    imageRef.current.style.transform = `rotateX(${-y}deg) rotateY(${x}deg) scale(1.02)`;
  };

  const resetTransform = () => {
    if (!imageRef.current) return;
    imageRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-orange-50">

      {/* Background accents */}
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] bg-orange-400/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-40 -right-40 h-[520px] w-[520px] bg-pink-400/20 rounded-full blur-3xl animate-float-slow delay-300" />

      {/* HERO GRID (UNCHANGED) */}
      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-20 pt-24 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="animate-fade-in-up">
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold">
            AI-Powered Trip Planning
          </span>

          <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Plan Smarter Trips
            </span>{" "}
            with AI Assistance
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-xl">
            Skip hours of research. Get personalized destinations, daily
            itineraries, hotel options, and budgets — generated instantly by AI.
          </p>

          {/* ✅ ADDED: Key benefits (no layout change) */}
          <ul className="mt-6 space-y-2 text-gray-600 text-sm">
            <li>✔ Personalized day-by-day itinerary</li>
            <li>✔ Smart budget & hotel recommendations</li>
            <li>✔ Optimized routes & travel time insights</li>
          </ul>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link to="/create-trip">
              <Button className="px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                Plan My Trip 🚀
              </Button>
            </Link>

            <Link to="/how-it-works">
              <Button
                variant="outline"
                className="px-8 py-6 text-lg font-semibold rounded-xl hover:bg-orange-50 transition cursor-pointer"
              >
                How It Works
              </Button>
            </Link>
          </div>

          {/* Trust */}
          <div className="mt-8 flex items-center gap-4 text-sm text-gray-500">
            ⭐⭐⭐⭐⭐
            <span>Trusted by travelers worldwide</span>
          </div>

          {/* ✅ ADDED: Trust badges */}
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-500">
            <span className="px-3 py-1 bg-white rounded-full shadow-sm">No Credit Card</span>
            <span className="px-3 py-1 bg-white rounded-full shadow-sm">Free to Try</span>
            <span className="px-3 py-1 bg-white rounded-full shadow-sm">Secure Login</span>
          </div>
        </div>

        {/* RIGHT IMAGE (UNCHANGED) */}
        <div
          className="relative animate-fade-in-up delay-300 perspective"
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTransform}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 to-pink-400 
                          rounded-3xl blur-3xl opacity-25 animate-glow" />
          <div
            ref={imageRef}
            className="relative transition-transform duration-300 ease-out"
          >
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
              alt="AI travel planner"
              className="rounded-3xl shadow-2xl object-cover w-full h-[440px] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* STATS (UNCHANGED + added captions) */}
      <div className="relative max-w-6xl mx-auto px-6 pb-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center animate-fade-in">
        {[
          ["10k+", "Trips Planned", "Across multiple countries"],
          ["95%", "User Satisfaction", "Based on feedback"],
          ["50+", "Destinations", "Continuously growing"],
          ["AI", "Powered", "Smart recommendations"],
        ].map(([value, label, sub], i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition"
          >
            <h3 className="text-3xl font-bold text-orange-500">{value}</h3>
            <p className="text-sm font-medium text-gray-700">{label}</p>
            <p className="text-xs text-gray-500 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* WHAT AI DOES (UNCHANGED + added micro text) */}
      <div className="relative max-w-6xl mx-auto px-6 py-16 animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-10">
          What Our AI Does for You
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            ["🧭 Smart Route Planning", "Optimized daily routes to save time.", "Avoid unnecessary backtracking"],
            ["🏨 Hotel Recommendations", "Budget-aware stays near attractions.", "Best value locations"],
            ["📍 Hidden Places", "Local gems beyond tourist crowds.", "Authentic experiences"],
          ].map(([title, desc, extra], i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
              <p className="text-xs text-gray-400 mt-2">{extra}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS (UNCHANGED + added role clarity) */}
      <div className="relative max-w-6xl mx-auto px-6 py-20 animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-4">
          What Travelers Are Saying
        </h2>

        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Real experiences from people who planned trips with AuraTravel.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            ["Planned a 7-day trip in minutes. Everything was perfect.", "Rahul Mehta", "Solo Traveler · India"],
            ["Our family vacation was effortless and well organized.", "Anita Sharma", "Family Trip · Europe"],
            ["Clean UI, fast planning, and accurate suggestions.", "Daniel Wong", "Business Traveler · Singapore"],
          ].map(([quote, name, role], i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition"
            >
              <p className="text-gray-600 italic mb-6">“{quote}”</p>
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-800">{name}</h4>
                <p className="text-sm text-gray-500">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
