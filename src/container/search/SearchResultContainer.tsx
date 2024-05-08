import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import DrinkListItem from '@/components/common/drink/DrinkListItem';
import SearchFilter from '@/components/search/SearchFilter';
import { Menu } from '@/types/home/menu';

interface SearchResultContainerProps {
  query: string;
  filter: string | null;
}

const DATA_SIZE = 13;

const SearchResultContainer = ({ query, filter }: SearchResultContainerProps) => {
  const [searchResults, setSearchResults] = useState<Menu[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getSearchResults = async (pageNumber: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu/list`, {
        params: {
          word: query,
          page: pageNumber,
          size: DATA_SIZE,
          sortBy: filter && filter !== 'none' ? 'caffeine-' + filter : null,
          cond: filter && filter === 'none' ? 'caffeine-' + filter : null,
        },
      });

      const data = response.data.data;

      setSearchResults((prev) => (pageNumber === 0 ? data.content : [...prev, ...data.content]));

      setTotalResults(data.totalElements);
      setPage(data.number + 1);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  const handleScroll = useCallback(async () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50 && !isLoading && !isError) {
      if (page * DATA_SIZE < totalResults) getSearchResults(page);
    }
  }, [page, isLoading, isError]);

  useEffect(() => {
    setPage(0);
    getSearchResults(0);
  }, [query, filter]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div>
      {searchResults.length === 0 ? (
        <>
          <div className="flex h-[calc(100dvh-56px)] flex-col items-center justify-center overflow-hidden">
            <Image
              src="/svgs/no-search-results.svg"
              alt="검색 결과 없음"
              priority
              sizes="100vw"
              width={0}
              height={0}
              className="h-auto w-auto"
            />
            <div className="my-6 flex flex-col items-center justify-center gap-2 text-gray08">
              <p>검색 결과가 없습니다.</p>
              <p className="text-sm leading-6">다른 키워드로 검색해보세요.</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-3 pb-3 pl-5 pt-4">
            <div className="flex items-end gap-2">
              <div className="font-semibold leading-[22px] text-gray10">검색 결과</div>
              <div className="text-xs text-primaryOrange">{totalResults}건</div>
            </div>
            <SearchFilter />
          </div>

          {searchResults.map((result) => (
            <DrinkListItem key={result.menuNo} drinkMenu={result} />
          ))}
        </>
      )}
    </div>
  );
};

export default SearchResultContainer;
