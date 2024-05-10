import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';

import EmptyHistory from '@/components/todayCaffeine/EmptyHistory';
import HistoryList from '@/components/todayCaffeine/HistoryList';
import { formatDate } from '@/utils/date';
import { Menu } from '@/types/menu/menu';

const TodayCaffeineContainer = ({ data }: { data: Menu[] }) => {
  return (
    <div className="pt-14">
      {data.length === 0 ? (
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
          <HistoryList drinkList={data} />
        </div>
      )}
    </div>
  );
};

export default TodayCaffeineContainer;
