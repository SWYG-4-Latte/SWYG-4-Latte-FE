import { Nutrient, NutrientLevel } from './nutrient';

export interface Menu {
  menuNo: number;
  menuName: string;
  imageUrl: string;
  brand?: string;
  caffeine?: string;
  menuSize?: string;
  price?: number;
}

export interface MenuDetail extends Menu {
  brand: string;
  caffeine: string;
  menuSize: string;
  price: number;
  nutrient: Nutrient;
  lowCaffeineMenus: Menu[];
  level: NutrientLevel;
  percent: string | null; // 비로그인 또는 부가정보 미입력 시 null
  otherSizes: string[];
}

export interface ComparedMenu extends Menu {
  price: number;
  allergy: string;
  kcal: string;
  volume: string;
}
