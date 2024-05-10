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
