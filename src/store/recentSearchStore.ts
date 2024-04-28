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
        set((state) => ({
          searchList: state.searchList.includes(word) ? state.searchList : [word, ...state.searchList.slice(0, 2)],
        })),
      deleteSearchWord: (word: string) =>
        set((state) => ({
          searchList: state.searchList.filter((searchWord) => searchWord !== word),
        })),
      deleteAllSearchWord: () => set({ searchList: [] }),
    }),
    { name: 'recent-search' },
  ),
);
