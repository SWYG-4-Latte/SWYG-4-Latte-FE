'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import BrandList from '@/components/home/drinkRanking/BrandList';
import { CafeBrand } from '@/types/home/brand';

const BrandListContainer = ({ brandList }: { brandList: CafeBrand[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const brandName = searchParams.get('brand');

  const [selectedBrand, setSelectedBrand] = useState(brandName ?? 'starbucks');

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedBrand) {
      params.set('brand', selectedBrand);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [selectedBrand]);

  return <BrandList brandList={brandList} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />;
};

export default BrandListContainer;
