import { Menu } from '../menu/menu';

export interface UserCaffeineData {
  nickname: string;
  status: string | null;
  today: string | null;
  interval: string | null;
  recent: Menu[];
}
