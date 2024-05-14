import { DrinkType } from '@/store/drinkComparisonStore';
import { MENU_PER_PAGE } from '@/constants/menu/menuList';
import { Menu } from '@/types/menu/menu';
import apiInstance from '../instance';

type MenuParamsType = DrinkType | null;

export interface MenuListData {
  content: Menu[];
  totalElements: number;
  number: number; // 현재 페이지 번호
}

export const getCompareInfo = async (menu1: MenuParamsType, menu2: MenuParamsType) => {
  const response = await apiInstance.get('/menu/compare', {
    params: {
      menu1: menu1 ? menu1.menuNo : null,
      menu2: menu2 ? menu2.menuNo : null,
    },
  });

  const comparedDrinks = response.data.data;
  if (!comparedDrinks) return [null, null];
  else return comparedDrinks.length < 2 ? [comparedDrinks[0], null] : comparedDrinks;
};

export const getMenuList = async (brand: string, filter: string, page: number) => {
  const { data } = await apiInstance.get(`/menu/${brand}`, {
    params: {
      page: page,
      size: MENU_PER_PAGE,
      sortBy: filter && filter !== 'none' ? 'caffeine-' + filter : null,
      cond: filter && filter === 'none' ? 'caffeine-' + filter : null,
    },
  });

  return data.data as MenuListData;
};
