'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import CaffeineCalendar from '@/components/caffeineCalendar/CaffeineCalendar';
import SelectedDateInfoContainer from '@/container/caffeineCalendar/SelectedDateInfoContainer';
import { SelectedDate } from '@/types/caffeineCalendar/calendar';
import BottomNavigation from '@/components/common/bottomNavigation/BottomNavigation';

export default function CaffeineCalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSelectDate = (date: SelectedDate) => {
    if (date instanceof Date) {
      setSelectedDate(date);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] touch-none flex-col overflow-hidden">
      <header className="flex h-14 w-full items-center justify-between bg-primaryIvory px-5 py-4">
        <div className="text-lg font-semibold text-gray10">카페인 달력</div>
        <Link href="/calendar/today-caffeine" scroll={false}>
          <Image src="/svgs/today-caffeine.svg" width={24} height={24} alt="오늘 마신 카페인 보기" />
        </Link>
      </header>
      <CaffeineCalendar selectedDate={selectedDate} onSelect={handleSelectDate} />
      <SelectedDateInfoContainer selectedDate={selectedDate} />
      <BottomNavigation />
    </div>
  );
}
