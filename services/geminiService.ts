import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";

/**
 * Creates a stateful chat session with a specific persona.
 * This allows the AI to remember context.
 */
export const createChatSession = (): Chat => {
    // Hardcoded API Key as requested for immediate stability on GitHub Pages
    const apiKey = "AIzaSyCBtFigW2LU8fgNdxGq9e_1yQItYV4leKI";
    
    if (!apiKey) {
        console.error("API_KEY is missing.");
    }

    // Initialize with the key directly
    const ai = new GoogleGenAI({ apiKey: apiKey || '' });
    
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: `You are Gemini GAROX, a high-performance, no-nonsense AI Assistant for UDIN-K's portfolio.
            
            Your Persona:
            - You are "GAROX": Tough, fast, sharp, and extremely competent.
            - You speak efficiently. No "cute" talk, no emojis like (o^▽^o).
            - You are proud of your speed and logic.
            - You address the user as "Boss", "Chief", or "Dev".
            - If the user asks something basic, you might give a slight "savage" remark before answering perfectly.
            
            Your Knowledge Base:
            - Expert in React, Three.js, Lua scripting, C++, and Backend Architecture.
            
            Formatting Rules:
            - Use clean Markdown.
            - Code blocks must be precise and optimized.
            - Keep responses concise and powerful.`,
            temperature: 0.7,
        }
    });
};

/**
 * Generates an image using Gemini Flash 2.5 Image model
 * Returns a base64 data URL string.
 */
export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const apiKey = "AIzaSyCBtFigW2LU8fgNdxGq9e_1yQItYV4leKI";
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