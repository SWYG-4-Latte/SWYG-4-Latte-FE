'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { ComparedMenu } from '@/types/home/menu';
import { ellipsisText } from '@/utils/string';

const DrinkInfo = ({ drink, onDelete }: { drink: ComparedMenu | null; onDelete: (menuNo: number) => void }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = () => {
    if (drink) {
      onDelete(drink.menuNo);
    }
  };

  let defaultImgSrc = '/svgs/beverage.svg';
  if (isHovered) defaultImgSrc = '/svgs/beverage-hover.svg';

  return (
    <div className="flex h-[134px] flex-1 flex-col items-center justify-center gap-2">
      <div className="relative h-20 w-20">
        <Image
          src={drink ? drink.imageUrl : defaultImgSrc}
          priority
          width={0}
          height={0}
          sizes="100vw"
          className={`h-full w-20 rounded-full bg-primaryBeige ${!drink ? 'cursor-pointer' : undefined}`}
          alt={drink ? drink.menuName : '음료를 추가해주세요'}
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
          onClick={() => {
            if (!drink) router.push('/category');
          }}
        />
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
