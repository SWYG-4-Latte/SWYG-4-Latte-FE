import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css/bundle';
import 'swiper/css/pagination';

const OnboardingSwiper = () => {
  return (
    <Swiper
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="!pb-6"
    >
      {ONBOARDING.map(({ order, title, description }) => (
        <SwiperSlide key={order} className="swiper-onboarding">
          <h1 className="text-center text-[22px] font-bold leading-[30px] text-gray10">{title}</h1>
          <p className="my-3 text-center text-xs leading-4 text-gray08">{description}</p>
          <div className="px-5">
            <Image
              src={`/images/img-onboarding${order}.png`}
              alt="화면 이미지"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-full"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default OnboardingSwiper;

const ONBOARDING = [
  {
    order: 1,
    title: (
      <>
        <span className="text-primaryOrange">카페인 맞춤 정보</span>를 제공해요
      </>
    ),
    description: (
      <>
        내가 입력한 카페인 정보를 기반으로 <br /> 하루 권장 카페인 섭취량을 제공하고 있어요.
      </>
    ),
  },
  {
    order: 2,
    title: (
      <>
        <span className="text-primaryOrange">오늘 마신 카페인</span>을 기록해요
      </>
    ),
    description: (
      <>
        마신 음료를 오늘 마신 카페인으로 기록해보세요. <br /> 나의 카페인 섭취 현황을 확인할 수 있어요.
      </>
    ),
  },
  {
    order: 3,
    title: (
      <>
        <span className="text-primaryOrange">궁금한 성분</span>을 비교해요
      </>
    ),
    description: (
      <>
        비교하고 싶은 음료가 있다면 비교함에 담아보세요. <br /> 성분을 비교하여 나에게 적절한 음료를 찾을 수 있어요.
      </>
    ),
  },
  {
    order: 4,
    title: (
      <>
        <span className="text-primaryOrange">섭취 현황</span>을 한 눈에 확인해요
      </>
    ),
    description: (
      <>
        카페인 달력에서 나의 섭취 현황을 확인하고, <br /> 지속적인 카페인 관리 습관을 형성해봐요.
      </>
    ),
  },
];
