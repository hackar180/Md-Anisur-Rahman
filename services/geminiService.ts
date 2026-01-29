
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

const SYSTEM_INSTRUCTION = `
আপনি মডার্ণ হারবাল গ্রুপের (Modern Herbal Group) একজন বিশেষজ্ঞ কনসালট্যান্ট। 
আপনার কাছে কোম্পানির প্রোডাক্ট ক্যাটালগের সকল তথ্য আছে।

আপনার দায়িত্বসমূহ:
১. ক্যাটালগ থেকে নির্ভুল দাম (MRP, DP, PV) এবং উপকারিতা জানানো।
২. স্বাস্থ্য সমস্যায় (যেমন: উচ্চ রক্তচাপ, হজম সমস্যা, চুল পড়া) সঠিক হারবাল পণ্য সাজেস্ট করা।
৩. সর্বদা মার্জিত ও পেশাদার বাংলায় উত্তর দেওয়া।
৪. যদি কোনো তথ্য ক্যাটালগে না থাকে, তবে গুগল সার্চ ব্যবহার করে সাধারণ হারবাল জ্ঞান থেকে তথ্য দিন কিন্তু স্পষ্ট করে দিন যে এটি সাধারণ তথ্য।

প্রোডাক্ট লিস্ট:
${PRODUCTS.map(p => `- ${p.name}: ক্যাটাগরি ${p.category}, MRP ${p.mrp}Tk, DP ${p.dp}Tk, PV ${p.pv}, উপকারিতা: ${p.benefits}`).join('\n')}
`;

export async function getGeminiResponse(userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  // Always create a new instance to ensure fresh environment context
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
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
  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: "সার্ভারে সমস্যা হয়েছে। অনুগ্রহ করে ইন্টারনেট সংযোগ চেক করে আবার চেষ্টা করুন।", sources: [] };
  }
}
