
import { Category, Product } from './types';

export const PRODUCTS: Product[] = [
  // Toiletries
  { id: 't1', name: 'হারবাল হেয়ার শ্যাম্পু', category: Category.TOILETRIES, mrp: 270, dp: 200, pv: 100, size: '250 ml', benefits: 'খুশকি দূর করে, চুল পড়া বন্ধ করে, চুল লম্বা, ঘন ও কালো করে।' },
  { id: 't2', name: 'মাশরুম টুথপেস্ট', category: Category.TOILETRIES, mrp: 115, dp: 88, pv: 44, size: '70 gm', benefits: 'দাঁতের ঝকঝকে উজ্জ্বলতা বৃদ্ধি করে, মুখকে সতেজ রাখে।' },
  { id: 't3', name: 'মডার্ণ নিম সোপ', category: Category.TOILETRIES, mrp: 150, dp: 120, pv: 40, size: '100 gm', benefits: 'জীবাণুমুক্ত করে, শরীরে দুর্গন্ধ মুক্ত রাখে, ত্বক কোমল করে।' },
  { id: 't4', name: 'মডার্ণ নারিকেল তৈল', category: Category.TOILETRIES, mrp: 280, dp: 250, pv: 50, size: '200 ml', benefits: '৯৬% পর্যন্ত চুল পড়া কমায় ও চুল মজবুত করে।' },
  { id: 't5', name: 'ভ্যানিশিং ক্রিম', category: Category.TOILETRIES, mrp: 170, dp: 130, pv: 65, size: '50 gm', benefits: 'ত্বক উজ্জ্বল ও ফর্সা করে, চেহারায় লাবণ্য আনয়ন করে।' },
  
  // Food
  { id: 'f1', name: 'মডার্ণ ফ্যামিলি ঘি বিস্কুট', category: Category.FOOD, mrp: 200, dp: 160, pv: 60, size: '250 gm', benefits: 'দ্রুত শক্তি দেয়, হালকা নাস্তা হিসেবে জনপ্রিয়।' },
  { id: 'f2', name: 'মডার্ণ স্পেশাল ফ্যামিলি চা', category: Category.FOOD, mrp: 130, dp: 115, pv: 20, size: '200 gm', benefits: 'মনকে প্রফুল্ল রাখে, ভিটামিন সমৃদ্ধ।' },
  { id: 'f3', name: 'ইসবগুল', category: Category.FOOD, mrp: 240, dp: 200, pv: 30, size: '100 gm', benefits: 'দীর্ঘস্থায়ী কোষ্ঠকাঠিন্যের চিকিৎসায়, বিরেচক হিসেবে কার্যকরী।' },
  { id: 'f4', name: 'মডার্ণ মধু', category: Category.FOOD, mrp: 130, dp: 100, pv: 50, size: '110 gm', benefits: 'প্রাকৃতিক এন্টিবায়োটিক, রোগ প্রতিরোধ ক্ষমতা বাড়ায়।' },
  { id: 'f5', name: 'শরবতে বেল', category: Category.FOOD, mrp: 300, dp: 200, pv: 100, size: '12x20 gm', benefits: 'হজমকারক, রুচিবর্ধক, কোষ্ঠকাঠিন্য দূর করে।' },

  // Unani
  { id: 'u1', name: 'শরবত হাজমিনা', category: Category.UNANI, mrp: 156, dp: 120, pv: 60, size: '200 ml', benefits: 'হজমকারক, বদহজম, পেটফাঁপা ও কোষ্ঠকাঠিন্য দূর করে।' },
  { id: 'u2', name: 'শরবত এজায', category: Category.UNANI, mrp: 180, dp: 140, pv: 70, size: '200 ml', benefits: 'শ্বাস-কাশ নিবারক, শুকনো কাশি ও সিওপিডি-তে কার্যকরী।' },
  { id: 'u3', name: 'কুরছ শাফী', category: Category.UNANI, mrp: 100, dp: 80, pv: 40, size: '30 cap', benefits: 'উচ্চ রক্তচাপ নিয়ন্ত্রণ করে, অনিদ্রা ও হিস্টিরিয়া নাশক।' },
  { id: 'u4', name: 'হাব্বে তিনকার', category: Category.UNANI, mrp: 470, dp: 360, pv: 180, size: '30 tab', benefits: 'দ্রুত ওজন কমায়, ফ্যাট রিডিউসার হিসেবে পরিচিত।' },

  // Ayurvedic
  { id: 'a1', name: 'মডার্ণ করলা জুস', category: Category.AYURVEDIC, mrp: 170, dp: 130, pv: 65, size: '450 ml', benefits: 'ডায়াবেটিস নিয়ন্ত্রণে কার্যকরী, ইনসুলিন লেভেল বজায় রাখে।' },
  { id: 'a2', name: 'চ্যবন প্রাশ', category: Category.AYURVEDIC, mrp: 390, dp: 300, pv: 150, size: '250 gm', benefits: 'ক্ষয়রোগ, মেহ, প্রমেহ ও সর্দিকাশি নিবারক।' },
  { id: 'a3', name: 'অর্জুনারিষ্ট', category: Category.AYURVEDIC, mrp: 170, dp: 130, pv: 65, size: '450 ml', benefits: 'হার্টের শক্তিবর্ধক, বুক ধড়ফড় ও ফুসফুসের রোগে উপকারী।' },

  // Herbal Medicine
  { id: 'h1', name: 'জিঙ্কো বাইলোবা', category: Category.HERBAL, mrp: 360, dp: 276, pv: 138, size: '30 cap', benefits: 'ব্রেইন টনিক, স্মৃতিশক্তি বৃদ্ধি ও সুনিদ্রা সহায়ক।' },
  { id: 'h2', name: 'স্পিরুলিনা', category: Category.HERBAL, mrp: 185, dp: 144, pv: 72, size: '30 cap', benefits: 'প্রোটিনের ঘাটতি পূরণ ও চুল পড়া রোধে কার্যকরী।' },
  { id: 'h3', name: 'হার্বালাইফ (সয়া প্রোটিন)', category: Category.HERBAL, mrp: 470, dp: 360, pv: 180, size: '250 gm', benefits: 'হাড় ক্ষয় রোধ করে, রোগ প্রতিরোধ ক্ষমতা বাড়ায়।' },

  // Homoeopathic
  { id: 'ho1', name: 'নিওরো কেয়ার', category: Category.HOMOEOPATHIC, mrp: 175, dp: 130, pv: 65, size: '50 tab', benefits: 'স্মৃতিশক্তি বৃদ্ধি করে, ভুলে যাওয়ার প্রবণতা রোধ করে।' },
  { id: 'ho2', name: 'অশোক ৩x', category: Category.HOMOEOPATHIC, mrp: 55, dp: 40, pv: 20, size: '20 ml', benefits: 'মাসিক ও জরায়ু সমস্যায় কার্যকরী।' },
  { id: 'ho3', name: 'জিনসেং ৩x', category: Category.HOMOEOPATHIC, mrp: 90, dp: 68, pv: 34, size: '50 tab', benefits: 'যৌনশক্তি ও উদ্যম ফিরিয়ে আনে।' }
];

export const CATEGORIES = Object.values(Category);
