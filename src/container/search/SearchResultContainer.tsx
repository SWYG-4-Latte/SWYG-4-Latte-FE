import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import DrinkListItem from '@/components/common/drink/DrinkListItem';
import { Menu } from '@/types/menu/menu';
import NoSearchResults from '@/components/search/NoSearchResults';
import SearchResultHeader from '@/components/search/SearchResultHeader';
import SearchListSkeleton from '@/components/common/skeleton/SearchListSkeleton';
import { MENU_PER_PAGE } from '@/constants/menu/menuList';

interface SearchResultContainerProps {
  query: string;
  filter: string | null;
}

const SearchResultContainer = ({ query, filter }: SearchResultContainerProps) => {
  const observeTargetRef = useRef<HTMLDivElement>(null);

  const [searchResults, setSearchResults] = useState<Menu[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getSearchResults = async (pageNumber: number) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu/list`, {
        params: {
          word: query,
          page: pageNumber,
          size: MENU_PER_PAGE,
          sortBy: filter && filter !== 'none' ? 'caffeine-' + filter : null,
          cond: filter && filter === 'none' ? 'caffeine-' + filter : null,
        },
      });

      setSearchResults((prev) => (pageNumber === 0 ? data.data.content : [...prev, ...data.data.content]));

      setTotalResults(data.data.totalElements);
      setPage(data.data.number + 1);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  const hasNextPage = page * MENU_PER_PAGE < totalResults;

  // 관찰 대상(target)이 등록되거나 가시성에 변화가 생기면 실행되는 callback 함수
  const onIntersect: IntersectionObserverCallback = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting && hasNextPage) {
        getSearchResults(page);
      }
    },
    [page, totalResults],
  );

  useEffect(() => {
    setPage(0);
    getSearchResults(0);
  }, [query, filter]);

  useEffect(() => {
    if (!observeTargetRef.current) return;

    const observer = new IntersectionObserver(onIntersect, { threshold: 0.3 });
    observer.observe(observeTargetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [observeTargetRef, onIntersect]);

  if (!isLoading && searchResults.length === 0 && !filter) {
    return <NoSearchResults />;
  }

  return (
    <>
      <SearchResultHeader totalResults={totalResults} />
      {searchResults.length === 0 && <>{isLoading ? <SearchListSkeleton /> : <NoSearchResults />}</>}
      <ul>
        {searchResults.map((result) => (
          <DrinkListItem key={result.menuNo} drinkMenu={result} />
        ))}
      </ul>
      <div ref={observeTargetRef} className="flex justify-center">
        {hasNextPage && 'Loading...'}
      </div>
    </>
  );
};

export default SearchResultContainer;
