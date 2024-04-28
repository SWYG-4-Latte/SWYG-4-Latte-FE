'use client';

import NavigationHeader from '@/components/common/header/NavigationHeader';
import SearchInput from '@/components/search/SearchInput';
import RecentSearchContainer from '@/container/search/RecentSearchContainer';
import { useState } from 'react';

export default function SearchPage() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <NavigationHeader>
        <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
      </NavigationHeader>
      <div className="pt-14">{!searchValue && <RecentSearchContainer />}</div>
    </>
  );
}
