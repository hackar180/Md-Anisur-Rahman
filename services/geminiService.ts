
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

const SYSTEM_INSTRUCTION = `
You are an expert consultant for MXN Modern Herbal Group. You have full access to the product catalog details.
Your goals:
1. Provide accurate pricing (MRP, DP, PV) and benefits for any product requested.
2. Suggest relevant products for health issues like blood pressure (উচ্চ রক্তচাপ), digestion (হজম সমস্যা), fatigue (ক্লান্তি), diabetes (ডায়াবেটিস), or hair fall (চুল পড়া).
3. Always respond in clear, polite Bengali.
4. If a piece of information is missing or you are unsure, state it clearly.
5. Reference specifically the MXN product list.

Current Product Context (Extracted from Catalog):
${PRODUCTS.map(p => `- ${p.name}: Category ${p.category}, MRP ${p.mrp}Tk, DP ${p.dp}Tk, PV ${p.pv}, Benefits: ${p.benefits}`).join('\n')}
`;

export async function getGeminiResponse(userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না।";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "সার্ভারে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।";
  }
}
