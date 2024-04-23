const BannerText = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  // 닉네임, 오늘의 카페인 섭취량, 오늘의 적정량 -> API 나온 후 수정
  const nickname = '닉네임';
  const appropriateAmount = 250;
  const todayCaffeineAmount = 150;

  let displayText = '오늘의 적정량';
  if (todayCaffeineAmount < appropriateAmount) {
    displayText += `이 ${appropriateAmount - todayCaffeineAmount}mg 남았어요`;
  } else {
    displayText += `을 ${todayCaffeineAmount - appropriateAmount}mg 넘었어요`;
  }

  if (!isLoggedIn) {
    return (
      <p className="mb-6 text-base font-semibold leading-snug text-gray10">
        <span>
          아직 사용자님의
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
  return (
    <div className="mb-4 inline-flex flex-col items-start gap-2 ">
      <p className="font-semibold leading-snug text-gray10">
        <span>
          {nickname}님이
          <br />
          오늘 마신 카페인은
          <br />
        </span>
        <span className="text-primaryOrange">총 {todayCaffeineAmount}mg</span>
        <span>이에요</span>
      </p>
      <p className="text-xs text-gray08">{displayText}</p>
    </div>
  );
};

export default BannerText;
