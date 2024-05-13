import { Dispatch, SetStateAction } from 'react';

import Brand from '@/components/common/Brand';
import { CafeBrand } from '@/types/home/brand';
import { BRAND_NAME } from '@/constants/home/brandName';

interface BrandListProps {
  brandList: CafeBrand[];
  selectedBrand: string;
  setSelectedBrand: Dispatch<SetStateAction<string>>;
}

const BrandList = ({ brandList, selectedBrand, setSelectedBrand }: BrandListProps) => {
  return (
    <div className="flex justify-between bg-primaryIvory px-5 py-4">
      {brandList.map((data) => (
        <div key={data.brandName} onClick={() => setSelectedBrand(BRAND_NAME[data.brandName])}>
          <Brand brandData={data} selected={selectedBrand === BRAND_NAME[data.brandName]} />
        </div>
      ))}
    </div>
  );
};

export default BrandList;
