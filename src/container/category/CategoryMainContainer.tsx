'use client';

import { useEffect, useState } from 'react';

import BrandList from '@/components/home/drinkRanking/BrandList';
import SearchFilter from '@/components/search/SearchFilter';
import { BRAND_NAME } from '@/constants/home/brandName';
import { useRouter, useSearchParams } from 'next/navigation';

const CategoryMainContainer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedBrand, setSelectedBrand] = useState('스타벅스');

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('brand', BRAND_NAME[selectedBrand]);
    router.replace(`/menu/?${params.toString()}`, { scroll: false });
  }, [selectedBrand]);

  return (
    <div className="pt-14">
      <BrandList selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />
      <SearchFilter />
    </div>
  );
};

export default CategoryMainContainer;
