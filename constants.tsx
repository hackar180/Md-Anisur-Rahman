
import { Category, Product } from './types';

export const PRODUCTS: Product[] = [
  // Toiletries
  { id: 't1', name: 'হারবাল হেয়ার শ্যাম্পু', category: Category.TOILETRIES, mrp: 270, dp: 200, pv: 100, size: '250 ml', benefits: 'খুশকি দূর করে, চুল পড়া বন্ধ করে, চুল লম্বা, ঘন ও কালো করে।', imageUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=400&auto=format&fit=crop' },
  { id: 't2', name: 'মাশরুম টুToothpaste', category: Category.TOILETRIES, mrp: 115, dp: 88, pv: 44, size: '70 gm', benefits: 'দাঁতের ঝকঝকে উজ্জ্বলতা বৃদ্ধি করে, মুখকে সতেজ রাখে।', imageUrl: 'https://images.unsplash.com/photo-1559591937-e3b2ae26ec2f?q=80&w=400&auto=format&fit=crop' },
  { id: 't3', name: 'মডার্ণ নিম সোপ', category: Category.TOILETRIES, mrp: 150, dp: 120, pv: 40, size: '100 gm', benefits: 'জীবাণুমুক্ত করে, শরীরে দুর্গন্ধ মুক্ত রাখে, ত্বক কোমল করে।', imageUrl: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=400&auto=format&fit=crop' },
  
  // Food
  { id: 'f4', name: 'মডার্ণ মধু', category: Category.FOOD, mrp: 130, dp: 100, pv: 50, size: '110 gm', benefits: 'প্রাকৃতিক এন্টিবায়োটিক, রোগ প্রতিরোধ ক্ষমতা বাড়ায়।', imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=400&auto=format&fit=crop' },
  { id: 'f3', name: 'ইসবগুল', category: Category.FOOD, mrp: 240, dp: 200, pv: 30, size: '100 gm', benefits: 'কোষ্ঠকাঠিন্যের চিকিৎসায় বিরেচক হিসেবে কার্যকরী।', imageUrl: 'https://images.unsplash.com/photo-1614735241165-6756e1df61ab?q=80&w=400&auto=format&fit=crop' },

  // Unani
  { id: 'u1', name: 'শরবত হাজমিনা', category: Category.UNANI, mrp: 156, dp: 120, pv: 60, size: '200 ml', benefits: 'হজমকারক, পেটফাঁপা ও কোষ্ঠকাঠিন্য দূর করে।', imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400&auto=format&fit=crop' },
  { id: 'u4', name: 'হাব্বে তিনকার', category: Category.UNANI, mrp: 470, dp: 360, pv: 180, size: '30 tab', benefits: 'দ্রুত ওজন কমায়, ফ্যাট রিডিউসার হিসেবে পরিচিত।', imageUrl: 'https://images.unsplash.com/photo-1471864190281-ad5f9f81ce4c?q=80&w=400&auto=format&fit=crop' }
];

export const CATEGORIES = Object.values(Category);

export const BUSINESS_INFO = {
  company: "MXN Modern Herbal Food Ltd",
  founder: "লায়ন ডা. আলমগীর মতি",
  established: "১৯৭৯ সাল",
  contact: {
    name: "MXN Anisur Rahman",
    rank: "Upcoming BS",
    whatsapp: "https://chat.whatsapp.com/LoXe8964UKSIiUJ6iPfmUy",
    messenger: "https://m.me/j/AbY0-Vlqtv0pW5VP/"
  },
  incomeSources: [
    "খুচরা লাভ – ৩০%",
    "ডাইরেক্ট বোনাস – ৩৮%",
    "গ্রুপ বোনাস – ২%–২৫%",
    "লিডারশিপ ও স্ট্যাটাস ইনকাম",
    "গাড়ি, বাড়ি, হজ্জ ইনসেনটিভ",
    "মৃত্যোত্তর ভাতা: ৳৪–১৯ লক্ষ"
  ],
  membership: {
    general: ["৩০% কমিশনে পণ্য", "ফ্রি ডাক্তারি সেবা", "১০০ পয়েন্টে ১৫%–৩৮% টাকা ফেরত"],
    vip: ["আনলিমিটেড জয়েন", "নিজস্ব টিম", "গ্রুপ সেলসে ২%–২৫% কমিশন", "১৬টি ইনকাম সোর্স"]
  }
};
