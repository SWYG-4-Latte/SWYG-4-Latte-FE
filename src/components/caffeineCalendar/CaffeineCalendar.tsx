'use client';

import Image from 'next/image';
import { useState } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import './calendar.css';

import MonthComparisonMessage from './MonthComparisonMessage';
import { SelectedDate } from '@/types/caffeineCalendar/calendar';

const CaffeineCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

  const handleChangeDate = (date: SelectedDate) => {
    setSelectedDate(date);
  };

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
      />
    </div>
  );
};

export default CaffeineCalendar;
