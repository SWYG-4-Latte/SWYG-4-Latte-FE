'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import DrinkListItem from '@/components/common/drink/DrinkListItem';
import { Menu } from '@/types/menu/menu';
import SearchListSkeleton, { SearchListItemSkeleton } from '@/components/common/skeleton/SearchListSkeleton';
import { MENU_PER_PAGE } from '@/constants/menu/menuList';
import { MenuListData, getMenuList } from '@/api/drinks';

interface MenuListContainerProps {
  brand: string;
  filter: string;
  initialData: MenuListData;
}

const MenuListContainer = ({ brand, filter, initialData }: MenuListContainerProps) => {
  const observeTargetRef = useRef<HTMLDivElement>(null);

  const [menuList, setMenuList] = useState<Menu[]>(initialData.content);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const totalResults = initialData.totalElements;
  const hasNextPage = page * MENU_PER_PAGE < totalResults;

  const getMoreMenu = async () => {
    setIsLoading(true);
    try {
      const data = await getMenuList(brand, filter, page);

      setMenuList((prev) => [...prev, ...data.content]);
      setPage((prev) => prev + 1);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  // 관찰 대상(target)이 등록되거나 가시성에 변화가 생기면 실행되는 callback 함수
  const onIntersect: IntersectionObserverCallback = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting && hasNextPage) {
        getMoreMenu();
      }
    },
    [page, totalResults],
  );

  useEffect(() => {
    setMenuList(initialData.content);
    setPage(1);
  }, [initialData.content]);

  useEffect(() => {
    if (!observeTargetRef.current) return;

    const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
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
      <div ref={observeTargetRef} className="flex w-full">
        {hasNextPage && <SearchListItemSkeleton />}
      </div>
    </div>
  );
};

export default MenuListContainer;
