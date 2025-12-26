
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTravelInsights = async (location: string, duration: number) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide travel insights for a ${duration}-day trip to ${location}. 
      Include 3 top things to do, 3 packing essentials, and a local cultural tip. 
      Format as JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            activities: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 recommended activities',
            },
            packing: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 packing essentials',
            },
            culturalTip: {
              type: Type.STRING,
              description: 'One key cultural tip',
            }
          },
          required: ["activities", "packing", "culturalTip"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Insights Error:", error);
    return null;
  }
};
