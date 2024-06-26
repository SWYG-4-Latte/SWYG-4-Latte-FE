'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { KeyboardEvent, useEffect, useState } from 'react';

import { useRecentSearchStore } from '@/store/recentSearchStore';

const SearchInput = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const searchTarget = pathname.includes('menu') ? 'drink' : 'article';

  const addSearchWord = useRecentSearchStore((state) => state.addSearchWord);

  const [searchValue, setSearchValue] = useState(searchParams.get('query') ?? '');

  const handleSearch = () => {
    if (searchValue.trim() === '') return;

    const params = new URLSearchParams(searchParams);
    params.set('query', searchValue);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    addSearchWord(searchValue, searchTarget);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (searchValue.trim() && !canDeleteWord) {
        handleSearch();
      }
    }
  };

  const handleClear = () => {
    setSearchValue('');
    router.replace(pathname, { scroll: false });
  };

  useEffect(() => {
    const query = searchParams.get('query');
    setSearchValue(query ?? '');
  }, [searchParams]);

  const canDeleteWord = searchParams.get('query') === searchValue;

  return (
    <div className="relative ml-[34px] flex w-full items-center overflow-hidden rounded-md border border-gray04 text-sm">
      <input
        type="text"
        value={searchValue}
        className="w-full bg-gray03 py-2 pl-4 pr-7 text-gray10 placeholder:text-gray06 focus-visible:outline-none"
        placeholder={searchTarget === 'drink' ? '음료명을 입력해주세요.' : '찾으시는 아티클이 있나요?'}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="absolute right-2" onClick={!canDeleteWord ? handleSearch : handleClear}>
        <Image
          src={`/svgs/${!canDeleteWord ? 'search' : 'delete-search'}.svg`}
          alt={canDeleteWord ? '검색어 지우기' : '검색 버튼'}
          width={20}
          height={20}
        />
      </button>
    </div>
  );
};

export default SearchInput;
