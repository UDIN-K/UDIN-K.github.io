import { AIChatMessage } from '../types';

export const sendMessageStream = async function* (messageParts: unknown, language: string, history: AIChatMessage[]) {
  const geminiHistory = history.filter(h => h.id !== 'welcome' && h.type === 'text' && h.content !== '').map(h => ({
    role: h.role,
    parts: [{ text: h.content }]
  }));

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: messageParts, language, history: geminiHistory })
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to send message');
  }

  const reader = res.body?.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  if (reader) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split('\n\n');
      buffer = parts.pop() || '';
      for (const part of parts) {
        if (part.startsWith('data: ')) {
          const dataStr = part.slice(6);
          if (dataStr === '[DONE]') {
            return;
          }
          try {
            const data = JSON.parse(dataStr);
            if (data.error) {
              throw new Error(data.error);
            }
            if (data.text) {
              yield data.text;
            }
          } catch (e) {
            console.error("Error parsing SSE data", e, dataStr);
          }
        }
      }
    }
  }
};

export const sendMessage = async (messageParts: unknown, language: string, history: AIChatMessage[] = []) => {
  const stream = sendMessageStream(messageParts, language, history);
  let fullText = '';
  for await (const chunk of stream) {
    if (chunk) fullText += chunk;
  }
  return { text: fullText };
};

/**
 * Generates an image using Gemini 2.5 Flash Image model
 */
// Mapped to our custom server-side API.
export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const res = await fetch('/api/image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to generate image.");
    }
    
    const data = await res.json();
    return data.imageUrl;
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate image: " + (error as Error).message, { cause: error });
  }
};
