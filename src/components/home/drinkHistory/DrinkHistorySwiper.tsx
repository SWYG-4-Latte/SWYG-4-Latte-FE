'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';

import { DrinkHistoryData } from '@/types/home/drinkHistory';
import DrinkHistoryCard from './DrinkHistoryCard';

const DrinkHistorySwiper = ({ slideData }: { slideData: DrinkHistoryData[] }) => {
  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={8}
      freeMode={true}
      modules={[FreeMode]}
      slidesOffsetBefore={20}
      slidesOffsetAfter={20}
    >
      {slideData.map((data) => (
        <SwiperSlide key={data.id}>
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
