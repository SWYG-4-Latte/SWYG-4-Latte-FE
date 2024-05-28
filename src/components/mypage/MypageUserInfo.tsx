'use client';

// NEXT && React
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useMemo, useEffect } from 'react';
import { fetchMemberInfo } from '@/utils/mypage/isMember';
//Zustand

interface IMemberInfo {
  mbrNo: number;
  mbrId: string;
  password: string;
  nickname: string;
  cellPhone: string;
  email?: string;
  gender?: string;
  age?: string;
  pregnancy?: boolean;
  pregMonth?: number;
  allergy?: string;
  cupDay?: string;
  symptom?: string;
  regDate?: string;
  updateDate?: string | null;
  imgUrl?: string | null;
  role?: string;
  authorities?: Array<{ authority: string }>;
  accountNonLocked?: boolean;
  accountNonExpired?: boolean;
  credentialsNonExpired?: boolean;
  enabled?: boolean;
}
interface IMemberData {
  caffeinIntake: string;
  member: IMemberInfo;
}

export default function MypageUserInfo() {
  const [memberData, setMemberData] = useState<IMemberData | null>(null);
  const [memberInfo, setMemberInfo] = useState<IMemberInfo | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(true);

  useEffect(() => {
    console.log('fetch memberInfo useEffect working in MY');
    const loadMemberInfo = async () => {
      const info = await fetchMemberInfo();
      setMemberData(info);
      setMemberInfo(info.member);
    };

    loadMemberInfo();
  }, []);

  useEffect(() => {
    setAccessToken(localStorage.getItem('accessToken'));
  }, []);

  console.log(memberData);
  console.log(memberInfo);

  const handelTooltipVisible = () => {
    setIsTooltipVisible(!isTooltipVisible)
  }

  const nicknameText = memberInfo ? memberInfo.nickname : '사용자';
  const genderText = memberInfo ? (memberInfo.gender === 'M' ? '남성' : memberInfo.gender === 'F' ? '여성' : '-') : '-';
  const pregnancyText = memberInfo
  ? memberInfo.gender === 'M'
    ? '-'
    : memberInfo.pregnancy
    ? `예${memberInfo.pregMonth ? ' / ' + memberInfo.pregMonth + '개월' : ''}`
    : '아니요'
  : '-';
  const caffeineText = memberData?.caffeinIntake ? memberData.caffeinIntake + 'mg' : '-';

  const formatAllergyText = (allergies: string) => {
    const allergyList = allergies.split(', ').filter(Boolean);

    if (allergyList[0] === '없어요') {
      return '-';
    }

    switch (allergies.length) {
      case 0:
        return '-';
      case 1:
        return allergyList[0];
      case 2:
        return allergyList.join(', ');
      default:
        return `${allergyList[0]} 외 다수`;
    }
  };

  const allergyText = memberInfo?.allergy ? formatAllergyText(memberInfo.allergy) : '-';

  const renderBeforeLogin = (
    <div className="flex flex-col justify-center space-y-2">
      <Link href="/auth/login">
        <div className="flex items-center gap-1">
          <div className="text-lg font-semibold">로그인 해주세요</div>
          <Image src="/svgs/svg_rightArrow.svg" alt="right-Arrow" width={16} height={16} priority unoptimized />
        </div>
      </Link>
      <div className="h-[28px] w-[186px] whitespace-nowrap rounded-md bg-orange01 px-4 py-2 text-[10px] text-primaryOrange">
        나에게 적절한 카페인 양을 알 수 있어요!
      </div>
    </div>
  );

  const renderAfterLogin = (
    <div className="ml-4 flex w-full items-center justify-between">
      <div className="font-semibold">
        {nicknameText}
        <span className="ml-[2px] text-gray08">님</span>
      </div>
      <Link href="/mypage/my-profile">
        <div className="flex-all-center h-[26px] w-[61px] rounded-md border border-gray05 bg-gray01 text-xs text-gray08">
          내 프로필
        </div>
      </Link>
    </div>
  );

  return (
    <div className="w-full pt-14">
      <section className="flex-all-center h-[94px] w-full bg-primaryIvory px-5 py-[18px]">
        <div className="flex w-full items-center">
          <Link href="/home">
            <Image
              src="/svgs/svg_profile.svg"
              alt="leftArrow"
              width={56}
              height={56}
              className="mr-4"
              priority
              unoptimized
            />
          </Link>
          {/* 조건부렌더링 */}
          {accessToken ? renderAfterLogin : renderBeforeLogin}
        </div>
      </section>
      <section className="flex h-[156px] w-full items-center justify-center px-5">
        {/* 성별 / 임신여부 / 적정 카페인량 / 알레르기 */}
        <article className="flex h-[111px] w-full items-center justify-between rounded-xl border border-gray04 bg-gray01 px-[26px] py-[16px] shadow-toast">
          {/* ITEMS */}
          <div className="flex flex-col items-center justify-center w-[60px] h-[79px]">
            <Image src="/svgs/svg_my-sex.svg" alt="my-sex" width={40} height={40} priority unoptimized />
            <p className="mt-[7px] text-xs text-gray08">성별</p>
            <p className="text-xs font-semibold">{genderText}</p>
          </div>
          <div className="flex flex-col items-center justify-center w-[61px] h-[79px]">
            <Image src="/svgs/svg_my-pregnancy.svg" alt="my-pregnancy" width={40} height={40} priority unoptimized />
            <p className="mt-[7px] text-xs text-gray08">임신 여부</p>
            <p className="text-xs font-semibold">{pregnancyText}</p>
          </div>
          <div className="flex flex-col items-center justify-center w-[65px] h-[79px]">
            <Image
              src="/svgs/svg_my-caffeinefit.svg"
              alt="my-caffeinefit"
              width={40}
              height={40}
              priority
              unoptimized
            />
            <p className="mt-[7px] text-xs text-gray08">적정 카페인량</p>
            <div className="relative flex items-center gap-[2px] justify-center text-xs font-semibold">
                {caffeineText}
                  <Image
                    onClick={handelTooltipVisible}
                    className='mt-[2px] cursor-pointer'
                    src="/svgs/svg_mypage-tooltipbtn.svg"
                    alt="tooltip-btn"
                    width={12}
                    height={12}
                    priority
                    unoptimized
                    />
            {isTooltipVisible && (
            <aside className="absolute -right-[36px] top-[16px] z-10 h-[60px] w-[222px]">
              <p className="absolute z-10 px-4 py-4 text-xs leading-[18px] text-gray00">
                사용자의 연령, 성별, 카페인 부작용 <br />등을 고려하여 선정한 기준입니다.
              </p>
              <button
              className="absolute right-4 top-4 h-4 w-4"
              onClick={(e) => {
                e.stopPropagation();
                setIsTooltipVisible(false);
              }}
              >
                <Image src="/svgs/close-white.svg" width={16} height={16} alt="닫기" />
              </button>
              <Image 
              className=''
              src="/svgs/svg_mypage-tooltip.svg" width={222} height={60} alt="mypage-tooltip" />
            </aside>
            )}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-[60px] h-[79px]">
            <Image src="/svgs/svg_my-allergy.svg" alt="my-allergy" width={40} height={40} priority unoptimized />
            <p className="mt-[7px] text-xs text-gray08">알레르기</p>
            <p className="text-xs font-semibold">{allergyText}</p>
          </div>
        </article>
      </section>
    </div>
  );
}
