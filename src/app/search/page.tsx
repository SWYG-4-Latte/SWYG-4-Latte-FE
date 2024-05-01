'use client';

import NavigationHeader from '@/components/common/header/NavigationHeader';
import SearchInput from '@/components/search/SearchInput';
import PopularSearchContainer from '@/container/search/PopularSearchContainer';
import RecentSearchContainer from '@/container/search/RecentSearchContainer';
import SearchResultContainer from '@/container/search/SearchResultContainer';
import { useRecentSearchStore } from '@/store/recentSearchStore';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query');
  const searchFilter = searchParams.get('filter');

  const addSearchWord = useRecentSearchStore((state) => state.addSearchWord);

  useEffect(() => {
    if (searchQuery) addSearchWord(searchQuery);
  }, [searchQuery]);

  return (
    <>
      <NavigationHeader>
        <SearchInput />
      </NavigationHeader>
      <div className="pt-14">
        {!searchQuery ? (
          <>
            <RecentSearchContainer />
            <div className="h-2 bg-gray03 " />
            <PopularSearchContainer />
          </>
        ) : (
          <SearchResultContainer query={searchQuery} filter={searchFilter} />
        )}
      </div>
    </>
  );
}
