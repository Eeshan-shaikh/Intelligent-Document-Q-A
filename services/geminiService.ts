
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const askQuestion = async (context: string, question: string): Promise<string> => {
  try {
    const prompt = `
      Based on the following document, please answer the question. Your answer should be concise and directly based on the information in the document. If the answer cannot be found in the document, state clearly that the information is not available in the provided text.

      --- DOCUMENT START ---
      ${context}
      --- DOCUMENT END ---

      Question: ${question}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get a response from the AI model.");
  }
};
