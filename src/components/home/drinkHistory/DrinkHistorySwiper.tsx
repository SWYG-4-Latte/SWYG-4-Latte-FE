'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';

import DrinkHistoryCard from './DrinkHistoryCard';
import { Menu } from '@/types/home/menu';

const DrinkHistorySwiper = ({ slideData }: { slideData: Menu[] }) => {
  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={8}
      freeMode={true}
      modules={[FreeMode]}
      slidesOffsetBefore={20}
      slidesOffsetAfter={20}
      className="!pb-8"
    >
      {slideData.map((data) => (
        <SwiperSlide key={data.menuNo}>
          <DrinkHistoryCard drinkHistoryData={data} isEmpty={false} />
        </SwiperSlide>
      ))}
      {slideData.length === 1 && (
        <SwiperSlide>
          <DrinkHistoryCard isEmpty={true} />
        </SwiperSlide>
      )}
    </Swiper>
  );
};
export default DrinkHistorySwiper;
