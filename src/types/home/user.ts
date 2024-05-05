import { Menu } from './menu';

export interface UserCaffeineData {
  nickname: string;
  status: string;
  today: string;
  interval: string;
  recent: Menu[];
}
