
import { Category, Product } from './types';

export const PRODUCTS: Product[] = [
  // Herbal Toiletries (Page 3-7 of PDF)
  { 
    id: 't1', 
    name: 'হারবাল হেয়ার শ্যাম্পু', 
    category: Category.TOILETRIES, 
    mrp: 270, dp: 200, pv: 100, 
    size: '250 ml', 
    benefits: 'খুশকি দূর করে, চুল পড়া বন্ধ করে, চুল লম্বা, ঘন ও কালো করে। অ্যালোভেরা ও আমলকী সমৃদ্ধ।', 
    imageUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 't2', 
    name: 'মাশরুম টুথপেস্ট', 
    category: Category.TOILETRIES, 
    mrp: 115, dp: 88, pv: 44, 
    size: '70 gm', 
    benefits: 'দাঁতের ঝকঝকে উজ্জ্বলতা বৃদ্ধি করে, মুখ সতেজ রাখে, মাড়ির ব্যথা ও পায়োরিয়া দূর করে।', 
    imageUrl: 'https://images.unsplash.com/photo-1559591937-e3b2ae26ec2f?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 't3', 
    name: 'মডার্ণ নিম সোপ', 
    category: Category.TOILETRIES, 
    mrp: 150, dp: 120, pv: 40, 
    size: '100 gm', 
    benefits: 'জীবাণুমুক্ত করে, শরীরে দুর্গন্ধ মুক্ত রাখে, ত্বক কোমল ও প্রাণবন্ত করে।', 
    imageUrl: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 't4', 
    name: 'মডার্ণ নারিকেল তেল', 
    category: Category.TOILETRIES, 
    mrp: 280, dp: 250, pv: 50, 
    size: '200 ml', 
    benefits: '৯৬% পর্যন্ত চুল পড়া কমায় ও চুল মজবুত করে। মাথা ঠান্ডা রাখে ও সুনিদ্রা আনে।', 
    imageUrl: 'https://images.unsplash.com/photo-1628102480749-9c59508544e3?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 't5', 
    name: 'এমএক্সএন বস (সুগন্ধি)', 
    category: Category.TOILETRIES, 
    mrp: 375, dp: 320, pv: 75, 
    size: '30 ml', 
    benefits: 'সুগন্ধি আনয়ন করে, ঘামের দুর্গন্ধ প্রতিরোধ করে ও মনকে সতেজ রাখে।', 
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=400&auto=format&fit=crop' 
  },

  // Modern Food (Page 8-10 of PDF)
  { 
    id: 'f1', 
    name: 'মডার্ণ মধু', 
    category: Category.FOOD, 
    mrp: 130, dp: 100, pv: 50, 
    size: '110 gm', 
    benefits: 'প্রাকৃতিক এন্টিবায়োটিক, রোগ প্রতিরোধ ক্ষমতা বাড়াতে ও সর্দি-কাশিতে দারুণ কার্যকর।', 
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 'f2', 
    name: 'ইসবগুল', 
    category: Category.FOOD, 
    mrp: 240, dp: 200, pv: 30, 
    size: '100 gm', 
    benefits: 'দীর্ঘস্থায়ী কোষ্ঠকাঠিন্যের চিকিৎসায়, বিরেচক হিসেবে ও ডায়রিয়া চিকিৎসায় ব্যবহৃত হয়।', 
    imageUrl: 'https://images.unsplash.com/photo-1614735241165-6756e1df61ab?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 'f3', 
    name: 'সুপার চা', 
    category: Category.FOOD, 
    mrp: 130, dp: 115, pv: 20, 
    size: '200 gm', 
    benefits: 'প্রাকৃতিকভাবেই মডার্ণ চায়ে রয়েছে থায়ামিন যা মনকে সতেজ ও প্রফুল্ল রাখে।', 
    imageUrl: 'https://images.unsplash.com/photo-1544787210-2213d24276f7?q=80&w=400&auto=format&fit=crop' 
  },

  // Unani Medicine (Page 11-13 of PDF)
  { 
    id: 'u1', 
    name: 'শরবত হাজমিনা', 
    category: Category.UNANI, 
    mrp: 156, dp: 120, pv: 60, 
    size: '200 ml', 
    benefits: 'বদহজম, পেটফাঁপা, বায়ুজনিত পেটব্যথা নিবারক ও কোষ্ঠ পরিষ্কারক।', 
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 'u2', 
    name: 'হাব্বে তিনকার', 
    category: Category.UNANI, 
    mrp: 470, dp: 360, pv: 180, 
    size: '30 tab', 
    benefits: 'দ্রুত ওজন কমায়, অতিরিক্ত চর্বি ও কোলেস্টেরল কমাতে কার্যকরী ট্যাবলেট।', 
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-ad5f9f81ce4c?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 'u3', 
    name: 'কুরছ শাফী', 
    category: Category.UNANI, 
    mrp: 100, dp: 80, pv: 40, 
    size: '30 cap', 
    benefits: 'উচ্চ রক্তচাপ নিয়ন্ত্রণ করে, অনিদ্রা, উন্মাদ ও হিষ্টিরিয়া রোগে কার্যকর।', 
    imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=400&auto=format&fit=crop' 
  },

  // Ayurvedic (Page 14-15)
  { 
    id: 'a1', 
    name: 'মডার্ণ করলা জুস', 
    category: Category.AYURVEDIC, 
    mrp: 170, dp: 130, pv: 65, 
    size: '450 ml', 
    benefits: 'অ্যান্টিঅক্সিডেন্ট ও দ্রুত ডায়াবেটিস নিয়ন্ত্রণে কার্যকরী। এনজাইম উপাদান রক্তে শর্করার পরিমাণ নিয়ন্ত্রণ করে।', 
    imageUrl: 'https://images.unsplash.com/photo-1615485500704-8e990f3900f7?q=80&w=400&auto=format&fit=crop' 
  }
];

export const CATEGORIES = Object.values(Category);

export const BUSINESS_INFO = {
  company: "MXN Modern Herbal Food Ltd",
  founder: "লায়ন ডা. আলমগীর মতি",
  established: "১৯৭৯ সাল",
  address: "রাইন রাজ্জাক প্লাজা, মগবাজার, ঢাকা",
  certificates: ["BSTI", "ISO", "HACCP", "GMP", "FDA", "HALAL"],
  contact: {
    name: "MXN Anisur Rahman",
    rank: "Upcoming BS",
    phone: "01614997405",
    whatsapp: "https://chat.whatsapp.com/LoXe8964UKSIiUJ6iPfmUy",
    messenger: "https://m.me/j/AbY0-Vlqtv0pW5VP/"
  },
  incomeSources: [
    "খুচরা লাভ – ৩০% (Retail Profit)",
    "ডাইরেক্ট বোনাস – ৩৮%",
    "গ্রুপ বোনাস – ২%–২৫%",
    "লিডারশিপ ও স্ট্যাটাস ইনকাম",
    "গাড়ি, বাড়ি, হজ্জ ইনসেনটিভ",
    "মৃত্যোত্তর ভাতা: ৳৪–১৯ লক্ষ"
  ],
  membership: {
    general: {
      title: "সাধারণ মেম্বার সুবিধা",
      benefits: [
        "৩০% কমিশনে পণ্য ক্রয়",
        "ফ্রি ডাক্তারি সেবা",
        "১০০ পয়েন্টে ১৫%–৩৮% টাকা ফেরত"
      ]
    },
    vip: {
      title: "MBO / VIP মেম্বার সুবিধা",
      cost: "৫০০ পয়েন্ট (৳১০০০–৳১৫০০) + ID ফি ৳৩১০",
      benefits: [
        "আনলিমিটেড জয়েনিং করানোর সুবিধা",
        "নিজস্ব টিম গঠন ও পরিচালনা",
        "গ্রুপ সেলসে ২%–২৫% কমিশন",
        "১৬টি ভিন্ন ইনকাম সোর্স"
      ]
    }
  }
};
