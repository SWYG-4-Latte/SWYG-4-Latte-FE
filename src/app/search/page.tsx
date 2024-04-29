'use client';

import { useState } from 'react';

import NavigationHeader from '@/components/common/header/NavigationHeader';
import SearchInput from '@/components/search/SearchInput';
import PopularSearchContainer from '@/container/search/PopularSearchContainer';
import RecentSearchContainer from '@/container/search/RecentSearchContainer';
import SearchResultContainer from '@/container/search/SearchResultContainer';

export default function SearchPage() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <NavigationHeader>
        <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
      </NavigationHeader>
      <div className="pt-14">
        {!searchValue ? (
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
