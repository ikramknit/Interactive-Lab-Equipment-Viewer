
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

export async function getEquipmentImage(equipmentName: string): Promise<string> {
  try {
    const prompt = `Find a direct URL to a high-quality, public-domain or royalty-free image of a single "${equipmentName}" on a clean, preferably white or light gray, background. Return only the raw image URL and absolutely nothing else.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const url = response.text.trim();
    
    // A simple check to see if the response looks like a URL.
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    } else {
        console.error(`Gemini did not return a valid URL for "${equipmentName}". Response: "${url}"`);
        throw new Error(`Could not find a valid image URL for "${equipmentName}".`);
    }

  } catch (error) {
    console.error("Error fetching image URL from Gemini:", error);
    // Re-throw the error to be handled by the calling component
    throw error;
  }
}