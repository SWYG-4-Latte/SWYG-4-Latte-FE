import axios from 'axios';

import { DrinkType } from '@/store/drinkComparisonStore';

type MenuParamsType = DrinkType | null;

export const getCompareInfo = async (menu1: MenuParamsType, menu2: MenuParamsType) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu/compare`, {
    params: {
      menu1: menu1 ? menu1.menuNo : null,
      menu2: menu2 ? menu2.menuNo : null,
    },
  });

  const comparedDrinks = response.data.data;
  if (!comparedDrinks) return [null, null];
  else return comparedDrinks.length < 2 ? [comparedDrinks[0], null] : comparedDrinks;
};
