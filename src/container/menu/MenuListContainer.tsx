'use client';

import { useEffect, useState } from 'react';

import DrinkListItem from '@/components/common/drink/DrinkListItem';
import { Menu } from '@/types/menu/menu';
import SearchListSkeleton, { SearchListItemSkeleton } from '@/components/common/skeleton/SearchListSkeleton';
import { MENU_PER_PAGE } from '@/constants/menu/menuList';
import { MenuListData, getMenuList } from '@/api/drinks';
import { useIntersect } from '@/hooks/useIntersect';

interface MenuListContainerProps {
  brand: string;
  filter: string;
  initialData: MenuListData;
}

const MenuListContainer = ({ brand, filter, initialData }: MenuListContainerProps) => {
  const [menuList, setMenuList] = useState<Menu[]>(initialData.content);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const totalResults = initialData.totalElements;
  const hasNextPage = page * MENU_PER_PAGE < totalResults;

  const targetRef = useIntersect(() => {
    if (hasNextPage && !isLoading) getMoreMenu();
  });

  const getMoreMenu = async () => {
    setIsLoading(true);
    try {
      const data = await getMenuList(brand, filter, page);

      setMenuList((prev) => {
        return [...prev, ...data.content];
      });
      setPage((prev) => prev + 1);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    setMenuList(initialData.content);
    setPage(1);
  }, [initialData.content]);

  return (
    <div>
      {menuList.length === 0 && isLoading && <SearchListSkeleton />}
      <ul>
        {menuList.map((result) => (
          <DrinkListItem key={result.menuNo} drinkMenu={result} />
        ))}
      </ul>
      <div ref={targetRef} className="flex w-full">
        {hasNextPage && <SearchListItemSkeleton />}
      </div>
    </div>
  );
};

export default MenuListContainer;
