export const SelectTravelersList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A solo traveler exploring the world independently",
    icon: "🧍‍♂️",
    people: 1,
  },
  {
    id: 2,
    title: "Couple",
    desc: "Two people traveling together for a shared experience",
    icon: "👫",
    people: 2,
  },
  {
    id: 3,
    title: "Family",
    desc: "A family trip full of fun, bonding, and memories",
    icon: "👨‍👩‍👧‍👦",
    people: 4,
  },
  {
    id: 4,
    title: "Friends",
    desc: "A group of friends traveling and creating memories",
    icon: "🧑‍🤝‍🧑",
    people: 5,
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Low Budget",
    desc: "Affordable travel with budget stays and local transport",
    icon: "💸",
    range: "₹10,000 – ₹25,000",
  },
  {
    id: 2,
    title: "Mid Range",
    desc: "Comfortable hotels, good food, and balanced experiences",
    icon: "💰",
    range: "₹25,000 – ₹60,000",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Premium stays, luxury transport, and exclusive experiences",
    icon: "💎",
    range: "₹60,000+",
  },
];

export const AI_PROMPT = 'Generate Travel Plan for Location :{location},for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName,Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'

