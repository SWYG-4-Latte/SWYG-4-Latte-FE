import { Menu } from '@/types/home/menu';
import Image from 'next/image';

const RankingListItem = ({
  menuName,
  brand,
  caffeine,
  imageUrl,
  ranking,
  menuSize,
}: Menu & {
  ranking: number;
}) => {
  return (
    <li className="flex items-center border-b border-gray04 bg-gray02 px-5 py-6 last:border-none even:bg-gray01">
      <span className="text-base font-semibold text-primaryOrange">{ranking}</span>
      <div className="mx-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray04">
        <Image src={imageUrl} alt={menuName} width={0} height={0} sizes="100vw" className="h-auto w-full" />
      </div>
      <div className="flex flex-col justify-center gap-2">
        <div className="text-sm font-medium text-gray10">{menuName}</div>
        <div className="flex items-center text-xs text-gray08">
          <div>{brand}</div>
          <div className="mx-2 h-3 w-px bg-gray06" />
          <div>{caffeine}</div>
          <div className="mx-2 h-3 w-px bg-gray06" />
          <div>{menuSize}</div>
        </div>
      </div>
      <div className="ml-auto">
        <button>
          <img src="/svgs/plus.svg" width={32} height={32} alt="카페인 기록하기 버튼" />
        </button>
      </div>
    </li>
  );
};

export default RankingListItem;
