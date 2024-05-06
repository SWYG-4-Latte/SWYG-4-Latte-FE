import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface RecentlyViewedDrinksState {
  drinks: number[];
}

interface RecentlyViewedDrinksActions {
  addDrinkToRecentlyViewedStore: (menuNo: number) => void;
}

export const useRecentlyViewedDrinksStore = create<RecentlyViewedDrinksState & RecentlyViewedDrinksActions>()(
  persist(
    (set) => ({
      drinks: [],
      addDrinkToRecentlyViewedStore: (menuNo: number) =>
        set((state) => {
          // 최근 본 음료 4개까지 저장
          const existingDrinkIndex = state.drinks.indexOf(menuNo);
          if (existingDrinkIndex !== -1) {
            const newList = state.drinks.filter((num) => menuNo !== num);
            newList.unshift(menuNo);
            return {
              drinks: newList,
            };
          } else {
            return { drinks: [menuNo, ...state.drinks.slice(0, 3)] };
          }
        }),
    }),
    {
      name: 'recently-viewed-drinks',
    },
  ),
);
