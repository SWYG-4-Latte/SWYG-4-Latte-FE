'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Menu } from '@/types/menu/menu';

/**
 * 검색 페이지,오늘 마신 카페인 기록 페이지, 카테고리 음료 목록 아이템
 * 필수: 사진, 음료명, 카페인 함량
 * 가격 -> 검색, 카테고리
 * 브랜드명 -> 검색, 오늘 마신 카페인 기록
 */
const DrinkListItem = ({ drinkMenu }: { drinkMenu: Menu }) => {
  const { menuNo, menuName, caffeine, brand, imageUrl, price } = drinkMenu;

  const router = useRouter();

  return (
    <li
      onClick={() => router.push(`/menu/${menuNo}`)}
      className={`flex min-h-24 cursor-pointer items-center gap-4 border-b border-gray04 px-4 py-4 last:border-none ${price ? 'even:bg-gray03' : 'bg-gray02'}`}
    >
      <div className="flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full">
        <Image
          priority
          src={imageUrl}
          alt={menuName}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="flex flex-col justify-center gap-2">
        <div className="line-clamp-1 font-medium text-gray10">{menuName}</div>
        <div className="flex items-center gap-[10px]">
          <div className="rounded bg-primaryBeige px-2 py-1 text-xs text-orange09">카페인 {caffeine}</div>
          {brand && (
            <>
              <div className="h-3 w-px bg-gray06" />
              <div className="text-sm text-gray08">{brand}</div>
            </>
          )}
          {price && (
            <>
              <div className="h-3 w-px bg-gray06" />
              <div className="text-sm text-gray08">{Number(price).toLocaleString('ko-KR')}원</div>
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default DrinkListItem;
