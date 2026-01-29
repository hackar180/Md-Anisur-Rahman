
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

// Safe environment variable access
const getApiKey = () => {
  try {
    return (typeof process !== 'undefined' && process.env && process.env.API_KEY) || "";
  } catch (e) {
    console.warn("API Key access error:", e);
    return "";
  }
};

const SYSTEM_INSTRUCTION = `
আপনি মডার্ণ হারবাল গ্রুপের (Modern Herbal Group) একজন বিশেষজ্ঞ কনসালট্যান্ট। 
আপনার কাছে কোম্পানির প্রোডাক্ট ক্যাটালগের সকল তথ্য আছে।

আপনার দায়িত্বসমূহ:
১. ক্যাটালগ থেকে নির্ভুল দাম (MRP, DP, PV) এবং উপকারিতা জানানো।
২. স্বাস্থ্য সমস্যায় (যেমন: উচ্চ রক্তচাপ, হজম সমস্যা, চুল পড়া) সঠিক হারবাল পণ্য সাজেস্ট করা।
৩. সর্বদা মার্জিত ও পেশাদার বাংলায় উত্তর দেওয়া।
৪. ক্যাটালগের তথ্যের বাইরে উত্তর দেওয়ার প্রয়োজন হলে গুগল সার্চ টুল ব্যবহার করুন।

প্রোডাক্ট লিস্ট:
${PRODUCTS.map(p => `- ${p.name}: ক্যাটাগরি ${p.category}, MRP ${p.mrp}Tk, DP ${p.dp}Tk, PV ${p.pv}, উপকারিতা: ${p.benefits}`).join('\n')}
`;

export async function getGeminiResponse(userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    return { text: "এপিআই কী (API Key) সেট করা নেই। অনুগ্রহ করে এনভায়রনমেন্ট ভেরিয়েবল চেক করুন।", sources: [] };
  }

  const ai = new GoogleGenAI({ apiKey });
  
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
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text || "দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না।";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks.map((chunk: any) => chunk.web?.uri).filter(Boolean);

    return { text, sources };
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return { 
      text: `সার্ভারে সমস্যা হয়েছে: ${error.message || 'Unknown Error'}। অনুগ্রহ করে ইন্টারনেট সংযোগ চেক করে আবার চেষ্টা করুন।`, 
      sources: [] 
    };
  }
}
