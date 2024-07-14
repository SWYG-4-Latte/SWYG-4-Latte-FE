'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { ComparedMenu } from '@/types/menu/menu';
import { ellipsisText } from '@/utils/string';
import { cn } from '@/utils/style';

const DrinkInfo = ({ drink, onDelete }: { drink: ComparedMenu | null; onDelete: (menuNo: number) => void }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = () => {
    if (drink) {
      onDelete(drink.menuNo);
    }
  };

  return (
    <div className="flex h-[134px] flex-1 flex-col items-center justify-center gap-2">
      <div
        className={cn('relative h-20 w-20', !drink && 'cursor-pointer')}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        onClick={() => {
          if (!drink) router.push('/menu');
        }}
      >
        <Image
          src={drink ? drink.imageUrl : '/svgs/beverage.svg'}
          priority
          width={0}
          height={0}
          sizes="100vw"
          className="h-full w-20 rounded-full object-cover"
          alt={drink ? drink.menuName : '음료를 추가해주세요'}
        />
        {isHovered && !drink && (
          <>
            <div className="absolute bottom-0 z-30 flex h-full w-full items-center justify-center rounded-full bg-primaryOrange opacity-80" />
            <Image
              className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 opacity-100"
              src="/svgs/icon-plus.svg"
              width={40}
              height={40}
              alt="음료 추가하기 버튼"
            />
          </>
        )}
        {drink && (
          <button onClick={handleDelete} className="absolute right-0 top-2">
            <Image priority src="/svgs/delete-icon.svg" width={16} height={16} alt="비교함에서 삭제" />
          </button>
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="text-[10px] text-primaryOrange">{drink ? drink.brand : '-'}</div>
        <div className="whitespace-nowrap text-xs text-gray10">
          {drink ? ellipsisText(drink.menuName, 10) : '음료를 추가해주세요'}
        </div>
        <div className="text-[10px] text-gray08">{drink ? drink.menuSize : '-'}</div>
      </div>
    </div>
  );
};

export default DrinkInfo;
