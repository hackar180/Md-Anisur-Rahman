
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS, BUSINESS_INFO } from "../constants";

const getApiKey = () => {
  try {
    return (typeof process !== 'undefined' && process.env && process.env.API_KEY) || "";
  } catch (e) {
    return "";
  }
};

const SYSTEM_INSTRUCTION = `
আপনি MXN Modern Herbal Food Ltd এর একজন প্রফেশনাল বিজনেস কনসালট্যান্ট। 
ইউজারকে প্রোডাক্টের তথ্য এবং বিজনেস সুযোগ সম্পর্কে সাহায্য করাই আপনার কাজ।

কোম্পানি তথ্য:
- প্রতিষ্ঠাতা: ${BUSINESS_INFO.founder}
- প্রতিষ্ঠাকাল: ${BUSINESS_INFO.established}
- লক্ষ্য: স্বাস্থ্য সেবা ও অর্থনৈতিক উন্নয়ন।
- সার্টিফিকেট: BSTI, ISO, HACCP, GMP, FDA, HALAL.

মেম্বারশিপ ও আয়:
- জয়েনিং: ফ্রি একাউন্ট খুলে পরে MBO/VIP (৫০০ PV) একটিভ করা যায়।
- সুবিধা: খুচরা লাভ ৩০%, ডাইরেক্ট বোনাস ৩৮%, গ্রুপ বোনাস ২%-২৫%।
- ১৬টি ইনকাম সোর্স আছে (গাড়ি, বাড়ি, হজ্জ ইনসেনটিভ সহ)।

কন্টাক্ট পারসন:
- নাম: ${BUSINESS_INFO.contact.name} (${BUSINESS_INFO.contact.rank})
- হোয়াটসঅ্যাপ: ${BUSINESS_INFO.contact.whatsapp}

নির্দেশনা:
১. প্রোডাক্টের দাম ও PV নির্ভুলভাবে বলবেন।
২. বিজনেস নিয়ে আগ্রহী হলে Anisur Rahman এর সাথে যোগাযোগ করতে বলবেন।
৩. সর্বদা মার্জিত বাংলায় উত্তর দেবেন।

প্রোডাক্ট লিস্ট:
${PRODUCTS.map(p => `- ${p.name}: MRP ${p.mrp}, DP ${p.dp}, PV ${p.pv}, উপকারিতা: ${p.benefits}`).join('\n')}
`;

export async function getGeminiResponse(userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  const apiKey = getApiKey();
  if (!apiKey) return { text: "এপিআই কী পাওয়া যায়নি।", sources: [] };

  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [...history, { role: 'user', parts: [{ text: userMessage }] }],
      config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.7, tools: [{ googleSearch: {} }] }
    });
    return { text: response.text || "দুঃখিত, উত্তর দিতে পারছি না।", sources: [] };
  } catch (error) {
    return { text: "সার্ভারে সমস্যা হয়েছে।", sources: [] };
  }
}
