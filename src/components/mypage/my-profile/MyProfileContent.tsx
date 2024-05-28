'use client';
//NEXT
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
//Library
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
//Zustand
import useSignupStore from '@/store/signupStore';
import useMemberStore from '@/store/memberStore';
//Modal
import Modal, { ModalProps } from '@/components/common/modal/Modal';
import Button from '@/components/common/button/Button';
import useModal from '@/hooks/useModal';
//utils
import { fetchMemberInfo } from '@/utils/mypage/isMember';
import { deleteUser } from '@/utils/auth-signup/isDelete';
import useLoginStore from '@/store/loginStore';
import FooterGradientButton from '@/components/common/button/FooterGradientButton';

export default function MyProfileContent() {
  const router = useRouter();
  const { isOpen: isExitOpen, openModal: openExitModal, closeModal: closeExitModal } = useModal('exit');
  const { isOpen: isConfirmOpen, openModal: openConfirmModal, closeModal: closeConfirmModal } = useModal('exitConfirm');

  const {
    emailError,
    emailFocused,
    validateEmail,
    setEmailFocused,
    ageError,
    ageFocused,
    validateAge,
    setAgeFocused,
    nicknameError,
    nicknameFocused,
    validateNickname,
    setNicknameFocused,
    setPregMonthFocused,
    pregMonthError,
    pregMonthFocused,
    validatePregMonth,
  } = useSignupStore();

  const { setLogout } = useLoginStore();

  const { memberInfo, setMemberInfo, updateMemberInfo } = useMemberStore();

  useEffect(() => {
    console.log('fetch memberInfo useEffect working in 내 프로필');
    const loadMemberInfo = async () => {
      const info = await fetchMemberInfo();
      setMemberInfo(info.member);
    };

    loadMemberInfo();
  }, []);

  console.log(memberInfo);

  const handleInputChange = (field: any, value: string) => {
    switch (field) {
      case 'email':
        setMemberInfo({ ...memberInfo, [field]: value });
        validateEmail(value);
        break;
      case 'nickname':
        setMemberInfo({ ...memberInfo, [field]: value });
        validateNickname(value);
        break;
      case 'age':
        setMemberInfo({ ...memberInfo, [field]: value });
        validateAge(value);
        break;
      case 'pregMonth':
        setMemberInfo({ ...memberInfo, [field]: value });
        validatePregMonth(value);
        break;
    }
  };

  const handleUpdateProfile = async () => {
    console.log('업데이트 전 memberInfo:', memberInfo);

    await updateMemberInfo();
    toast('내 프로필을 저장했어요', {
      toastId: 'profile-update',
    });
  };

  const handleFocusChange = (field: string, focused: boolean) => {
    switch (field) {
      case 'email':
        setEmailFocused(focused);
        break;
      case 'nickname':
        setNicknameFocused(focused);
        break;
      case 'age':
        setAgeFocused(focused);
        break;
      case 'pregMonth':
        setPregMonthFocused(focused);
        break;
    }
  };

  const handleLogout = () => {
    setLogout();
    router.push('/home');
  };

  const handleExit = () => {
    openExitModal();
  };

  const handleConfirmExit = async () => {
    try {
      console.log('memberInfo.mbrNo in 탈퇴하기', memberInfo.mbrNo);
      await deleteUser(memberInfo.mbrNo);
      closeExitModal();
      localStorage.removeItem('accessToken'); // 로컬 스토리지에서 인증 토큰을 제거
      router.push('/home'); // 홈 페이지로 리다이렉트
    } catch (error) {
      console.error('회원 탈퇴 처리 중 오류 발생:', error);
    }
  };

  const renderExitConfirmModal = (
    <Modal isOpen={isConfirmOpen} onClose={closeConfirmModal}>
      <div className="text-lg font-semibold text-primaryOrange">탈퇴가 완료되었습니다</div>
      <p className="w-[182px] text-center text-sm leading-[20px] text-gray10">
        언제든 돌아오시길 기다릴게요! <br /> 더 좋은 서비스로 보답하겠습니다.
      </p>
      <Button onClick={closeConfirmModal} className="w-full rounded-lg px-4 py-3 font-semibold leading-[25px]">
        홈으로 돌아가기
      </Button>
    </Modal>
  );

  const renderExitModal = (
    <Modal isOpen={isExitOpen} onClose={closeExitModal}>
      <div className="text-lg font-semibold text-primaryOrange">정말 탈퇴하시겠어요?</div>
      <p className="w-[161px] text-center text-sm leading-[20px] text-gray10">
        지금 탈퇴하면 그동안 기록한 카페인 섭취량을 볼 수 없어요.
      </p>
      <div className="flex gap-2">
        <button
          className="h-[50px] w-32 rounded-lg border border-gray05 bg-primaryIvory px-4 py-3 font-semibold leading-[25px] text-gray08 hover:border-0 hover:bg-gray06 hover:text-gray00"
          onClick={closeExitModal}
        >
          아니요
        </button>
        <Button onClick={handleConfirmExit} className="w-32 rounded-lg px-4 py-3 font-semibold leading-[25px]">
          탈퇴하기
        </Button>
      </div>
    </Modal>
  );

  return (
    <>
      <section className="relative flex h-auto w-full min-w-[360px] flex-col items-center px-5 pt-14">
        {/* 이미지 */}
        <div className="flex-all-center mb-5 mt-8 w-full">
          <Image src="/svgs/svg_profile.svg" alt="my-profile" width={120} height={120} priority unoptimized />
        </div>
        {/* 나의 기본 정보 */}
        <form className="flex w-full flex-col justify-center space-y-2">
          <h2 className="font-semibold text-gray10">나의 기본 정보</h2>
          <label className="text-xs text-gray10">
            닉네임 <span className="text-primaryOrange">*</span>
          </label>
          <input
            type="text"
            value={memberInfo.nickname}
            onChange={(e) => handleInputChange('nickname', e.target.value)}
            onFocus={() => handleFocusChange('nickname', true)}
            onBlur={() => handleFocusChange('nickname', false)}
            placeholder="닉네임"
            className={`h-[50px] rounded-lg border bg-gray01 px-5 py-4 text-[14px] text-gray10 outline-none
                      placeholder:tracking-tighter ${nicknameError ? 'border-primaryRed' : nicknameFocused ? 'border-primaryOrange' : 'border-gray05'} placeholder:text-gray05`}
          />
          {nicknameError && <p className="mt-2 text-xs text-primaryRed">{nicknameError}</p>}
          <label className="text-xs text-gray10">
            이메일 <span className="text-primaryOrange">*</span>
          </label>
          <input
            type="text"
            value={memberInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onFocus={() => handleFocusChange('email', true)}
            onBlur={() => handleFocusChange('email', false)}
            placeholder="이메일"
            className={`h-[50px] rounded-lg border bg-gray01 px-5 py-4 text-[14px] text-gray10 outline-none
                      placeholder:tracking-tighter ${emailError ? 'border-primaryRed' : emailFocused ? 'border-primaryOrange' : 'border-gray05'} placeholder:text-gray05`}
          />
          {emailError && <p className="mt-2 text-xs text-primaryRed">{emailError}</p>}
          <label className="text-xs text-gray10">만 나이</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={memberInfo.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              onFocus={() => handleFocusChange('age', true)}
              onBlur={() => handleFocusChange('age', false)}
              placeholder="만 나이를 입력해주세요"
              className={`h-[50px] grow rounded-lg border bg-gray01 px-5 py-4 text-[14px] text-gray10 outline-none
                        placeholder:tracking-tighter ${ageError ? 'border-primaryRed' : ageFocused ? 'border-primaryOrange' : 'border-gray05'} placeholder:text-gray05`}
            />
            <p className="text-sm leading-6 text-gray08">세</p>
          </div>
          {ageError && <span className="text-xs text-primaryRed">{ageError}</span>}
          <label className="text-xs text-gray10">성별</label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className={`flex-all-center h-[34px] w-[96px] rounded-md border border-gray05 px-4 py-2 
            ${memberInfo.gender === 'M' ? 'border-primaryOrange bg-orange01 text-primaryOrange' : 'bg-gray01 text-gray08'}`}
              onClick={() => setMemberInfo({ ...memberInfo, gender: 'M' })}
            >
              남성
            </button>
            <button
              type="button"
              className={`flex-all-center h-[34px] w-[96px] rounded-md border border-gray05 px-4 py-2 
            ${memberInfo.gender === 'F' ? 'border-primaryOrange bg-orange01 text-primaryOrange' : 'bg-gray01 text-gray08'}`}
              onClick={() => setMemberInfo({ ...memberInfo, gender: 'F' })}
            >
              여성
            </button>
          </div>

          {memberInfo.gender === 'F' && (
            <>
              <p className="text-xs text-gray10">임신여부</p>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className={`flex-all-center h-[34px] w-[96px] rounded-md border px-4 py-2 
                          ${memberInfo.pregnancy ? 'border-primaryOrange bg-orange01 text-primaryOrange' : 'border-gray05 bg-gray01 text-gray08'}`}
                  onClick={() => setMemberInfo({ ...memberInfo, pregnancy: !memberInfo.pregnancy })}
                >
                  예
                </button>
                <button
                  type="button"
                  className={`flex-all-center h-[34px] w-[96px] rounded-md border px-4 py-2 
                            ${!memberInfo.pregnancy ? 'border-primaryOrange bg-orange01 text-primaryOrange' : 'border-gray05 bg-gray01 text-gray08'}`}
                  onClick={() => setMemberInfo({ ...memberInfo, pregnancy: false })}
                >
                  아니요
                </button>
              </div>
            </>
          )}
          {memberInfo.gender === 'F' && memberInfo.pregnancy && (
            <>
              <p className="text-xs text-gray10">임신 개월 수</p>
              <div className="mb-4 flex items-center space-x-2">
                <input
                  type="text"
                  value={memberInfo.pregMonth}
                  onChange={(e) => handleInputChange('pregMonth', e.target.value)}
                  onFocus={() => setPregMonthFocused(true)}
                  onBlur={() => setPregMonthFocused(false)}
                  placeholder="임신 개월 수를 입력해주세요."
                  className={`h-[50px] grow rounded-lg border bg-gray01 px-5 py-4 text-[14px] text-gray10
                              outline-none ${pregMonthError ? 'border-primaryRed' : pregMonthFocused ? 'border-primaryOrange' : 'border-gray05'} placeholder:text-gray05`}
                />
                <span className="whitespace-nowrap text-sm text-gray08">개월</span>
              </div>
              {pregMonthError && <span className="text-xs text-primaryRed">{pregMonthError}</span>}
            </>
          )}
        </form>

        <div className="mt-6 h-2 w-full bg-gray03 px-5" />
        {/* 나의 추가 설정 */}
        <div className="flex h-[200px] w-full flex-col text-gray10">
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
            <p onClick={handleExit} className="cursor-pointer hover:text-primaryOrange">
              회원탈퇴
            </p>
          </div>
        </div>
        <FooterGradientButton onClick={handleUpdateProfile} disabled={!(memberInfo.email && memberInfo.nickname)}>
          저장하기
        </FooterGradientButton>
        {renderExitModal}
        {renderExitConfirmModal}
      </section>
    </>
  );
}
