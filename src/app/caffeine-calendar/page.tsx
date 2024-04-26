import Image from 'next/image';
import Link from 'next/link';

import CaffeineCalendar from '@/components/caffeineCalendar/CaffeineCalendar';

export default function CaffeineCalendarPage() {
  return (
    <main>
      <header className="flex h-14 items-center justify-between bg-primaryIvory px-5">
        <div className="text-lg font-semibold text-gray10">카페인 달력</div>
        <Link href="today-caffeine">
          <Image src="/svgs/today-caffeine.svg" width={24} height={24} alt="오늘 마신 카페인 보기" />
        </Link>
      </header>
      <CaffeineCalendar />
    </main>
  );
}
