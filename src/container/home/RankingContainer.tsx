'use client';

import { useState } from 'react';

import RankingList from '@/components/home/drinkRanking/RankingList';
import BrandList from '@/components/home/drinkRanking/BrandList';

const RankingContainer = () => {
  const [selectedBrand, setSelectedBrand] = useState('스타벅스');

  return (
    <div className="flex flex-col bg-primaryIvory">
      <div className="mt-8 pl-5 font-semibold text-gray10">오늘의 카페인 인기 랭킹</div>
      <BrandList selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />
      <RankingList selectedBrand={selectedBrand} />
    </div>
  );
};

export default RankingContainer;
