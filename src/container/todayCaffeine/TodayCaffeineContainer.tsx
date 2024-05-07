import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';

import EmptyHistory from '@/components/todayCaffeine/EmptyHistory';
import HistoryList from '@/components/todayCaffeine/HistoryList';
import { formatDate } from '@/utils/date';

const DATA = [
  {
    menuNo: 1,
    menuName: '망고패션스무디',
    caffeine: '카페인 0mg',
    brand: '빽다방',
    imageUrl: 'https://paikdabang.com/wp-content/uploads/2023/06/망고패션스무디_thumb-450x588.png',
  },
  {
    menuNo: 2,
    menuName: '피스타치오빽스치노(SOFT)',
    caffeine: '카페인 10mg',
    brand: '빽다방',
    imageUrl: 'https://paikdabang.com/wp-content/uploads/2018/05/피스타치오빽스치노-SOFT-450x588.png',
  },
  {
    menuNo: 3,
    menuName: '아이스크림카페모카(ICED)',
    caffeine: '카페인 237mg',
    brand: '빽다방',
    imageUrl: 'https://paikdabang.com/wp-content/uploads/2022/05/아이스크림카페모카-450x588.png',
  },
];

const TodayCaffeineContainer = () => {
  return (
    <div className="pt-14">
      {DATA.length === 0 ? (
        <EmptyHistory />
      ) : (
        <div>
          <div className="mb-2 mt-4 flex flex-col px-4">
            <div className="text-lg font-semibold text-gray10">{formatDate(dayjs())}</div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-gray08">오늘 더 마신 음료가 있다면 기록해보세요!</span>
              <Link href="/menu">
                <div className="flex py-1 text-xs text-primaryOrange">
                  기록하기
                  <Image
                    src="/svgs/arrow-orange.svg"
                    width={14}
                    height={14}
                    alt="기록하기"
                    className="h-[14px] w-[14px]"
                  />
                </div>
              </Link>
            </div>
          </div>
          <HistoryList drinkList={DATA} />
        </div>
      )}
    </div>
  );
};

export default TodayCaffeineContainer;
