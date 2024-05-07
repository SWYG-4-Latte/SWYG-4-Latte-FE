import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { DrinkHistoryDetailProps } from '@/types/home/drinkHistory';
import { ellipsisText } from '@/utils/string';

const DrinkHistoryDetail = ({ drinkHistoryData, heading, description }: DrinkHistoryDetailProps) => {
  const router = useRouter();

  return (
    <div
      className={`flex gap-2 p-4 ${drinkHistoryData ? 'cursor-pointer' : ''}`}
      onClick={() => {
        if (drinkHistoryData) {
          router.push(`/menu/${drinkHistoryData?.menuNo}`);
        }
      }}
    >
      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-primaryBeige">
        <Image
          src={drinkHistoryData?.imageUrl || '/svgs/beverage-small.svg'}
          alt={drinkHistoryData?.menuName || '기본 이미지'}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
      <div className="flex flex-col justify-center gap-2">
        <div className="text-sm font-medium text-gray10">
          {drinkHistoryData ? ellipsisText(drinkHistoryData.menuName, 10) : heading}
        </div>
        <div className="flex items-center text-ellipsis text-nowrap text-xs text-gray08">
          {drinkHistoryData ? (
            <>
              <div>{drinkHistoryData.brand}</div>
              <div className="mx-2 h-3 w-px bg-gray06" />
              <div>{drinkHistoryData.caffeine}</div>
              <div className="mx-2 h-3 w-px bg-gray06" />
              <div>{drinkHistoryData.menuSize}</div>
            </>
          ) : (
            <span>{description}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrinkHistoryDetail;
