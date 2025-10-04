
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
    const prompt = `A professional, high-resolution 3D studio render of a single "${equipmentName}" on a plain, clean, light gray background. The object should be clearly visible and centered. Photorealistic lighting.`;
    
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '4:3',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image was generated.");
    }

  } catch (error) {
    console.error("Error generating image from Gemini:", error);
    throw new Error("Failed to generate image with the Gemini API.");
  }
}
