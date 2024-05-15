'use client'
// NEXT
import { useRouter } from 'next/navigation';
// Zustand
import useSignupStore from '@/store/signupStore'
import Link from 'next/link';

export default function FooterSection() {
  const router = useRouter()

  const { 
    username, email, nickname, 
    password, confirmPassword, termsAgreed, 
    age, gender,
    cupDay, symptoms, allergies,
    goToNextStep, currentStep, submitSignupForm, resetSignupForm
  } = useSignupStore();

  const stepOneFilled = username && email && nickname
  const stepTwoFilled = password && confirmPassword && termsAgreed
  const stepThreeFilled = age && gender
  const stepFourFilled = cupDay && symptoms.length > 0 && allergies.length > 0

  const handleFormSubmit = async () => {
    try {
      await submitSignupForm(); // 회원가입 API 호출
      alert('회원가입이 성공적으로 완료되었습니다!');
      resetSignupForm(); // 상태초기화
      router.push('/auth/login'); 
    } catch (error) {
      alert('회원가입에 실패했습니다.');
      console.error('Signup failed:', error);
      resetSignupForm()
      router.push('/auth/login');
    }
  };

  const handleNextStep = async () => {
    await goToNextStep();
  };

  const renderedFooterSection = () => {
    switch(currentStep) {
      case 1:
        return (
          <section className="fixed left-0 bottom-0 w-full h-[96px] flex-all-center">
          <button 
            onClick={goToNextStep}
            disabled={!stepOneFilled}
            className={`
              w-[320px] h-[50px] rounded-md font-semibold
              ${stepOneFilled ? 'bg-orange06 text-gray00' : 'bg-orange02 text-gray06'}
            `}>
            계속하기
          </button>
          </section>
        )
      case 2:
        return(
          <section className="fixed left-0 bottom-0 w-full h-[96px] flex-all-center">
          <button 
            onClick={goToNextStep}
            disabled={!stepTwoFilled}
            className={`w-[320px] h-[50px] rounded-md font-semibold
            ${stepTwoFilled ? 'bg-orange06 text-gray00' : 'bg-orange02 text-gray06'}`}>
            계속하기
          </button>
          </section>
        )  
      case 3:
        return(
          <section className="fixed left-0 bottom-0 w-full h-[96px] flex-all-center">
          <div className="flex items-center space-x-2">
            <button 
              onClick={goToNextStep}
              className="w-[118px] h-[50px] bg-gray01 border border-gray05 rounded-md text-gray08">
              나중에 입력
            </button>
            <button 
                onClick={goToNextStep}
                disabled={!stepThreeFilled}
                className={`w-[194px] h-[50px] rounded-md font-semibold
                ${stepThreeFilled ? 'bg-orange06 text-gray00' : 'bg-orange02 text-gray06'}`}>
              마지막페이지로
            </button>
          </div>
          </section>
        )
      case 4:
        return(
          <section className="fixed left-0 bottom-0 w-full h-[96px] flex-all-center">
          <div className="flex items-center space-x-2">
            <button 
              onClick={goToNextStep}
              className="w-[118px] h-[50px] font-semibold bg-gray01 border border-gray05 rounded-md text-gray08">
              나중에 입력
            </button>
            <button 
                onClick={goToNextStep}
                className={`w-[194px] h-[50px] rounded-md font-semibold
                ${stepFourFilled ? 'bg-orange06 text-gray00' : 'bg-orange02 text-gray06'}`}>
              라떼핏과 함께 해요!
            </button>
          </div>
          </section>
        )
      case 5:
        return(
          <section className="fixed left-0 bottom-0 w-full h-[96px] flex-all-center">
          <Link href="/auth/login">
            <button 
              onClick={handleFormSubmit}
              className="w-[320px] h-[50px] font-semibold bg-orange06 text-gray00 rounded-md">
              라떼핏 바로가기
            </button>
          </Link>
          </section>
        )
      default:
        return <div>Invalid Step 😮</div>
    }
  }

  return renderedFooterSection()
}