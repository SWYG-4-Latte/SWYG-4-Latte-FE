import { UserCaffeineData } from '@/types/home/user';

const BannerText = ({ caffeineData }: { caffeineData: UserCaffeineData | null }) => {
  if (!caffeineData || !caffeineData.status) {
    return (
      <p className="mb-6 text-base font-semibold leading-snug text-gray10">
        <span>
          아직 {caffeineData?.nickname ?? '사용자'}님의
          <br />
        </span>
        <span className="text-primaryOrange">하루 카페인 권장량</span>
        <span>
          을 알지 못해요
          <br />
          지금 확인하러 가시겠어요?
        </span>
      </p>
    );
  }

  const { status, today, interval, nickname } = caffeineData;

  let displayText = '오늘의 적정량';
  if (status === '적정') {
    displayText += `이 ${interval} 남았어요`;
  } else {
    displayText += `을 ${interval} 넘었어요`;
  }

  return (
    <div className="mb-4 inline-flex flex-col items-start gap-2 ">
      <p className="font-semibold leading-snug text-gray10">
        {today === '0mg' ? (
          <>
            아직 추가된 카페인이 없어요.
            <br />
            <span className="text-primaryOrange">오늘 마신 카페인</span>
            이 있다면
            <br />
            지금 추가해주세요!
          </>
        ) : (
          <>
            {nickname}님이
            <br />
            오늘 마신 카페인은
            <br />
            <span className="text-primaryOrange">총 {today}</span>
            이에요
          </>
        )}
      </p>
      <p className="text-xs text-gray08">{displayText}</p>
    </div>
  );
};

export default BannerText;
