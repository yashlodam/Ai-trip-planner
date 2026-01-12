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

export const AI_PROMPT = `
You are an API, not a chatbot.

Return ONLY valid JSON.
DO NOT include explanations, markdown, comments, or extra text.
DO NOT change key names.
DO NOT omit any fields.
DO NOT add new fields.
DO NOT wrap the response in backticks.

Use EXACTLY this JSON schema:

{
  "itinerary": [
    {
      "day": number,
      "bestTimeToVisitThisDay": string,
      "activities": {
        "morning": {
          "placeName": string,
          "placeDetails": string,
          "placeImageQuery": string,
          "geoCoordinates": {
            "latitude": string,
            "longitude": string
          },
          "timeToTravel": string,
          "ticketPricing": string
        },
        "afternoon": {
          "placeName": string,
          "placeDetails": string,
          "placeImageQuery": string,
          "geoCoordinates": {
            "latitude": string,
            "longitude": string
          },
          "timeToTravel": string,
          "ticketPricing": string
        },
        "evening": {
          "placeName": string,
          "placeDetails": string,
          "placeImageQuery": string,
          "geoCoordinates": {
            "latitude": string,
            "longitude": string
          },
          "timeToTravel": string,
          "ticketPricing": string
        }
      }
    }
  ],
  "hotelsOptions": [
    {
      "hotelName": string,
      "hotelAddress": string,
      "pricePerNightRange": string,
      "rating": string,
      "hotelImageQuery": string,
      "geoCoordinates": {
        "latitude": string,
        "longitude": string
      },
      "description": string
    }
  ]
}

Context:
Location: {location}
Total Days: {totalDays}
Travelers: {traveler}
Budget: {budget}

Rules:
- itinerary.length MUST equal {totalDays}
- Each day MUST contain morning, afternoon, and evening
- Use realistic places for the given location
- geoCoordinates must be approximate but valid
- Use image SEARCH QUERIES, NOT image URLs
- Prices must match the given budget

Return JSON ONLY.
`;


