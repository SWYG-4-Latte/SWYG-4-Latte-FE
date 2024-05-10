'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css/bundle';

import DrinkHistoryCard from './DrinkHistoryCard';
import { Menu } from '@/types/menu/menu';

const DrinkHistorySwiper = ({ slideData }: { slideData: Menu[] }) => {
  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={8}
      freeMode={true}
      modules={[FreeMode]}
      slidesOffsetAfter={20}
      className="!m-0 !w-full !pb-8"
    >
      {slideData.map((data) => (
        <SwiperSlide key={data.menuNo} className="mr-2 !w-fit first:ml-5 last:mr-0">
          <DrinkHistoryCard drinkHistoryData={data} />
        </SwiperSlide>
      ))}
      {slideData.length === 1 && (
        <SwiperSlide className="!w-fit">
          <DrinkHistoryCard />
        </SwiperSlide>
      )}
    </Swiper>
  );
};
export default DrinkHistorySwiper;
