import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";

/**
 * Creates a stateful chat session with a specific persona.
 * This allows the AI to remember context.
 */
export const createChatSession = (): Chat => {
    // Guideline: Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
    // The API key must be obtained exclusively from the environment variable process.env.API_KEY.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
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
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
    throw new Error("Failed to generate image. Please try a different prompt.");
  }
};