'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import Tooltip from '../common/Tooltip';

const CategoryHeader = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 z-20 mx-auto flex h-14 max-w-[500px] items-center justify-between bg-primaryIvory px-5">
      <div className="relative flex items-center gap-1">
        <span className="text-lg font-semibold text-gray10">카테고리</span>
        <div className="relative">
          <button onClick={() => setIsTooltipOpen(true)} className="leading-6 text-gray06">
            ⓘ
          </button>
          {isTooltipOpen && (
            <Tooltip className="-left-[65.6px]" onClose={() => setIsTooltipOpen(false)}>
              사이즈별 카페인 함량은
              <br />
              음료를 선택하면 확인 가능해요.
            </Tooltip>
          )}
        </div>
      </div>

      <div className="my-4 flex gap-4">
        <Link href="/menu/search" scroll={false}>
          <Image src="/svgs/search.svg" priority width={24} height={24} alt="검색 아이콘" />
        </Link>
      </div>
    </header>
  );
};

export default CategoryHeader;
