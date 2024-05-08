import Link from 'next/link';

import { formatDate } from '@/utils/date';
import IntakeStandardInfo from '@/components/caffeineCalendar/IntakeStandardInfo';
import CaffeineStatus from '@/components/caffeineCalendar/CaffeineStatus';
import { SelectedDateInfoType } from '@/types/caffeineCalendar/calendar';

const SelectedDateInfoContainer = ({ selectedDate, data }: { selectedDate: Date; data: SelectedDateInfoType }) => {
  return (
    <div className="flex flex-grow flex-col gap-3 overflow-y-auto border-t border-gray04 px-5 pb-28 pt-5">
      <div className="flex items-center justify-between">
        <span className="text-sm leading-6 text-gray08">{formatDate(selectedDate)}</span>
        <IntakeStandardInfo />
      </div>
      <div className="flex items-center gap-1 text-lg font-semibold text-gray11">
        {data.caffeine ? (
          <>
            오늘은
            <CaffeineStatus status={data.status} locatedInCalendar={false} />
            이에요!
          </>
        ) : (
          <>아직 마신 카페인이 없어요.</>
        )}
      </div>
      {data.caffeine && (
        <div className="flex h-[50px] items-center justify-between rounded-lg border border-gray05 bg-primaryIvory py-4 pl-5 pr-4">
          <div className="text-sm text-gray08">하루 총 카페인 섭취량</div>
          <div className="text-sm text-gray10">{data.caffeine}</div>
        </div>
      )}

      <div className="text-sm leading-[22px] text-gray08">
        {data.caffeine ? (
          <>
            카페인 음료를 잘 조절해서 마시고 계시네요. 적정량의 카페인은 편두통이 나아져 원활한 활동이 가능해요. 그래도
            커피가 필요하다면 디카페인 바닐라 라떼 한 잔 추천드려요. <br />
            디카페인에는 약 1~5mg의 카페인이 함유되어 있어요
          </>
        ) : (
          '마신 카페인을 기록하고 맞춤 카페인 정보를 받아보세요.'
        )}
      </div>
      {!data.caffeine && (
        <Link
          href="/menu"
          className="mt-3 w-fit rounded-md border border-gray06 bg-primaryIvory px-4 py-2 text-sm font-medium text-gray08"
        >
          내가 마신 카페인 기록하기
        </Link>
      )}
    </div>
  );
};

export default SelectedDateInfoContainer;
