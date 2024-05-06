'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useRecentSearchStore } from '@/store/recentSearchStore';
import RecentSearchContainer from './RecentSearchContainer';
import SearchResultContainer from './SearchResultContainer';
import PopularSearchContainer from './PopularSearchContainer';

const SearchMainContainer = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query');
  const searchFilter = searchParams.get('filter');

  const addSearchWord = useRecentSearchStore((state) => state.addSearchWord);

  useEffect(() => {
    if (searchQuery) addSearchWord(searchQuery);
  }, [searchQuery]);

  return (
    <>
      {!searchQuery ? (
        <>
          <RecentSearchContainer />
          <div className="h-2 bg-gray03 " />
          <PopularSearchContainer />
        </>
      ) : (
        <SearchResultContainer query={searchQuery} filter={searchFilter} />
      )}
    </>
  );
};

export default SearchMainContainer;
