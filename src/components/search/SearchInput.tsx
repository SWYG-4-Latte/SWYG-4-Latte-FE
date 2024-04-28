'use client';

import Image from 'next/image';
import { Dispatch, KeyboardEvent, SetStateAction } from 'react';

import { useRecentSearchStore } from '@/store/recentSearchStore';

interface SearchInputProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const SearchInput = ({ searchValue, setSearchValue }: SearchInputProps) => {
  const addSearchWord = useRecentSearchStore((state) => state.addSearchWord);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      addSearchWord(searchValue);
    }
  };

  const handleClick = () => {
    if (searchValue === '') addSearchWord(searchValue);
    else setSearchValue('');
  };

  return (
    <div className="relative ml-[54px] flex w-full items-center rounded-md border border-gray04 text-sm">
      <input
        type="text"
        value={searchValue}
        className="w-full bg-gray03 py-2 pl-4 text-gray10 placeholder:text-gray06 focus-visible:outline-none"
        placeholder="음료명 또는 브랜드명을 입력해주세요."
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="absolute right-2" onClick={handleClick}>
        <Image src={`/svgs/${searchValue === '' ? 'search' : 'delete-search'}.svg`} alt="검색" width={20} height={20} />
      </button>
    </div>
  );
};

export default SearchInput;
