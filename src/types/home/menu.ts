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
  price: number;
  nutrient: Nutrient;
  lowCaffeineMenus: Menu[];
  level: NutrientLevel;
  percent: string | null; // 비로그인 또는 부가정보 미입력 시 null
}

export interface ComparedMenu extends Menu {
  price: number;
  allergy: string;
  kcal: string;
  volume: string;
}

export interface Nutrient {
  kcal: string;
  sugar: string;
  salt: string;
  protein: string;
  satFat: string;
}

export type NutrientLevelType = '높음' | '보통' | '낮음';
export interface NutrientLevel {
  kcalLevel: NutrientLevelType;
  sugarLevel: NutrientLevelType;
  saltLevel: NutrientLevelType;
  proteinLevel: NutrientLevelType;
  satFatLevel: NutrientLevelType;
}

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
