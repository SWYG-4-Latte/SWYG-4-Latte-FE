import Image from 'next/image';

import { CafeBrand } from '@/types/home/brand';

const Brand = ({ selected, brandData }: { selected: boolean; brandData: CafeBrand }) => {
  return (
    <div className="flex w-12 cursor-pointer flex-col items-center justify-center gap-2">
      <div
        className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white ${selected ? 'border-[3px] border-primaryOrange' : ''}`}
      >
        <Image
          src={brandData.imageUrl}
          alt={brandData.brandName}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
      <div className="whitespace-nowrap text-xs text-gray08">{brandData.brandName}</div>
    </div>
  );
};

export default Brand;
