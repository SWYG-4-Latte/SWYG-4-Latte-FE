import Link from 'next/link';
import Image from 'next/image';

import Button from '../../common/button/Button';
import BannerText from './BannerText';
import { UserCaffeineData } from '@/types/home/user';
import BannerCaffeineNoneImg from '/public/images/img-banner-none.png';
import BannerCaffeineAppropriateImg from '/public/images/img-banner-appropriate.png';
import BannerCaffeineExcessImg from '/public/images/img-banner-excess.png';
import BannerDefaultImg from '/public/images/img-banner-default.png';

interface HomeBannerProps {
  caffeineData: UserCaffeineData | null;
  isLoading: boolean;
}

const HomeBanner = ({ caffeineData, isLoading }: HomeBannerProps) => {
  const hasTodayData = caffeineData && caffeineData.status && caffeineData.today !== '0mg';
  const buttonText = caffeineData && caffeineData.status ? '오늘의 카페인 기록하기' : '지금 시작하기';

  let bannerImage = BannerCaffeineNoneImg;
  if (hasTodayData) {
    if (caffeineData.status === '적정') {
      bannerImage = BannerCaffeineAppropriateImg;
    } else {
      bannerImage = BannerCaffeineExcessImg;
    }
  }

  let navigatePath = '/auth/login';
  if (caffeineData) {
    if (!caffeineData.status) {
      // 로그인했지만 부가정보 입력하지 않은 사용자
      navigatePath = '/mypage/my-profile';
    } else if (caffeineData.today === '0mg') {
      navigatePath = '/menu';
    } else {
      navigatePath = '/calendar/today-caffeine';
    }
  }

  return (
    <div className="relative w-full bg-primaryBeige pb-[61.11%]">
      {isLoading && (
        <>
          <Image priority fill src={BannerDefaultImg} className="h-auto w-full" alt="배너 이미지" placeholder="blur" />
          <div className="loading loading-spinner loading-md absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primaryOrange"></div>
        </>
      )}
      {!isLoading && (
        <>
          <Image
            priority
            fill
            src={bannerImage}
            sizes="100%"
            quality={100}
            className="h-auto w-full"
            alt="배너 이미지"
            placeholder="blur"
          />

          <div className="absolute left-5 top-1/2 flex -translate-y-2/4 flex-col">
            <BannerText caffeineData={caffeineData} />
            <Link href={navigatePath}>
              <Button className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium`}>{buttonText}</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeBanner;
