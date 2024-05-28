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
      slidesOffsetBefore={20}
      spaceBetween={8}
      freeMode={true}
      modules={[FreeMode]}
      slidesOffsetAfter={20}
      className="!pb-8"
    >
      {slideData.map((data) => (
        <SwiperSlide key={data.menuNo}>
          <DrinkHistoryCard drinkHistoryData={data} />
        </SwiperSlide>
      ))}
      {slideData.length === 1 && (
        <SwiperSlide>
          <DrinkHistoryCard />
        </SwiperSlide>
      )}
    </Swiper>
  );
};
export default DrinkHistorySwiper;
