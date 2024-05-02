'use client';

import Link from 'next/link';
import Image from 'next/image';

import Button from '../../common/button/Button';
import BannerText from './BannerText';
import { CaffeineData } from '@/types/home/drinkHistory';

const HomeBanner = ({ caffeineData }: { caffeineData: CaffeineData | null }) => {
  const emptyHistory = caffeineData && caffeineData.today !== '0mg';

  const buttonText = caffeineData ? '오늘의 카페인 기록하기' : '지금 시작하기';
  let bannerImgUrl = '/svgs/img-banner-none.svg';

  if (emptyHistory) {
    if (caffeineData.status === '적정') bannerImgUrl = '/svgs/img-banner-appropriate.svg';
    else bannerImgUrl = '/svgs/img-banner-excess.svg';
  }

  return (
    <div className="relative">
      <Image
        priority
        src={bannerImgUrl}
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full"
        alt="배너 이미지"
      />
      <div className="absolute left-5 top-1/2 flex -translate-y-2/4 flex-col">
        <BannerText caffeineData={caffeineData} />
        {/* 하루 카페인 권장량 계산하는 정보 미등록인지 확인하는 api나오면 추가 */}
        <Link href={caffeineData ? (caffeineData.today === '0mg' ? '/category' : '/today-caffeine') : '/login'}>
          <Button className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium`}>{buttonText}</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeBanner;
