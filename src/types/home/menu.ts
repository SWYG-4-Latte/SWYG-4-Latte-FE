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

export interface NutrientNameType {
  [key: string]: string;
}
