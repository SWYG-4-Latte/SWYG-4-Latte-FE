import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentSearchState {
  searchList: string[];
}

interface RecentSearchActions {
  addSearchWord: (word: string) => void;
  deleteSearchWord: (word: string) => void;
  deleteAllSearchWord: () => void;
}

export const useRecentSearchStore = create<RecentSearchState & RecentSearchActions>()(
  persist(
    (set) => ({
      searchList: [],
      addSearchWord: (word: string) =>
        set((state) => {
          const existingWordIndex = state.searchList.indexOf(word);
          // 이미 최근 검색어에 있는 경우 해당 단어 제거 후 맨 앞에 추가
          if (existingWordIndex !== -1) {
            const newList = state.searchList.filter((searchWord) => searchWord !== word);
            newList.unshift(word);
            return {
              searchList: newList,
            };
          } else {
            return { searchList: [word, ...state.searchList.slice(0, 2)] };
          }
        }),
      deleteSearchWord: (word: string) =>
        set((state) => ({
          searchList: state.searchList.filter((searchWord) => searchWord !== word),
        })),
      deleteAllSearchWord: () => set({ searchList: [] }),
    }),
    { name: 'recent-search' },
  ),
);
