'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useRecentSearchStore } from '@/store/recentSearchStore';
import RecentSearchContainer from './RecentSearchContainer';
import SearchResultContainer from './SearchResultContainer';
import PopularSearchContainer from './PopularSearchContainer';
import NavigationHeader from '@/components/common/header/NavigationHeader';
import SearchInput from '@/components/search/SearchInput';

const SearchMainContainer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQuery = searchParams.get('query');
  const searchFilter = searchParams.get('filter');

  const addSearchWord = useRecentSearchStore((state) => state.addSearchWord);

  const [hasResult, setHasResult] = useState(false);

  const handleGoBack = () => {
    if (searchQuery && !hasResult) {
      router.replace('search');
    } else {
      router.back();
    }
  };

  useEffect(() => {
    if (searchQuery) addSearchWord(searchQuery);
  }, [searchQuery]);

  return (
    <>
      <NavigationHeader onGoBack={handleGoBack}>
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
          <SearchResultContainer query={searchQuery} filter={searchFilter} setHasResult={setHasResult} />
        )}
      </div>
    </>
  );
};

export default SearchMainContainer;
