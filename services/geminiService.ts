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
  
  // DEMO MODE LOGIC
  if (apiKey === 'demo') {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Fake delay
      return `[DEMO MODE] This is a simulated response because you are in Demo Mode. \n\nYou asked: "${prompt}"\n\nIf you provide a real Google Gemini API Key, I will generate a real intelligent response for you!`;
  }

  try {
    const ai = getClient(apiKey);
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    // Defensive: if response.text is undefined, fallback string
    return response?.text ?? "No response generated. Please try again.";
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

  // DEMO MODE LOGIC
  if (apiKey === 'demo') {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Fake delay
      // Return a placeholder image
      return `https://placehold.co/600x600/1e293b/38bdf8?text=Demo+Image\n${encodeURIComponent(prompt)}`;
  }

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

    // Defensive: Safe access candidates/parts and image encoding
    const candidates = response?.candidates;
    const parts = candidates?.[0]?.content?.parts;
    if (Array.isArray(parts)) {
        for (const part of parts) {
            if (part?.inlineData?.data) {
                const base64EncodeString: string = part.inlineData.data ?? '';
                const mimeType: string = part.inlineData.mimeType ?? 'image/png';
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