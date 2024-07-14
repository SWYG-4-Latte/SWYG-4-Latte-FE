'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { FreeMode } from 'swiper/modules';
import 'swiper/css/bundle';

import { CafeBrand } from '@/types/home/brand';
import { BRAND_NAME } from '@/constants/home/brandName';
import { cn } from '@/utils/style';

interface BrandSwiperProps {
  brandList: CafeBrand[];
  selectedBrand: string;
  setSelectedBrand: Dispatch<SetStateAction<string>>;
}

const BrandSwiper = ({ brandList, selectedBrand, setSelectedBrand }: BrandSwiperProps) => {
  const [swiper, setSwiper] = useState<SwiperCore>();
  const pathname = usePathname();

  useEffect(() => {
    if (swiper) {
      const idx = brandList.findIndex((brand) => BRAND_NAME[brand.brandName] === selectedBrand);
      swiper.slideTo(idx);
    }
  }, [selectedBrand, brandList, swiper]);

  return (
    <div className="flex h-[41px] border-b-2 border-gray04 bg-primaryIvory pb-[2px]">
      <Swiper
        onSwiper={setSwiper}
        modules={[FreeMode]}
        freeMode={true}
        className="swiper-brand h-[41px]"
        slidesOffsetAfter={20}
        slidesPerView="auto"
      >
        {brandList.map((data) => (
          <SwiperSlide
            key={data.brandName}
            className="cursor-pointer first:ml-5"
            onClick={() => {
              setSelectedBrand(BRAND_NAME[data.brandName]);
            }}
          >
            <div className="relative flex h-[41px] min-w-[76px] items-center justify-center">
              <span
                className={cn(
                  'text-sm text-gray08',
                  selectedBrand === BRAND_NAME[data.brandName] && 'font-semibold text-primaryOrange',
                )}
              >
                {data.brandName}
              </span>
              {selectedBrand === BRAND_NAME[data.brandName] && (
                <motion.div
                  layoutId={`${pathname}-brand-menu`}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-0 h-[2px] w-full bg-primaryOrange"
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default BrandSwiper;
