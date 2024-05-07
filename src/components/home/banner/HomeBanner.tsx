import Link from 'next/link';
import Image from 'next/image';

import Button from '../../common/button/Button';
import BannerText from './BannerText';
import { UserCaffeineData } from '@/types/home/user';

const HomeBanner = ({ caffeineData }: { caffeineData: UserCaffeineData | null }) => {
  const hasTodayData = caffeineData && caffeineData.today !== '0mg';

  const buttonText = caffeineData ? '오늘의 카페인 기록하기' : '지금 시작하기';
  let bannerImgUrl = '/images/img-banner-none.png';

  if (hasTodayData) {
    if (caffeineData.status === '적정') bannerImgUrl = '/images/img-banner-appropriate.png';
    else bannerImgUrl = '/images/img-banner-excess.png';
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
        {/* 하루 카페인 권장량 계산하는 정보 미등록인지 확인하는 api나오면 추가 */}
        <Link href={caffeineData ? (caffeineData.today === '0mg' ? '/menu' : '/calendar/today-caffeine') : '/login'}>
          <Button className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium`}>{buttonText}</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeBanner;
