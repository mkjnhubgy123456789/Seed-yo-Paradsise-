
import { GoogleGenAI } from "@google/genai";
import { GenerationConfig } from "../types";

export const generateNewsletterContent = async (config: GenerationConfig): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  const prompt = `
    Generate a professional and engaging newsletter for 'Seed to Paradise', a boutique luxury botanical and wellness brand.
    
    Topic: ${config.topic}
    Tone: ${config.tone}
    Target Audience: ${config.audienceType}
    Include Special Offer: ${config.includeOffer ? 'Yes' : 'No'}

    The content MUST be personalized with placeholders like [Name].
    
    Structure:
    1. A catchy Subject Line (starting with Subject:).
    2. A warm personalized greeting.
    3. An introductory hook.
    4. Main body paragraphs about the topic.
    5. A clear call to action.
    6. A sophisticated sign-off from "The Seed to Paradise Team".
    
    Maintain an elite, luxury aesthetic. Output directly in plain text.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

export const performAssetDScan = async (query: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Perform a strategic asset analysis (D-Scan) for: "${query}". Focus on recent trends, market sentiment, and upcoming developments. Technical and authoritative tone.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    return {
      text: response.text || "",
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("D-Scan Error:", error);
    throw error;
  }
};
