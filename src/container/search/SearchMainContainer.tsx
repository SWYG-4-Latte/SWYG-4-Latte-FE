'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useRecentSearchStore } from '@/store/recentSearchStore';
import RecentSearchContainer from './RecentSearchContainer';
import PopularSearchContainer from './PopularSearchContainer';
import NavigationHeader from '@/components/common/header/NavigationHeader';
import SearchInput from '@/components/search/SearchInput';
import ArticleRecommendationContainer from './ArticleRecommendationContainer';
import DrinkSearchResultContainer from './DrinkSearchResultContainer';
import ArticleSearchResultContainer from './ArticleSearchResultContainer';

export type SearchTargetType = 'drink' | 'article';

const SearchMainContainer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const searchTarget = pathname.includes('menu') ? 'drink' : 'article';

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
    if (searchQuery) addSearchWord(searchQuery, searchTarget);
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
            {searchTarget === 'drink' ? <PopularSearchContainer /> : <ArticleRecommendationContainer />}
          </>
        ) : (
          <>
            {searchTarget === 'drink' ? (
              <DrinkSearchResultContainer query={searchQuery} filter={searchFilter} setHasResult={setHasResult} />
            ) : (
              <ArticleSearchResultContainer query={searchQuery} setHasResult={setHasResult} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SearchMainContainer;
