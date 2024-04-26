'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import './calendar.css';

import MonthComparisonMessage from './MonthComparisonMessage';
import { SelectedDate, ThisMonthData } from '@/types/caffeineCalendar/calendar';
import CaffeineStatus from './CaffeineStatus';

const SAMPLE = {
  '22': '높음',
  '20': '보통',
  '26': '낮음',
};

const CaffeineCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
  const [thisMonthData, setThisMonthData] = useState<ThisMonthData>(SAMPLE);
  const [curMonth, setCurMonth] = useState<number>(new Date().getMonth() + 1);

  const handleChangeDate = (date: SelectedDate) => {
    setSelectedDate(date);
  };

  const addTitleContent = ({ date }: { date: Date }) => {
    const curDate = date.getDate().toString();
    const status = thisMonthData[curDate];

    if (!status) return null;

    return <CaffeineStatus status={status} />;
  };

  // TODO: 현재 달력을 보고 있는 달이 바뀔 때 날짜별 상태 가져오기
  useEffect(() => {}, [curMonth]);

  return (
    <div className="relative flex items-center justify-center bg-primaryIvory px-5 pt-2">
      <MonthComparisonMessage status={'감소'} />
      <Calendar
        locale="ko"
        calendarType="gregory"
        next2Label={null}
        prev2Label={null}
        nextLabel={<Image src="/svgs/arrow-orange.svg" width={16} height={16} alt="다음 버튼" />}
        prevLabel={<Image src="/svgs/arrow-orange.svg" width={16} height={16} alt="이전 버튼" className="rotate-180" />}
        formatDay={(locale, date) => String(date.getDate())}
        value={selectedDate}
        onChange={handleChangeDate}
        tileContent={addTitleContent}
        onActiveStartDateChange={({ activeStartDate }: { activeStartDate: Date | null }) => {
          if (!activeStartDate) return;
          setCurMonth(activeStartDate.getMonth() + 1);
        }}
      />
    </div>
  );
};

export default CaffeineCalendar;
