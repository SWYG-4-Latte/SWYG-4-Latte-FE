'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import DrinkListItem from '@/components/common/drink/DrinkListItem';
import { Menu } from '@/types/home/menu';
import { PAGE_SIZE } from '../search/SearchResultContainer';
import SearchListSkeleton from '@/components/common/skeleton/SearchListSkeleton';

interface MenuListContainerProps {
  brand: string;
  filter: string | null;
  initialData: Menu[];
}

const MenuListContainer = ({ brand, filter, initialData }: MenuListContainerProps) => {
  const observeTargetRef = useRef<HTMLDivElement>(null);

  const [menuList, setMenuList] = useState<Menu[]>(initialData);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getMenuList = async (pageNumber: number) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu/${brand}`, {
        params: {
          page: pageNumber,
          size: PAGE_SIZE,
          sortBy: filter && filter !== 'none' ? 'caffeine-' + filter : null,
          cond: filter && filter === 'none' ? 'caffeine-' + filter : null,
        },
      });

      setMenuList((prev) => (pageNumber === 0 ? data.data.content : [...prev, ...data.data.content]));

      setTotalResults(data.data.totalElements);
      setPage(data.data.number + 1);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  const hasNextPage = page * PAGE_SIZE < totalResults;

  // 관찰 대상(target)이 등록되거나 가시성에 변화가 생기면 실행되는 callback 함수
  const onIntersect: IntersectionObserverCallback = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting && hasNextPage) {
        // getMenuList(page);
      }
    },
    [page, totalResults],
  );

  useEffect(() => {
    setPage(0);
    // getMenuList(0);
  }, [brand, filter]);

  useEffect(() => {
    if (!observeTargetRef.current) return;

    const observer = new IntersectionObserver(onIntersect, { threshold: 0.3 });
    observer.observe(observeTargetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [observeTargetRef, onIntersect]);

  return (
    <div>
      {menuList.length === 0 && isLoading && <SearchListSkeleton />}
      <ul>
        {menuList.map((result) => (
          <DrinkListItem key={result.menuNo} drinkMenu={result} />
        ))}
      </ul>
      <div ref={observeTargetRef} className="flex justify-center">
        {hasNextPage && 'Loading...'}
      </div>
    </div>
  );
};

export default MenuListContainer;
