
export enum Category {
  TOILETRIES = 'Herbal Toiletries',
  FOOD = 'Modern Food',
  UNANI = 'Unani Medicine',
  AYURVEDIC = 'Ayurvedic Medicine',
  HERBAL = 'Herbal Medicine',
  HOMOEOPATHIC = 'Homoeopathic Medicine',
  AGRO = 'Agro Pharma',
  PROKASHANI = 'Modern Prokashani'
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  mrp: number;
  dp: number;
  pv: number;
  size?: string;
  benefits: string;
  imageUrl?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
