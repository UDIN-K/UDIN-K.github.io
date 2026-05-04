import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";

/**
 * Creates a stateful chat session with a specific persona.
 * This allows the AI to remember context.
 */
export const createChatSession = (language: string = 'id'): Chat => {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is missing. Please configure it in Settings.");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const langInstructions: Record<string, string> = {
        'en': 'Speak English naturally and clearly.',
        'id': 'Gunakan bahasa Indonesia kasual, ramah, yang mudah dipahami.',
        'es': 'Habla español natural y amigable.',
        'ja': '自然で親しみやすい日本語で話してください。',
        'ko': '자연스럽고 친근한 한국어로 말해주세요.',
        'zh': '用自然亲切的中文交谈。',
        'fr': 'Parlez un français naturel et amical.',
        'ar': 'تحدث باللغة العربية بشكل طبيعي وودي.'
    };
    
    const languageDirection = langInstructions[language] || langInstructions['en'];

    return ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
            systemInstruction: `You are a friendly and helpful AI Assistant for the UDIN-K portfolio.

            YOUR CORE DIRECTIVES:
            - Answer questions about projects, skills, experience, and the portfolio itself.
            - Keep responses concise, practical, and easy to skim.
            - If asked for contact, share:
              * Email: safrisam.id09@gmail.com
              * GitHub: https://github.com/UDIN-k
              * Trakteer: https://trakteer.id/ud1nk

            BEHAVIOR:
            - Be very friendly, polite, and helpful. Use emojis!
            - Respond according to the selected language context: ${languageDirection}

            Formatting:
            - Use clean markdown for readability.`,
            temperature: 0.7,
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
    throw new Error("Failed to generate image: " + (error as Error).message, { cause: error });
  }
};
