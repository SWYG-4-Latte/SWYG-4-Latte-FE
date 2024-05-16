import { useEffect, useState } from 'react';

import NoSearchResults from '@/components/search/NoSearchResults';
import SearchListSkeleton, { SearchListItemSkeleton } from '@/components/common/skeleton/SearchListSkeleton';
import { useIntersect } from '@/hooks/useIntersect';
import { SearchResultContainerProps } from './DrinkSearchResultContainer';
import ArticleListItem from '@/components/article/ArticleListItem';
import { Article } from '@/types/article/article';
import { getArticleSearchResult } from '@/api/search';
import { ArticleSearchListSkeleton } from '@/components/common/skeleton/ArticleListSkeleton';

const ArticleSearchResultContainer = ({ query, setHasResult }: SearchResultContainerProps) => {
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const hasNextPage = page * 4 < totalResults;

  const targetRef = useIntersect(() => {
    if (hasNextPage && !isLoading) getSearchResults(page);
  });

  const getSearchResults = async (pageNumber: number) => {
    setIsLoading(true);
    try {
      const data = await getArticleSearchResult(query, pageNumber);

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
  }, [query]);

  if (!isLoading && searchResults.length === 0) {
    return <NoSearchResults />;
  }

  return (
    <div className="flex flex-col pt-4">
      <div className="mb-3 flex items-end gap-2 pl-5">
        <div className="font-semibold leading-[22px] text-gray10">검색 결과</div>
        <div className="text-xs text-primaryOrange">{totalResults}건</div>
      </div>
      {searchResults.length === 0 && <>{isLoading ? <ArticleSearchListSkeleton /> : <NoSearchResults />}</>}
      <ul>
        {searchResults.map((result) => (
          <ArticleListItem key={result.articleNo} article={result} />
        ))}
      </ul>
      <div ref={targetRef} className="flex">
        {hasNextPage && <SearchListItemSkeleton />}
      </div>
    </div>
  );
};

export default ArticleSearchResultContainer;
