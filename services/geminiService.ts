
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getEquipmentDescription(equipmentName: string): Promise<string> {
  try {
    const prompt = `Provide a concise, one-sentence description for the following piece of laboratory equipment: "${equipmentName}". Focus on its primary function.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating description from Gemini:", error);
    throw new Error("Failed to communicate with the Gemini API.");
  }
}
