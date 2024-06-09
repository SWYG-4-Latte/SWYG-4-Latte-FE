import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MouseEvent, useState } from 'react';

import { Menu } from '@/types/menu/menu';
import useModal from '@/hooks/useModal';
import useLocalStorage from '@/hooks/useLocalStorage';

const RankingListItem = ({
  menuNo,
  menuName,
  brand,
  caffeine,
  imageUrl,
  ranking,
  menuSize,
}: Menu & {
  ranking: number;
}) => {
  const router = useRouter();
  const { openModal: openRecordModal } = useModal('record');
  const { openModal: openLoginModal } = useModal('login');
  const isLoggedIn = !!useLocalStorage('accessToken');

  const [isTooltipOpen, setIsTooltipOpen] = useState(true);

  const handleRecordCaffeine = async (e: MouseEvent) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    openRecordModal({ menuNo, menuName, menuImg: imageUrl });
  };

  return (
    <>
      <li
        className="flex cursor-pointer items-center border-b border-gray04 bg-gray02 px-5 py-6 last:border-none even:bg-gray01"
        onClick={() => {
          router.push(`/menu/${menuNo}`);
        }}
      >
        <span className="w-[11px] text-base font-semibold text-primaryOrange">{ranking}</span>
        <div className="mx-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
          <Image priority src={imageUrl} alt={menuName} width={0} height={0} sizes="100vw" className="h-auto w-full" />
        </div>
        <div className="flex flex-col justify-center gap-2 pr-4">
          <div className="line-clamp-1 text-sm font-medium text-gray10">{menuName}</div>
          <div className="flex items-center text-xs text-gray08">
            <div>{brand}</div>
            <div className="mx-2 h-3 w-px bg-gray06" />
            <div>{caffeine}</div>
            <div className="mx-2 h-3 w-px bg-gray06" />
            <div>{menuSize}</div>
          </div>
        </div>
        <div className="relative ml-auto">
          <button onClick={handleRecordCaffeine}>
            <Image src="/svgs/plus.svg" width={32} height={32} alt="카페인 기록하기 버튼" />
          </button>
          {isTooltipOpen && ranking === 1 && (
            <div className="absolute -right-2 -top-[64px] z-10 h-[60px] w-[164px]">
              <p className="absolute z-10 px-4 py-2 text-xs leading-[18px] text-gray00">
                오늘 마신 카페인으로
                <br /> 바로 추가할 수 있어요.
              </p>
              <button
                className="absolute right-4 top-2 h-4 w-4"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsTooltipOpen(false);
                }}
              >
                <Image src="/svgs/close-white.svg" width={16} height={16} alt="닫기" />
              </button>
              <Image src="/svgs/tooltip.svg" width={164} height={60} alt="툴팁 말풍선" />
            </div>
          )}
        </div>
      </li>
    </>
  );
};

export default RankingListItem;
