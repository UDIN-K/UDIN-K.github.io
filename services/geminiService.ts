import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

/**
 * Initializes the Gemini Client dynamically with a provided key
 */
const getClient = (apiKey: string) => {
    return new GoogleGenAI({ apiKey });
};

/**
 * Generates text response using Gemini Flash 2.5
 */
export const generateText = async (prompt: string, apiKey: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key is required.");
  
  try {
    const ai = getClient(apiKey);
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No response generated. Please try again.";
  } catch (error) {
    console.error("Error generating text:", error);
    throw new Error("Failed to generate response. Check your API Key.");
  }
};

/**
 * Generates an image using Gemini Flash 2.5 Image model
 * Returns a base64 data URL string.
 */
export const generateImage = async (prompt: string, apiKey: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key is required.");

  try {
    const ai = getClient(apiKey);
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
            { text: prompt }
        ]
      },
      config: {
        imageConfig: {
            aspectRatio: "1:1",
        }
      }
    });

    // Iterate through parts to find the image data
    if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64EncodeString: string = part.inlineData.data;
                const mimeType = part.inlineData.mimeType || 'image/png';
                return `data:${mimeType};base64,${base64EncodeString}`;
            }
        }
    }
    
    throw new Error("No image data found in response.");
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate image. Please try a different prompt or check your API Key.");
  }
};