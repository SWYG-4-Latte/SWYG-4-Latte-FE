'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { CafeBrand } from '@/types/home/brand';
import BrandSwiper from '@/components/common/brand/BrandSwiper';

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
  }, [selectedBrand, pathname, router, searchParams]);

  return <BrandSwiper brandList={brandList} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />;
};

export default BrandListContainer;
