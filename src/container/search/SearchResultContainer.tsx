import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import DrinkListItem from '@/components/common/drink/DrinkListItem';
import SearchFilter from '@/components/search/SearchFilter';
import { Menu } from '@/types/home/menu';
import NoSearchResults from '@/components/search/NoSearchResults';
import SearchResultHeader from '@/components/search/SearchResultHeader';

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
    <>
      {searchResults.length === 0 && !filter ? (
        <NoSearchResults />
      ) : (
        <>
          <SearchResultHeader totalResults={totalResults} />

          {searchResults.length === 0 ? (
            <NoSearchResults />
          ) : (
            <ul>
              {searchResults.map((result) => (
                <DrinkListItem key={result.menuNo} drinkMenu={result} />
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};

export default SearchResultContainer;
