'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';

import { CafeBrand } from '@/types/home/brand';
import Brand from './Brand';

const BrandSwiper = ({ slideData }: { slideData: CafeBrand[] }) => {
  const [selectedBrandIdx, setSelectedBrandIdx] = useState<number>(0);

  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={20}
      freeMode={true}
      modules={[FreeMode]}
      slidesOffsetBefore={20}
      slidesOffsetAfter={20}
      className="w-full"
    >
      {slideData.map((data, idx) => (
        <SwiperSlide
          key={idx}
          className="max-w-12"
          onClick={() => {
            setSelectedBrandIdx(idx);
          }}
        >
          <Brand brandData={data} selected={selectedBrandIdx === idx} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default BrandSwiper;
