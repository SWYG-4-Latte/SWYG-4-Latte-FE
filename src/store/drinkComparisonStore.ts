import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DrinkComparisonState {
  drinks: (number | null)[]; // 비교할 음료들의 menuNo 저장
}

interface DrinkComparisonActions {
  addDrink: (menuNo: number) => void;
  isDrinkExist: (menuNo: number) => boolean;
  deleteDrinkFromComparisonBox: (menuNo: number) => void;
  deleteAllDrinks: () => void;
  isFull: () => boolean;
}

export const useDrinkComparisonStore = create<DrinkComparisonState & DrinkComparisonActions>()(
  persist(
    (set, get) => ({
      drinks: [null, null],
      addDrink: (menuNo: number) =>
        set((state) => {
          // 비어 있는 자리에 음료 추가
          const addIndex = state.drinks.indexOf(null);

          return { drinks: state.drinks.map((drinkMenu, idx) => (idx === addIndex ? menuNo : drinkMenu)) };
        }),
      deleteDrinkFromComparisonBox: (menuNo: number) =>
        set((state) => {
          // 삭제할 음료가 아닌 음료의 index
          const maintainedDrinkMenuNoIdx = state.drinks.findIndex((drinkMenu) => drinkMenu !== menuNo);

          return { drinks: [state.drinks[maintainedDrinkMenuNoIdx], null] };
        }),
      deleteAllDrinks: () => set({ drinks: [null, null] }),
      isDrinkExist: (menuNo: number) => {
        return get().drinks.some((drinkNo: number | null) => drinkNo && drinkNo === menuNo);
      },
      isFull: () => get().drinks.every((drinkMenu) => drinkMenu !== null),
    }),
    {
      name: 'drink-comparison-items',
    },
  ),
);
