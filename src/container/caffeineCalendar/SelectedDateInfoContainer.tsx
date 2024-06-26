import Link from 'next/link';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { formatDate } from '@/utils/date';
import IntakeStandardInfo from '@/components/caffeineCalendar/IntakeStandardInfo';
import CaffeineStatus from '@/components/caffeineCalendar/CaffeineStatus';
import { SelectedDatePiece, SelectedDateInfoType } from '@/types/caffeineCalendar/calendar';
import apiInstance from '@/api/instance';
import useLocalStorage from '@/hooks/useLocalStorage';

const SelectedDateInfoContainer = ({ selectedDate }: { selectedDate: SelectedDatePiece }) => {
  const [selectedDateInfo, setSelectedDateInfo] = useState<SelectedDateInfoType | null>(null);

  const isLoggedIn = !!useLocalStorage('accessToken');

  const hasUserAdditionalInfo = selectedDateInfo !== null;

  useEffect(() => {
    if (!isLoggedIn) return;

    const getDateInfo = async () => {
      const { data } = await apiInstance.get('/drink/date', {
        params: {
          datetime: dayjs(selectedDate).format('YYYY-MM-DDT00:00:00'),
        },
      });

      setSelectedDateInfo(data);
    };

    getDateInfo();
  }, [selectedDate, isLoggedIn]);

  if (!selectedDate) return;

  return (
    <div className="flex flex-grow flex-col gap-3 overflow-y-auto  px-5 pb-28 pt-5">
      <div className="flex justify-between">
        <span className="text-sm text-gray08">{formatDate(dayjs(selectedDate))}</span>
        <IntakeStandardInfo />
      </div>
      <div className="flex items-center gap-1 text-lg font-semibold text-gray11">
        {isLoggedIn && selectedDateInfo ? (
          <>
            {selectedDateInfo.caffeine ? (
              <>
                오늘은
                <CaffeineStatus status={selectedDateInfo.status} locatedInCalendar={false} />
                이에요!
              </>
            ) : (
              <>아직 마신 카페인이 없어요.</>
            )}
          </>
        ) : (
          <>카페인 섭취량을 확인할 수 없어요.</>
        )}
      </div>

      {selectedDateInfo?.caffeine && hasUserAdditionalInfo && (
        <div className="flex h-[50px] items-center justify-between rounded-lg border border-gray05 bg-primaryIvory py-4 pl-5 pr-4">
          <div className="text-sm text-gray08">하루 총 카페인 섭취량</div>
          <div className="text-sm text-gray10">{selectedDateInfo.caffeine}mg</div>
        </div>
      )}

      <div className="text-sm leading-[22px] text-gray08">
        {isLoggedIn && selectedDateInfo ? (
          <>
            {selectedDateInfo.caffeine ? (
              <>{selectedDateInfo.sentence}</>
            ) : (
              '마신 카페인을 기록하고 맞춤 카페인 정보를 받아보세요.'
            )}
          </>
        ) : (
          <>사용자 님의 상태를 입력하시면 빠르게 알려드릴게요!</>
        )}
      </div>
      {(!selectedDateInfo?.caffeine || !hasUserAdditionalInfo) && (
        <Link
          href={isLoggedIn ? (hasUserAdditionalInfo ? '/menu' : '/mypage/my-profile') : '/auth/login'}
          className="mt-[5px] w-fit rounded-md border border-gray06 bg-primaryIvory px-4 py-2 text-sm font-medium text-gray08"
        >
          {isLoggedIn && hasUserAdditionalInfo ? '내가 마신 카페인 기록하기' : '맞춤 정보 입력하러 가기'}
        </Link>
      )}
    </div>
  );
};

export default SelectedDateInfoContainer;
