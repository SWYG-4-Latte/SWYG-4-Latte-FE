import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import DrinkListItem from '@/components/common/drink/DrinkListItem';
import { Menu } from '@/types/menu/menu';
import NoSearchResults from '@/components/search/NoSearchResults';
import SearchResultHeader from '@/components/search/SearchResultHeader';
import SearchListSkeleton, { SearchListItemSkeleton } from '@/components/common/skeleton/SearchListSkeleton';
import { MENU_PER_PAGE } from '@/constants/menu/menuList';
import { useIntersect } from '@/hooks/useIntersect';
import apiInstance from '@/api/instance';

interface SearchResultContainerProps {
  query: string;
  filter: string | null;
  setHasResult: Dispatch<SetStateAction<boolean>>;
}

const SearchResultContainer = ({ query, filter, setHasResult }: SearchResultContainerProps) => {
  const [searchResults, setSearchResults] = useState<Menu[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const hasNextPage = page * MENU_PER_PAGE < totalResults;

  const targetRef = useIntersect(() => {
    if (hasNextPage && !isLoading) getSearchResults(page);
  });

  const getSearchResults = async (pageNumber: number) => {
    setIsLoading(true);
    try {
      const { data } = await apiInstance.get('/menu/list', {
        params: {
          word: query,
          page: pageNumber,
          size: MENU_PER_PAGE,
          sortBy: filter && filter !== 'none' ? 'caffeine-' + filter : null,
          cond: filter && filter === 'none' ? 'caffeine-' + filter : null,
        },
      });

      setSearchResults((prev) => (pageNumber === 0 ? data.content : [...prev, ...data.content]));

      setTotalResults(data.totalElements);
      setHasResult(data.totalElements !== 0);
      setPage(data.number + 1);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    setPage(0);
    getSearchResults(0);
  }, [query, filter]);

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
      <div ref={targetRef} className="flex">
        {hasNextPage && <SearchListItemSkeleton />}
      </div>
    </>
  );
};

export default SearchResultContainer;
