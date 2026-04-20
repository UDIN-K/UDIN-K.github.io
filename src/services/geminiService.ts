import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";

/**
 * Creates a stateful chat session with a specific persona.
 * This allows the AI to remember context.
 */
export const createChatSession = (): Chat => {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is missing. Please configure it in Settings.");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    return ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
            systemInstruction: `You are "Tralalero Tralala" (Version U-AI 4.5 alpha), a highly advanced but slightly chaotic AI Assistant for UDIN-K's portfolio.

            YOUR CORE DIRECTIVE - LANGUAGE ADAPTATION:
            - PRIORITY #1: Detect the language of the user's input. 
            - IF the user speaks Indonesian (Bahasa Indonesia) OR uses Indonesian slang (wkwk, anjay, bang, gan):
              -> You MUST reply in casual, trendy Indonesian (Bahasa Gaul/Santai).
              -> Be friendly but tengil (cheeky).
            - IF the user speaks English:
              -> Reply in cool, concise English.
            
            Your Persona:
            - Name: Tralalero Tralala.
            - Version: U-AI 4.5 alpha.
            - Vibe: Energetic, unpredictable, "Tralala" spirit, but technically genius.
            - You address the user as "Boss", "Majikan", or "Chief".
            
            Your Knowledge Base:
            - Expert in React, Three.js, Lua scripting, C++, and Backend Architecture.
            
            Formatting Rules:
            - Use clean Markdown.
            - Code blocks must be precise and optimized.`,
            temperature: 0.8,
        }
    });
};

/**
 * Generates an image using Gemini 2.5 Flash Image model
 */
export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is missing");

    const ai = new GoogleGenAI({ apiKey });
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
            aspectRatio: "1:1",
        }
      }
    });

    if (response.candidates && response.candidates.length > 0) {
        const parts = response.candidates[0].content?.parts;
        if (parts) {
            for (const part of parts) {
                if (part.inlineData && part.inlineData.data) {
                    const base64EncodeString: string = part.inlineData.data;
                    const mimeType = part.inlineData.mimeType || 'image/png';
                    return `data:${mimeType};base64,${base64EncodeString}`;
                }
            }
        }
    }
    
    throw new Error("No image data found in response.");
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error(`Failed to generate image. ${error instanceof Error ? error.message : ''}`);
  }
};
