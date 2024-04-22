import Image from 'next/image';

import { CafeBrand } from '@/types/home/brand';

const Brand = ({ selected, brandData }: { selected: boolean; brandData: CafeBrand }) => {
  return (
    <div className="flex cursor-pointer flex-col items-center justify-center gap-2">
      <div className={`h-12 w-12 rounded-full bg-gray04 ${selected ? 'border-2 border-primaryOrange' : ''}`}>
        {/* {브랜드 이미지 넣을 예정}
        <Image src={brandData.img} width={48} height={48} alt={`${brandData.name}`}/> */}
      </div>
      <div className="text-center text-xs">{brandData.name}</div>
    </div>
  );
};

export default Brand;
