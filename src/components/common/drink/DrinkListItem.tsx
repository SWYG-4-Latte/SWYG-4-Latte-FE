'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Menu } from '@/types/home/menu';

/**
 * 검색 페이지와 오늘 마신 카페인 기록 페이지 음료 목록 아이템
 * 필수: 사진, 음료명, 카페인 함량, 브랜드명
 * 검색에서만 사용: 가격
 */
const DrinkListItem = ({ drinkMenu }: { drinkMenu: Menu }) => {
  const { menuNo, menuName, caffeine, brand, imageUrl } = drinkMenu;

  const router = useRouter();

  return (
    <li
      onClick={() => router.push(`/menu/${menuNo}`)}
      className="flex min-h-24 cursor-pointer items-center gap-4 border-b border-gray04 px-4 py-4 last:border-none"
    >
      <div className="flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full bg-primaryBeige">
        <Image src={imageUrl} alt={menuName} width={0} height={0} sizes="100vw" className="h-auto w-full" />
      </div>
      <div className="flex flex-col justify-center gap-2">
        <div className="font-medium text-gray10">{menuName}</div>
        <div className="flex items-center gap-[10px]">
          <div className="rounded bg-primaryBeige px-2 py-1 text-xs text-orange09">{caffeine}</div>
          <div className="h-3 w-px bg-gray06" />
          <div className="text-sm text-gray08">{brand}</div>
        </div>
      </div>
    </li>
  );
};

export default DrinkListItem;
