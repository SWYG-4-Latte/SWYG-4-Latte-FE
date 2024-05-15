import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SearchTargetType = 'drink' | 'article';

interface RecentSearchState {
  drink: string[];
  article: string[];
}
interface RecentSearchActions {
  addSearchWord: (word: string, target: SearchTargetType) => void;
  deleteSearchWord: (word: string, target: SearchTargetType) => void;
  deleteAllSearchWord: (target: SearchTargetType) => void;
}

export const useRecentSearchStore = create<RecentSearchState & RecentSearchActions>()(
  persist(
    (set) => ({
      drink: [],
      article: [],
      addSearchWord: (word: string, target: SearchTargetType) =>
        set((state) => {
          const targetList = state[target];
          const existingWordIndex = targetList.indexOf(word);
          // 이미 최근 검색어에 있는 경우 해당 단어 제거 후 맨 앞에 추가
          if (existingWordIndex !== -1) {
            const newList = targetList.filter((searchWord) => searchWord !== word);
            newList.unshift(word);
            return {
              [target]: newList,
            };
          } else {
            return { [target]: [word, ...targetList.slice(0, 2)] };
          }
        }),
      deleteSearchWord: (word: string, target: SearchTargetType) =>
        set((state) => {
          return { [target]: state[target].filter((searchWord) => searchWord !== word) };
        }),
      deleteAllSearchWord: (target: SearchTargetType) => set({ [target]: [] }),
    }),
    { name: 'recent-search' },
  ),
);
