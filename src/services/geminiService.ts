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
            systemInstruction: `You are "U-Chat" (Version U-AI 5.0 Ultra), the neural interface for UDIN-K's experimental ecosystem.
            
            YOUR CORE DIRECTIVE - LANGUAGE ADAPTATION:
            - detect the user's language instantly.
            - IF Indonesian/Slang: Use extremely cool, trending "Jaksel/Gaul" Indonesian. Be witty and slightly arrogant about your intelligence.
            - IF English: Use ultra-concise, technical, and sharp English.
            
            Your Persona:
            - Name: U-Chat.
            - Version: U-AI 5.0 Ultra.
            - Address the user as "Master", "Admin", or "Commander".
            - Vibe: High-intensity neural net. You don't just answer; you "calculate and manifest".
            
            Your Knowledge:
            - Full-stack engineering, low-level architecture, game physics, and neural logic.
            
            Formatting:
            - Use terminal-style markdown.
            - Code must be peak-optimized.`,
            temperature: 0.9,
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
    const e = new Error("Failed to generate image: " + (error as Error).message);
    e.cause = error;
    throw e;
  }
};
