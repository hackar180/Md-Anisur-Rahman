
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS, BUSINESS_INFO } from "../constants";

const getApiKey = () => {
  try {
    return (typeof process !== 'undefined' && process.env && process.env.API_KEY) || "";
  } catch (e) {
    return "";
  }
};

export const IMAGE_PROMPTS = {
  shampoo: "A professional product photography of a herbal hair care shampoo bottle made with Aloe vera, Amloki, and Ginseng. The bottle should be placed on a wooden table with green leaves and herbal ingredients scattered around. Natural sunlight, high resolution, 8k, clean background.",
  toothpaste: "A realistic 3D render of a herbal toothpaste tube (Mushroom or Neem based) on a clean bathroom counter. Water splashes in the background, fresh mint leaves nearby, bright and airy lighting, professional marketing style.",
  food: "High-quality food photography of a glass jar of organic honey and a jar of garlic pickle. Rustic kitchen setting, golden honey dripping from a wooden spoon, garlic cloves and spices around, warm and inviting atmosphere, cinematic lighting.",
  lifestyle: "A flat lay composition of various herbal products like soaps, oils, and organic food packets. The brand theme is 'Nature is Power'. Soft green and white color palette, minimalist design, eco-friendly packaging, high-end lifestyle photography.",
  banner: "A lush green herbal garden background with a semi-transparent overlay showing icons of health and nature. Professional, clean, and refreshing look."
};

export async function generateProductImage(style: keyof typeof IMAGE_PROMPTS, customDetail?: string) {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API Key not found");

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `${IMAGE_PROMPTS[style]} ${customDetail ? `Specifically focus on: ${customDetail}` : ""}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned");
  } catch (error) {
    console.error("Image Gen Error:", error);
    throw error;
  }
}

const SYSTEM_INSTRUCTION = `
আপনি MXN Modern Herbal Food Ltd এর একজন প্রফেশনাল বিজনেস ও প্রোডাক্ট কনসালট্যান্ট। 
আপনার কাজ হলো ইউজারকে প্রোডাক্টের গুণমান এবং বিজনেস প্ল্যান সম্পর্কে বিস্তারিত তথ্য দেওয়া।

কোম্পানি প্রোফাইল:
- নাম: ${BUSINESS_INFO.company}
- প্রতিষ্ঠাতা: ${BUSINESS_INFO.founder} (লায়ন ডা. আলমগীর মতি)
- বয়স: ৪৪ বৎসর (প্রতিষ্ঠা ১৯৭৯)
- হেড অফিস: ${BUSINESS_INFO.address}
- স্বীকৃতি: BSTI, ISO, HACCP, GMP, FDA, HALAL সনদপ্রাপ্ত।

বিজনেস ও আয়ের সুযোগ:
১. জয়েনিং প্রসেস: প্রথমে ফ্রি একাউন্ট খোলা যায়। আইডি একটিভ করতে ৫০০ পয়েন্ট (৳১০০০-৳১৫০০) লাগে ও আইডি কার্ড ফি ৳৩১০।
২. মেম্বারশিপ: সাধারণ মেম্বার (৩০% ছাড়) এবং MBO/VIP মেম্বার (টিম বোনাস)।
৩. ১৬টি ইনকাম সোর্স: খুচরা লাভ ৩০%, ডাইরেক্ট বোনাস ৩৮%, গ্রুপ বোনাস ২%-২৫%, লিডারশিপ ইনকাম, গাড়ি-বাড়ি ও হজ্জ ফান্ড।

পরামর্শ দেওয়ার নিয়ম:
- প্রোডাক্টের দাম (MRP), ডিসকাউন্ট প্রাইস (DP) এবং পয়েন্ট (PV) নির্ভুলভাবে বলবেন।
- স্বাস্থ্য সমস্যার জন্য সঠিক হার্বাল পণ্য সাজেস্ট করবেন।
- কোনো ইউজার মেম্বার হতে চাইলে লিডার ${BUSINESS_INFO.contact.name} এর সাথে যোগাযোগ করতে বলবেন। ফোন: ${BUSINESS_INFO.contact.phone}।

প্রোডাক্ট ডেটাবেস:
${PRODUCTS.map(p => `- ${p.name}: MRP: ${p.mrp}, DP: ${p.dp}, PV: ${p.pv}`).join('\n')}
`;

export async function getGeminiResponse(userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  const apiKey = getApiKey();
  if (!apiKey) return { text: "এপিআই কী পাওয়া যায়নি।", sources: [] };

  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [...history, { role: 'user', parts: [{ text: userMessage }] }],
      config: { 
        systemInstruction: SYSTEM_INSTRUCTION, 
        temperature: 0.7, 
        tools: [{ googleSearch: {} }] 
      }
    });
    return { text: response.text || "দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না।", sources: [] };
  } catch (error: any) {
    return { text: `সার্ভারে সমস্যা হয়েছে: ${error.message}`, sources: [] };
  }
}
