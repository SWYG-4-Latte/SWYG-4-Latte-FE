'use client'

// Zustand
import useSignupStore from '@/store/signupStore'
import useAuthValidation from '@/hooks/use-authValidation';

export default function FooterSection() {
  const { username, email, nickname, usernameValid, emailValid, nicknameValid, goToNextStep, currentStep } = useSignupStore();

  const isInputsFilled = username && email && nickname && usernameValid && emailValid && nicknameValid;
  
  const renderedFooterSection = () => {
    switch(currentStep) {
      case 1:
        return (
          <section className="fixed left-0 bottom-0 w-full h-[96px] flex-all-center">
          <button 
            onClick={goToNextStep}
            disabled={!isInputsFilled}
            className={`
              w-[320px] h-[50px] rounded-md
              ${isInputsFilled ? 'bg-orange06 text-gray00' : 'bg-orange02 text-gray06'}
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
            disabled={!isInputsFilled}
            className={`
              w-[320px] h-[50px] bg-orange02 rounded-md text-gray06
              '}
            `}>
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
              className="w-[118px] h-[50px] bg-gray01 border border-gray05 rounded-md text-gray06">
              나중에 입력
            </button>
            <button 
              onClick={goToNextStep}
              className="w-[194px] h-[50px] bg-orange02 rounded-md text-gray06">
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
              className="w-[118px] h-[50px] bg-gray01 border border-gray05 rounded-md text-gray06">
              나중에 입력
            </button>
            <button 
              onClick={goToNextStep}
              className="w-[194px] h-[50px] bg-orange02 rounded-md text-gray06">
              라떼핏과 함께 해요!
            </button>
          </div>
          </section>
        )
      case 5:
        return(
          <section className="fixed left-0 bottom-0 w-full h-[96px] flex-all-center">
          <button 
            onClick={goToNextStep}
            className="w-[320px] h-[50px] bg-orange02 rounded-md text-gray06">
            라떼핏 바로가기
          </button>
          </section>
        )
      default:
        return <div>Invalid Step 😮</div>
    }
  }

  return renderedFooterSection()
}
