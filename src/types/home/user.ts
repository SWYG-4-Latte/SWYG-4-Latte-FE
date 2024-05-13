import { Menu } from '../menu/menu';

export interface UserCaffeineData {
  nickname: string;
  status: string;
  today: string;
  interval: string;
  recent: Menu[];
}
