import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';

import Brand from '@/components/common/Brand';
import BrandListSkeleton from '@/components/common/skeleton/BrandListSkeleton';
import { CafeBrand } from '@/types/home/brand';

interface BrandListProps {
  selectedBrand: string;
  setSelectedBrand: Dispatch<SetStateAction<string>>;
}

const BrandList = ({ selectedBrand, setSelectedBrand }: BrandListProps) => {
  const [brandList, setBrandList] = useState<CafeBrand[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getBrandList = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu/brand`);

      setBrandList(response.data.data);
      setIsLoading(false);
    };

    getBrandList();
  }, []);

  return (
    <div className="flex justify-between bg-primaryIvory px-5 py-4">
      {isLoading && <BrandListSkeleton />}
      {!isLoading && (
        <>
          {brandList.map((data) => (
            <div key={data.brandName} onClick={() => setSelectedBrand(data.brandName)}>
              <Brand brandData={data} selected={selectedBrand === data.brandName} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default BrandList;
