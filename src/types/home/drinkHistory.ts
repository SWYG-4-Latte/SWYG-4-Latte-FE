// API 나오면 수정 예정
export interface DrinkHistoryData {
  id: string;
  name: string;
  brand: string;
  caffeineAmount: number;
}

export interface DrinkHistoryDetailProps {
  drinkHistoryData?: DrinkHistoryData;
  heading?: string;
  description?: string;
}

export interface DrinkHistorySwiperProps {
  drinkHistoryData: DrinkHistoryDetailProps[];
}
