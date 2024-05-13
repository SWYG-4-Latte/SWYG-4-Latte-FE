import { Menu } from '../menu/menu';

export interface DrinkHistoryDetailProps {
  drinkHistoryData?: Menu;
  heading?: string;
  description?: string;
}

export interface DrinkHistorySwiperProps {
  drinkHistoryData: DrinkHistoryDetailProps[];
}
