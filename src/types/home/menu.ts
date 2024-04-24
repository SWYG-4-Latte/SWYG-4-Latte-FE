export interface Menu {
  menuNo: number;
  menuName: string;
  imageUrl: string;
  brand?: string;
  caffeine?: string;
}

export interface MenuDetail extends Menu {
  nutrient: Nutrient;
  price: string;
  lowCaffeineMenus: Menu[];
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
