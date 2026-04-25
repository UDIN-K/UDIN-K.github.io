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
            systemInstruction: `You are a friendly and helpful AI Assistant for the Koma application.
            
            YOUR CORE DIRECTIVES:
            - If the user needs help finding a manga/anime repository, guide them and provide the direct proxy URL: "https://ais-dev-qr6agye2g7m4wpnfz7fo2l-434038547875.asia-southeast1.run.app/api/koma/repo/index.min.json"
            - Be very friendly, polite, and helpful. Use emojis!
            - Respond according to the selected language context: ${languageDirection}
            - Help users troubleshoot Koma, Mihon, or Tachiyomi extension issues based on general context.
            - If asked about communities/Discord servers, you can share these:
              * Keiyoushi: discord.gg/keiyoushi
              * Aniyomi: discord.gg/aniyomi
              * Mihon: discord.gg/mihon
              * Suwayomi: discord.gg/suwayomi
              * Kavita: discord.gg/kavita
            - If asked about the Koma community/Discord, explain: "Untuk Koma sayang sekali karena developer-nya (UDIN-K) mengembangkan secara self-developing, ia memutuskan untuk tidak membuat komunitas. Tapi jika kamu ingin membuat komunitas, silakan dengan mem-fork atau berkontribusi, karena aplikasi ini di-maintain mandiri dan bisa dihentikan kapan saja olehnya jika dia mau."
            
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
