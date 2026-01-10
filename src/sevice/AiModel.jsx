const API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

if (!API_KEY) {
  throw new Error("VITE_GOOGLE_GEMINI_AI_API_KEY is missing");
}

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

function extractJSON(text) {
  try {
    const match = text.match(/\{[\s\S]*\}/);
    return match ? JSON.parse(match[0]) : null;
  } catch {
    return null;
  }
}

export const generateTrip = async (prompt) => {
  try {
    const response = await fetch(`${GEMINI_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText);
    }

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    const json = extractJSON(text);

    return json ?? text;
  } catch (error) {
    console.error("Gemini Frontend Error:", error);
    return null;
  }
};
