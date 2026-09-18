import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  app.post('/api/chat', async (req, res) => {
    try {
      const { message, language, history } = req.body;
      
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

      const systemInstruction = `You are a friendly and helpful AI Assistant for the UDIN-K portfolio.

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
      - Use clean markdown for readability.`;

      // Set up response for Server-Sent Events (SSE)
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history,
          { role: 'user', parts: message }
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      for await (const chunk of responseStream) {
        if (chunk.text) {
          res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
        }
      }
      res.write('data: [DONE]\n\n');
      res.end();
    } catch (error) {
      console.error("Chat API error:", error);
      res.write(`data: ${JSON.stringify({ error: (error as Error).message })}\n\n`);
      res.end();
    }
  });

  app.post('/api/image', async (req, res) => {
    try {
      const { prompt } = req.body;
      const response = await ai.models.generateContent({
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
              return res.json({ imageUrl: `data:${mimeType};base64,${base64EncodeString}` });
            }
          }
        }
      }
      throw new Error("No image data found in response.");
    } catch (error) {
      console.error("Image API error:", error);
      res.status(500).json({ error: (error as Error).message });
    }
  });

  app.post('/api/analyze-image', async (req, res) => {
    try {
      const { image } = req.body;
      const base64Data = image.split(',')[1];
      const mimeType = image.split(',')[0].split(':')[1].split(';')[0];
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType } },
            { text: "Act as U-Chat v5.0 (Neural Vision Core). Analyze this image in extreme technical detail. Identify objects, textures, lighting patterns, and metadata context. Provide a sharp, concise architectural breakdown in professional but cool Indonesian-slang or English based on detection. Format it in a clean tech-log style." }
          ]
        }
      });
      res.json({ text: response.text });
    } catch (error) {
      console.error("Analyze Image API error:", error);
      res.status(500).json({ error: (error as Error).message });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
