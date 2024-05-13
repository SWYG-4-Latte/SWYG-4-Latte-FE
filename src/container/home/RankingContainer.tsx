'use client';

import { useState } from 'react';

import RankingList from '@/components/home/drinkRanking/RankingList';
import BrandList from '@/components/home/drinkRanking/BrandList';
import { CafeBrand } from '@/types/home/brand';

const RankingContainer = ({ brandList }: { brandList: CafeBrand[] }) => {
  const [selectedBrand, setSelectedBrand] = useState('starbucks');

  return (
    <div className="flex flex-col bg-primaryIvory">
      <div className="mt-8 pl-5 font-semibold text-gray10">라떼 핏 인기 랭킹</div>
      <BrandList brandList={brandList} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />
      <RankingList selectedBrand={selectedBrand} />
    </div>
  );
};

export default RankingContainer;
