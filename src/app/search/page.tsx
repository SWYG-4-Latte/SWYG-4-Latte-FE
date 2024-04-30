'use client';

import { useState } from 'react';

import NavigationHeader from '@/components/common/header/NavigationHeader';
import SearchInput from '@/components/search/SearchInput';
import PopularSearchContainer from '@/container/search/PopularSearchContainer';
import RecentSearchContainer from '@/container/search/RecentSearchContainer';
import SearchResultContainer from '@/container/search/SearchResultContainer';

interface SearchPageSearchParams {
  query?: string;
  filter?: string;
}

export default function SearchPage({ searchParams }: { searchParams: SearchPageSearchParams }) {
  return (
    <>
      <NavigationHeader>
        <SearchInput />
      </NavigationHeader>
      <div className="pt-14">
        {!searchParams.query ? (
          <>
            <RecentSearchContainer />
            <div className="h-2 bg-gray03 " />
            <PopularSearchContainer />
          </>
        ) : (
          <SearchResultContainer />
        )}
      </div>
    </>
  );
}
