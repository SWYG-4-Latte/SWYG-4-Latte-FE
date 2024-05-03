import { Menu } from './menu';

export interface CaffeineData {
  status: string;
  today: string;
  interval: string;
}
export interface DrinkHistoryDetailProps {
  drinkHistoryData?: Menu;
  heading?: string;
  description?: string;
}

export interface DrinkHistorySwiperProps {
  drinkHistoryData: DrinkHistoryDetailProps[];
}
