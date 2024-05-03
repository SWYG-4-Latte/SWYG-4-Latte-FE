import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Menu } from '@/types/home/menu';
interface Drink {
  menuNo: number;
  imageUrl: string; // 메뉴 상세에서 음료 이미지 보여줘야 함
}

interface DrinkComparisonState {
  drinks: (Drink | null)[];
}

interface DrinkComparisonActions {
  addDrink: (menu: Menu) => void;
  isDrinkExist: (menuNo: number) => boolean;
  deleteDrinkFromComparisonBox: (menuNo: number) => void;
  deleteAllDrinks: () => void;
  isFull: () => boolean;
}

export const useDrinkComparisonStore = create<DrinkComparisonState & DrinkComparisonActions>()(
  persist(
    (set, get) => ({
      drinks: [null, null],
      addDrink: (menu: Menu) =>
        set((state) => {
          const { menuNo, imageUrl } = menu;

          // 비어 있는 자리에 음료 추가
          const addIndex = state.drinks.indexOf(null);
          const newItem = {
            menuNo,
            imageUrl,
          };

          return { drinks: state.drinks.map((drinkMenu, idx) => (idx === addIndex ? newItem : drinkMenu)) };
        }),
      deleteDrinkFromComparisonBox: (menuNo: number) =>
        set((state) => {
          // 삭제할 음료가 아닌 음료의 index
          const maintainedDrinkMenuNoIdx = state.drinks.findIndex((drinkMenu) => drinkMenu?.menuNo !== menuNo);

          return { drinks: [state.drinks[maintainedDrinkMenuNoIdx], null] };
        }),
      deleteAllDrinks: () => set({ drinks: [null, null] }),
      isDrinkExist: (menuNo: number) => {
        return get().drinks.some((drinkMenu) => drinkMenu?.menuNo === menuNo);
      },
      isFull: () => get().drinks.every((drinkMenu) => drinkMenu !== null),
    }),
    {
      name: 'drink-comparison-items',
    },
  ),
);
