import Image from 'next/image';
import { useEffect } from 'react';

import KakaoIcon from '/public/svgs/kakao.svg';

declare global {
  interface Window {
    Kakao: any;
  }
}

const OAuthLoginSection = () => {
  useEffect(() => {
    const kakaoSDK = document.createElement('script');
    kakaoSDK.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
    kakaoSDK.integrity = 'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4';
    kakaoSDK.crossOrigin = `anonymous`;
    document.head.appendChild(kakaoSDK);

    kakaoSDK.onload = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
      }
    };
  }, []);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: window.location.origin + '/auth/login/kakao',
    });
  };

  return (
    <section className="mt-6 flex w-full flex-col gap-6">
      <div className="flex items-center gap-[7.5px]">
        <div className="h-[1px] flex-1 bg-gray04" />
        <span className="text-nowrap text-xs text-gray06">간편 로그인</span>
        <div className="h-[1px] flex-1 bg-gray04" />
      </div>
      <button
        onClick={handleKakaoLogin}
        className="flex h-[52px] w-full items-center justify-center rounded-lg bg-[#FFE558] px-5 py-4"
      >
        <span className="flex items-center gap-4 font-semibold leading-[25px] text-gray10">
          <Image src={KakaoIcon} alt="카카오 아이콘" />
          카카오로 시작하기
        </span>
      </button>
    </section>
  );
};

export default OAuthLoginSection;
