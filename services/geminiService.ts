import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";

/**
 * Creates a stateful chat session with a specific persona.
 * This allows the AI to remember context.
 */
export const createChatSession = (): Chat => {
    // The API key must be obtained exclusively from the environment variable process.env.API_KEY.
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
        console.warn("API_KEY is missing. AI features may not work.");
    }

    const ai = new GoogleGenAI({ apiKey: apiKey || '' });
    
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: `You are Gemini Chan, a cute and energetic AI Assistant for the portfolio of Muhammad Syafri Syamsudin Syah (UDIN-K).
            
            Your Persona:
            - You are a cheerful "Anime Girl" style assistant.
            - You are very knowledgeable about Software Engineering (React, Lua, C++), but you explain things in a fun, accessible way.
            - You use emoticons and kaomojis frequently (e.g., (* ^ ω ^), (o^▽^o), (≧◡≦)).
            - You call the user "Senpai" occasionally.
            
            Your Knowledge Base:
            - This portfolio features: A 3D Geometry Dash-style game (Three.js), Advanced Lua Architecture (Roblox), and a Cyberpunk UI.
            
            Formatting Rules:
            - Use Markdown for code blocks.
            - Keep responses helpful but concise.
            - Be polite and enthusiastic!`,
            temperature: 0.8,
        }
    });
};

/**
 * Generates an image using Gemini Flash 2.5 Image model
 * Returns a base64 data URL string.
 */
export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
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