'use client';
// NEXT
import { useRouter } from 'next/navigation';
// Zustand
import useSignupStore from '@/store/signupStore';
import Link from 'next/link';
import FooterGradientButton from '@/components/common/button/FooterGradientButton';

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

  const renderedFooterSection = () => {
    switch (currentStep) {
      case 1:
        return (
          <section>
            <FooterGradientButton onClick={goToNextStep} disabled={!stepOneFilled}>
              계속하기
            </FooterGradientButton>
          </section>
        );
      case 2:
        return (
          <section>
            <FooterGradientButton onClick={goToNextStep} disabled={!stepTwoFilled}>
              계속하기
            </FooterGradientButton>
          </section>
        );
      case 3:
        return (
          <section className="fixed bottom-0 left-0 right-0 z-10 mx-auto flex h-[96px] w-full max-w-[500px] items-center px-5">
            <div className="flex w-full items-center space-x-2">
              <button
                onClick={goToNextStep}
                className="h-[50px] min-w-[118px] grow-[2] rounded-lg border border-gray05 bg-gray01 font-semibold text-gray08"
              >
                나중에 입력
              </button>
              <button
                onClick={goToNextStep}
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
                onClick={goToNextStep}
                className="h-[50px] min-w-[118px] grow-[2] rounded-lg border border-gray05 bg-gray01 font-semibold text-gray08"
              >
                나중에 입력
              </button>
              <button
                onClick={goToNextStep}
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

  return renderedFooterSection();
}
