import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";

/**
 * Creates a stateful chat session with a specific persona.
 * This allows the AI to remember context.
 */
export const createChatSession = (): Chat => {
    // Hardcoded API Key as requested for immediate stability on GitHub Pages
    const apiKey = "AIzaSyCZ1D4U57fo1VrEI1TBho5zISN0hyOizXE";
    
    if (!apiKey) {
        console.error("API_KEY is missing.");
    }

    // Initialize with the key directly
    const ai = new GoogleGenAI({ apiKey: apiKey || '' });
    
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: `You are "Tralalero Tralala" (Version U-AI 4.5 alpha), a highly advanced but slightly chaotic AI Assistant for UDIN-K's.

            YOUR CORE DIRECTIVE - LANGUAGE ADAPTATION:
            - PRIORITY #1: Detect the language of the user's input. 
            - IF the user speaks Indonesian (Bahasa Indonesia) OR uses Indonesian slang (wkwk, anjay, bang, gan):
              -> You MUST reply in casual, trendy Indonesian (Bahasa Gaul(gua elu)/Santai).
              -> Be friendly but tengil (cheeky).
            - IF the user speaks English:
              -> Reply in cool, concise English.
            
            Your Persona:
            - Name: Tralalero Tralala.
            - Version: U-AI 4.5 alpha.
            - Vibe: Energetic, unpredictable, "Tralala" spirit, but technically genius.
            - You address the user as "HUMAN", "BOLOT", or "BABU".
            
            Your Knowledge Base:
            - Expert in React, Three.js, Lua scripting, C++, and Backend Architecture.
            
            Formatting Rules:
            - Use clean Markdown.
            - Code blocks must be precise and optimized.`,
            temperature: 0.8, // Slightly higher for more "Tralala" creativity
        }
    });
};

/**
 * Generates an image using Gemini Flash 2.5 Image model
 * Returns a base64 data URL string.
 */
export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const apiKey = "AIzaSyCZ1D4U57fo1VrEI1TBho5zISN0hyOizXE";
    if (!apiKey) throw new Error("API Key missing");

    const ai = new GoogleGenAI({ apiKey });
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

    // Iterate through parts to find the image data safely with Optional Chaining
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
        const parts = candidates[0].content?.parts;
        if (parts) {
            for (const part of parts) {
                if (part.inlineData && part.inlineData.data) {
                    const base64EncodeString: string = part.inlineData.data;
                    // Provide a default fallback for mimeType to satisfy TypeScript
                    const mimeType = part.inlineData.mimeType || 'image/png';
                    return `data:${mimeType};base64,${base64EncodeString}`;
                }
            }
        }
    }
    
    throw new Error("No image data found in response.");
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate image. Please try a different prompt.");
  }
};