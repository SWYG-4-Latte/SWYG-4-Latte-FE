import Link from 'next/link';
import Image from 'next/image';

import Button from '../../common/button/Button';
import BannerText from './BannerText';
import { UserCaffeineData } from '@/types/home/user';

const HomeBanner = ({ caffeineData }: { caffeineData: UserCaffeineData | null }) => {
  const hasTodayData = caffeineData && caffeineData.status && caffeineData.today !== '0mg';

  const buttonText = caffeineData && caffeineData.status ? '오늘의 카페인 기록하기' : '지금 시작하기';
  let bannerImgUrl = '/images/img-banner-none.png';

  if (hasTodayData) {
    if (caffeineData.status === '적정') bannerImgUrl = '/images/img-banner-appropriate.png';
    else bannerImgUrl = '/images/img-banner-excess.png';
  }

  let navigatePath = '/auth/login';
  if (caffeineData) {
    if (!caffeineData.status) {
      // 로그인했지만 부가정보 입력하지 않은 사용자
      navigatePath = '/mypage/memberinfo';
    } else if (caffeineData.today === '0mg') {
      navigatePath = '/menu';
    } else {
      navigatePath = '/calendar/today-caffeine';
    }
  }

  return (
    <div className="relative min-h-[220px] bg-primaryBeige">
      <Image
        priority
        src={bannerImgUrl}
        width={0}
        height={0}
        quality={100}
        sizes="100vw"
        className="h-auto w-full"
        alt="배너 이미지"
      />
      <div className="absolute left-5 top-1/2 flex -translate-y-2/4 flex-col">
        <BannerText caffeineData={caffeineData} />
        <Link href={navigatePath}>
          <Button className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium`}>{buttonText}</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeBanner;
