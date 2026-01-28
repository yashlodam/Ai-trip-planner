import axios from "axios";

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800";

export const GetPlaceDetails = async (data) => {
  const placeName = data?.textQuery || "Travel";

  if (!UNSPLASH_ACCESS_KEY) {
    console.warn("Unsplash access key missing");
    return buildResponse(placeName, FALLBACK_IMAGE, "no-key");
  }

  try {
    const response = await axios.get(
      "https://api.unsplash.com/search/photos",
      {
        params: {
          query: `${placeName} travel destination`,
          per_page: 1,
          orientation: "landscape",
        },
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    const imageUrl =
      response?.data?.results?.[0]?.urls?.regular || FALLBACK_IMAGE;

    return buildResponse(placeName, imageUrl, response?.data?.results?.[0]?.id);
  } catch (error) {
    console.error("Error fetching place photo:", error);
    return buildResponse(placeName, FALLBACK_IMAGE, "error-fallback");
  }
};

const buildResponse = (placeName, imageUrl, id) => ({
  data: {
    places: [
      {
        photos: [{ name: imageUrl }],
        displayName: { text: placeName },
        id,
      },
    ],
  },
});
