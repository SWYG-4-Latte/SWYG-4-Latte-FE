'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useMemberStore from '@/store/memberStore';
import useModal from '@/hooks/useModal';
import useInput from '@/hooks/useInput';
import useLoginStore from '@/store/loginStore';
import FooterGradientButton from '@/components/common/button/FooterGradientButton';
import { validateAge, validateEmail, validateNickname, validatePregnancyMonth } from '@/utils/validation';
import { cn } from '@/utils/style';
import Input from '@/components/common/input/Input';
import { INPUT_MESSAGE } from '@/constants/message';

import apiInstance from '@/api/instance';
import ExitModal from '@/components/common/modal/ExitModal';
import ExitSuccessModal from '@/components/common/modal/ExitSuccessModal';

export default function MyProfileContent() {
  const router = useRouter();
  const { isOpen: exitModalIsOpen, openModal: openExitModal, closeModal: closeExitModal } = useModal('exit');
  const {
    isOpen: exitSuccessModalIsOpen,
    openModal: openExitSuccessModal,
    closeModal: closeExitSuccessModal,
  } = useModal('exitSuccess');

  const { memberInfo, setMemberInfo } = useMemberStore();

  const {
    value: email,
    hasError: emailHasError,
    handleInputChange: handleEmailChange,
    setValue: setEmail,
  } = useInput('', validateEmail);

  const {
    value: nickname,
    hasError: nicknameHasError,
    handleInputChange: handleNicknameChange,
    setValue: setNickname,
  } = useInput('', validateNickname);

  const {
    value: age,
    hasError: ageHasError,
    handleInputChange: handleAgeChange,
    setValue: setAge,
  } = useInput('', validateAge);

  const {
    value: pregnancyMonth,
    hasError: pregnancyMonthHasError,
    handleInputChange: handlePregnancyMonthChange,
    setValue: setPregnancyMonth,
  } = useInput('', validatePregnancyMonth);

  const [gender, setGender] = useState<null | string>('');
  const [isPregnant, setIsPregnant] = useState(false);
  const [nicknameInputMessage, setNicknameInputMessage] = useState('');
  const [emailInputMessage, setEmailInputMessage] = useState('');

  const { setLogout } = useLoginStore();

  const handleUpdateProfile = async () => {
    try {
      const { data } = await apiInstance.post(`/auth/update/${memberInfo.mbrNo}`, {
        nickname,
        age,
        gender,
        email,
        pregMonth: pregnancyMonth,
        pregnancy: isPregnant,
      });

      if (data.message === '이메일이 이미 존재합니다.') {
        setEmailInputMessage(INPUT_MESSAGE.EMAIL.DUPLICATE);
        return;
      } else if (data.message === '닉네임이 이미 존재합니다.') {
        setNicknameInputMessage(INPUT_MESSAGE.NICKNAME.DUPLICATE);
        return;
      }

      toast('내 프로필을 저장했어요', {
        toastId: 'profile-update',
      });
      setMemberInfo(data.data.result);
    } catch (error) {
      console.error('업데이트 에러', error);
    }
  };

  const handleLogout = () => {
    setLogout();
    router.push('/home');
  };

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      router.replace('/auth/login');
    }
  }, [router]);

  useEffect(() => {
    if (emailHasError) {
      setEmailInputMessage(email.trim() === '' ? INPUT_MESSAGE.EMAIL.EMPTY : INPUT_MESSAGE.EMAIL.INVALID);
    } else {
      setEmailInputMessage('');
    }
  }, [emailHasError, email]);

  useEffect(() => {
    if (nicknameHasError) {
      setNicknameInputMessage(nickname.trim() === '' ? INPUT_MESSAGE.NICKNAME.EMPTY : INPUT_MESSAGE.NICKNAME.INVALID);
    } else {
      setNicknameInputMessage('');
    }
  }, [nicknameHasError, nickname]);

  useEffect(() => {
    setEmail(memberInfo.email);
    setNickname(memberInfo.nickname);
    setAge(memberInfo.age);
    setGender(memberInfo.gender);
    setIsPregnant(memberInfo.pregnancy);
    setPregnancyMonth(memberInfo.pregMonth.toString());
  }, [memberInfo]);

  return (
    <>
      {exitModalIsOpen && (
        <ExitModal isOpen={exitModalIsOpen} onClose={closeExitModal} openSuccessModal={openExitSuccessModal} />
      )}
      {exitSuccessModalIsOpen && <ExitSuccessModal isOpen={exitSuccessModalIsOpen} onClose={closeExitSuccessModal} />}

      <section className="flex h-auto w-full min-w-[360px] flex-col items-center  pt-14">
        {/* 이미지 */}
        <div className="flex-all-center mb-5 mt-8 w-full ">
          <Image src="/svgs/svg_profile.svg" alt="my-profile" width={120} height={120} priority unoptimized />
        </div>
        {/* 나의 기본 정보 */}
        <form className="flex w-full flex-col justify-center space-y-2 px-5">
          <h2 className="mb-2 font-semibold text-gray10">나의 기본 정보</h2>

          <Input
            required
            type="text"
            id="nickname"
            label="닉네임"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="3자 이상으로 입력해주세요."
            error={nicknameInputMessage}
          />
          <Input
            required
            type="text"
            id="email"
            label="이메일"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일"
            error={emailInputMessage}
          />

          <Input
            type="number"
            id="age"
            label="만 나이"
            value={age}
            onChange={handleAgeChange}
            placeholder="만 나이를 입력해주세요."
            error={age && ageHasError && INPUT_MESSAGE.AGE.RANGE}
          >
            <p className="text-sm leading-6 text-gray08">세</p>
          </Input>

          <label htmlFor="gender" className="text-xs text-gray10">
            성별
          </label>
          <div className="flex items-center space-x-2 ">
            <label
              className={cn(
                'flex-all-center h-[34px] w-[96px] cursor-pointer rounded-md border border-gray05 bg-gray01 px-4 py-2 text-gray08',
                gender === 'M' && 'border-primaryOrange bg-orange01 text-primaryOrange',
              )}
            >
              <input name="gender" id="male" type="radio" checked={gender === 'M'} onChange={() => setGender('M')} />
              <span className="text-[14px] leading-6">남성</span>
            </label>

            <label
              className={cn(
                'flex-all-center h-[34px] w-[96px] cursor-pointer rounded-md border border-gray05 bg-gray01 px-4 py-2 text-gray08',
                gender === 'F' && 'border-primaryOrange bg-orange01 text-primaryOrange',
              )}
            >
              <input name="gender" id="female" type="radio" checked={gender === 'F'} onChange={() => setGender('F')} />
              <span className="text-[14px] leading-6">여성</span>
            </label>
          </div>

          {gender === 'F' && (
            <>
              <p className="text-xs text-gray10">임신여부</p>
              <div className="flex items-center space-x-2">
                <label
                  className={cn(
                    'flex-all-center h-[34px] w-[96px] cursor-pointer rounded-md border border-gray05 bg-gray01 px-4 py-2 text-gray08',
                    isPregnant && 'border-primaryOrange bg-orange01 text-primaryOrange',
                  )}
                >
                  <input name="pregnancy" type="radio" checked={isPregnant} onChange={() => setIsPregnant(true)} />
                  <span className="text-[14px] leading-6">예</span>
                </label>

                <label
                  className={cn(
                    'flex-all-center h-[34px] w-[96px] cursor-pointer rounded-md border border-gray05 bg-gray01 px-4 py-2 text-gray08',
                    !isPregnant && 'border-primaryOrange bg-orange01 text-primaryOrange',
                  )}
                >
                  <input name="pregnancy" type="radio" checked={!isPregnant} onChange={() => setIsPregnant(false)} />
                  <span className="text-[14px] leading-6">아니요</span>
                </label>
              </div>
            </>
          )}
          {gender === 'F' && isPregnant && (
            <Input
              type="number"
              id="pregnancy-month"
              label="임신 개월 수"
              value={pregnancyMonth}
              onChange={handlePregnancyMonthChange}
              placeholder="임신 개월 수를 입력해주세요."
              error={
                pregnancyMonthHasError &&
                (pregnancyMonth.trim() === '' ? INPUT_MESSAGE.PREGNANT.EMPTY : INPUT_MESSAGE.PREGNANT.INVALID)
              }
            >
              <span className="whitespace-nowrap text-sm text-gray08">개월</span>
            </Input>
          )}
        </form>

        <div className="mt-6 h-2 w-full bg-gray03" />
        {/* 나의 추가 설정 */}
        <div className="flex h-[200px] w-full flex-col px-5 text-gray10">
          <Link href="/mypage/memberinfo">
            <div className="my-4 flex w-full items-center justify-between py-1">
              <div className="flex flex-col">
                <h2 className="mb-2 font-medium">나의 카페인 추가 설정</h2>
                <p className="text-xs text-gray06">추가 정보를 입력하고 나에게 적절한 카페인 양을 알아보세요</p>
              </div>
              <Image src="/svgs/svg_rightArrow.svg" alt="rightArrow" width={16} height={16} priority unoptimized />
            </div>
          </Link>
          <div className="mt-2 flex w-full items-center justify-center text-xs">
            <p onClick={handleLogout} className="cursor-pointer hover:text-primaryOrange">
              로그아웃
            </p>
            <div className="mx-4 h-3 w-[1px] bg-gray05" />
            <p onClick={() => openExitModal()} className="cursor-pointer hover:text-primaryOrange">
              회원탈퇴
            </p>
          </div>
        </div>

        <FooterGradientButton
          onClick={handleUpdateProfile}
          disabled={
            nicknameHasError || emailHasError || (!!age && ageHasError) || (isPregnant && pregnancyMonthHasError)
          }
        >
          저장하기
        </FooterGradientButton>
      </section>
    </>
  );
}
