import Image from "next/image"
import Link from "next/link"


export default function SignupPage() {
  return (
    <div className="w-full h-screen px-5 ">
      <div className="w-full h-screen flex flex-col relative">
        <section className="flex items-center justify-between w-full h-[54px]">
          <Link href="/member/login">
            <Image
              src="/svgs/svg_leftArrow.svg"
              alt="letfArrow"
              width={24}
              height={24}
              priority
              unoptimized
            />
          </Link>
          <div className="font-pretendard text-md">회원가입</div>
          <div />
        </section>
        {/* line 들어갈 공간 2px*/}
        <section className="mt-8 mb-[72px]">
          <h1 className="w-[261px] h-15 font-pretendard600 text-[22px] leading-[30px] tracking-tight">
            오늘 마신 커피에 카페인이 <br/> 얼마나 있었는지 알려드릴게요.
          </h1>
        </section>
        <section className="flex items-between justify-center w-full h-[252px] mb-[126px]"> 
          <form className="space-y-2">
            <p className="text-xs">아이디 입력</p>
            <div className="space-x-2">
              <input 
                type="text"
                placeholder="아이디(6~ 12자 이내, 숫자/영문조합)"
                className="px-5 py-4 w-[236px] h-[50px] rounded-md text-[14px] placeholder:tracking-tighter bg-gray01 border border-gray05 placeholder:text-gray05"
              />
              <button className="bg-gray04 text-gray06 w-[76px] h-[50px] rounded-md">
                중복확인
              </button>
            </div>
            <p className="text-xs">이메일</p>
            <div >
              <input 
                type="text"
                placeholder="ex) latte@example.com"
                className="px-5 py-4 w-[320px] h-[50px] rounded-md text-[14px] bg-gray01 border border-gray05 placeholder:text-gray05"
              />
              
            </div>
            <p className="text-xs">닉네임</p>
            <div className="space-x-2">
              <input 
                type="email"
                placeholder="한글 3자 이상, 8자 이하"
                className="px-5 py-4 w-[236px] h-[50px] rounded-md text-[14px] bg-gray01 border border-gray05 placeholder:text-gray05"
              />
              <button className="bg-gray04 text-gray06 w-[76px] h-[50px] rounded-md">
                중복확인
              </button>
            </div>
          </form>
        </section>
        <section className="fixed left-0 bottom-0 w-full h-[96px] flex-all-center">
          <button className="w-[320px] h-[50px] bg-orange02 rounded-md text-gray06">계속하기</button>
        </section>
      </div>
    </div>
  )
}
