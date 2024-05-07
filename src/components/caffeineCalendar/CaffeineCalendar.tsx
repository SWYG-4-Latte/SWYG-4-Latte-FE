'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import dayjs from 'dayjs';

import 'react-calendar/dist/Calendar.css';
import './calendar.css';

import MonthComparisonMessage from './MonthComparisonMessage';
import { SelectDateHandler, SelectedDate, ThisMonthData } from '@/types/caffeineCalendar/calendar';
import CaffeineStatus from './CaffeineStatus';

interface CaffeineCalendarProps {
  selectedDate: SelectedDate;
  onSelect: SelectDateHandler;
}

const CaffeineCalendar = ({ selectedDate, onSelect }: CaffeineCalendarProps) => {
  const [thisMonthData, setThisMonthData] = useState<ThisMonthData | null>(null);
  const [activeDate, setActiveDate] = useState(new Date()); // 현재 보여지는 달의 1일

  // 이번 달 이전에서만 MonthComparisonMessage 컴포넌트 보이도록 설정 필요
  const isVisibleMonthComparisonMessage = dayjs(activeDate).isBefore(new Date());

  const addTitleContent = ({ date }: { date: Date }) => {
    if (!thisMonthData) return;

    const curDate = date.getDate().toString();
    const status = thisMonthData.date[curDate];

    if (!status) return null;

    return <CaffeineStatus status={status} locatedInCalendar />;
  };

  useEffect(() => {
    const getThisMonthData = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/drink/calendar`, {
        params: {
          datetime: dayjs(activeDate).format('YYYY-MM'),
        },
      });
      setThisMonthData(response.data.data);
    };

    getThisMonthData();
  }, [activeDate]);

  return (
    <div className="relative flex items-center justify-center bg-primaryIvory px-5 pt-2">
      {thisMonthData && isVisibleMonthComparisonMessage && <MonthComparisonMessage status={thisMonthData.status} />}
      <Calendar
        locale="ko"
        calendarType="gregory"
        next2Label={null}
        prev2Label={null}
        nextLabel={<Image src="/svgs/arrow-orange.svg" width={16} height={16} alt="다음 버튼" />}
        prevLabel={<Image src="/svgs/arrow-orange.svg" width={16} height={16} alt="이전 버튼" className="rotate-180" />}
        formatDay={(locale, date) => String(date.getDate())}
        value={selectedDate}
        onChange={onSelect}
        tileContent={addTitleContent}
        onActiveStartDateChange={({ activeStartDate }: { activeStartDate: Date | null }) => {
          if (!activeStartDate) return;
          setActiveDate(activeStartDate);
        }}
        tileDisabled={({ activeStartDate, date }) => dayjs(date).isAfter(dayjs())}
      />
    </div>
  );
};

export default CaffeineCalendar;
