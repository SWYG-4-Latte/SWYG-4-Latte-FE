'use client';

import { useState } from 'react';

import BrandSwiper from '@/components/Brand/BrandSwiper';
import BadgeButton from '@/components/DrinkRanking/BadgeButton';
import { BADGE_TEXT } from '@/constants/home/filterBadge';

const RankingContainer = () => {
  const [selectedButtonIdx, setSelectedButtonIdx] = useState<number>(0);

  const brandList = [
    {
      name: '스타벅스',
      img: 'src',
    },
    {
      name: '투썸플레이스',
      img: 'src',
    },
    {
      name: '빽다방',
      img: 'src',
    },
    {
      name: '컴포즈커피',
      img: 'src',
    },
    {
      name: '이디야',
      img: 'src',
    },
  ];

  const handleClick = (idx: number) => {
    /** 필터링 기능 추가 */
    setSelectedButtonIdx(idx);
  };

  return (
    <div className="flex flex-col bg-gray02 py-4">
      <div className="mb-4 pl-5 font-semibold text-gray10">카페 브랜드별 랭킹</div>
      <BrandSwiper slideData={brandList} />
      <div className="mt-4 inline-flex gap-2 pl-5">
        {BADGE_TEXT.map((filterName, idx) => (
          <BadgeButton selected={selectedButtonIdx === idx} onClick={() => handleClick(idx)}>
            {filterName}
          </BadgeButton>
        ))}
      </div>
    </div>
  );
};

export default RankingContainer;
