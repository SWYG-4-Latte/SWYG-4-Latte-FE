'use client';
// NEXT
import { useRouter } from 'next/navigation';
// Zustand
import useSignupStore from '@/store/signupStore';
import Link from 'next/link';
import FooterGradientButton from '@/components/common/button/FooterGradientButton';
//Modal
import Modal, { ModalProps } from '@/components/common/modal/Modal';
import Button from '@/components/common/button/Button';
import useModal from '@/hooks/useModal';


export default function FooterSection() {
  const router = useRouter();

  const {
    username,
    email,
    nickname,
    password,
    confirmPassword,
    termsAgreed,
    age,
    gender,
    cupDay,
    symptoms,
    allergies,
    goToNextStep,
    currentStep,
    submitSignupForm,
    resetSignupForm,
  } = useSignupStore();

  const { isOpen: isExitOpen, openModal: openExitModal, closeModal: closeExitModal } = useModal('exit');

  const stepOneFilled = username && email && nickname;
  const stepTwoFilled = password && confirmPassword && termsAgreed;
  const stepThreeFilled = age && gender;
  const stepFourFilled = cupDay && symptoms.length > 0 && allergies.length > 0;

  const handleFormSubmit = async () => {
    try {
      await submitSignupForm(); // 회원가입 API 호출
      alert('회원가입이 성공적으로 완료되었습니다!');
      resetSignupForm(); // 상태초기화
      router.push('/auth/login');
    } catch (error) {
      alert('회원가입에 실패했습니다.');
      console.error('Signup failed:', error);
      resetSignupForm();
      router.push('/auth/login');
    }
  };
  
  const handleLaterModalOpen = () => {
    openExitModal();
  }

  const handleSaveAndSignup = () => {
    closeExitModal();
    goToNextStep(true);
  };

  const renderLaterSignupModal = (
    <Modal isOpen={isExitOpen} onClose={closeExitModal}>
      <div className="text-lg font-semibold text-primaryOrange">지금까지 입력한 내용을 저장할까요?</div>
      <p className="w-[209px] text-center text-[14px] leading-[20px] text-gray10">
        입력하신 아이디, 비밀번호, 닉네임으로 라떼 핏 회원가입이 완료됩니다.
      </p>
      <div className="flex gap-2">
        <button
          className="h-[50px] w-32 rounded-lg border border-gray05 bg-primaryIvory px-4 py-3 font-semibold leading-[25px] text-gray08 hover:border-0 hover:bg-gray06 hover:text-gray00"
          onClick={closeExitModal}
        >
          마저 입력하기
        </button>
        <Button
          onClick={handleSaveAndSignup}
          className="w-32 rounded-lg px-4 py-3 font-semibold leading-[25px]">
          저장 후 가입
        </Button>
      </div>
    </Modal>
  );

  const renderedFooterSection = () => {
    switch (currentStep) {
      case 1:
        return (
          <section>
            <FooterGradientButton onClick={() => goToNextStep(false)} disabled={!stepOneFilled}>
              계속하기
            </FooterGradientButton>
          </section>
        );
      case 2:
        return (
          <section>
            <FooterGradientButton onClick={() => goToNextStep(false)} disabled={!stepTwoFilled}>
              계속하기
            </FooterGradientButton>
          </section>
        );
      case 3:
        return (
          <section className="fixed bottom-0 left-0 right-0 z-10 mx-auto flex h-[96px] w-full max-w-[500px] items-center px-5">
            <div className="flex w-full items-center space-x-2">
              <button
                onClick={handleLaterModalOpen}
                className="h-[50px] min-w-[118px] grow-[2] rounded-lg border border-gray05 bg-gray01 font-semibold text-gray08"
              >
                나중에 입력
              </button>
              <button
                onClick={() => goToNextStep(false)}
                disabled={!stepThreeFilled}
                className={`h-[50px] min-w-[194px] grow-[3] rounded-lg font-semibold
                ${stepThreeFilled ? 'bg-orange06 text-gray00' : 'bg-orange02 text-gray06'}`}
              >
                마지막 페이지로
              </button>
            </div>
          </section>
        );
      case 4:
        return (
          <section className="fixed bottom-0 left-0 right-0 z-10 mx-auto flex h-[96px] w-full max-w-[500px] items-center px-5">
            <div className="flex w-full items-center space-x-2">
              <button
                onClick={handleLaterModalOpen}
                className="h-[50px] min-w-[118px] grow-[2] rounded-lg border border-gray05 bg-gray01 font-semibold text-gray08"
              >
                나중에 입력
              </button>
              <button
                onClick={() => goToNextStep(false)}
                className={`h-[50px] min-w-[194px] grow-[3] rounded-lg font-semibold
                ${stepFourFilled ? 'bg-orange06 text-gray00' : 'bg-orange02 text-gray06'}`}
              >
                라떼핏과 함께 해요!
              </button>
            </div>
          </section>
        );
      case 5:
        return (
          <section className="flex w-full">
            <Link href="/auth/login">
              <FooterGradientButton onClick={handleFormSubmit}>라떼핏 바로가기</FooterGradientButton>
            </Link>
          </section>
        );
      default:
        return <div>Invalid Step 😮</div>;
    }
  };

  return (
    <>
      {renderedFooterSection()}
      {renderLaterSignupModal}
    </>
  );
}