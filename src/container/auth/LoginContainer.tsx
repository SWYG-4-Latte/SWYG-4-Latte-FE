import Image from "next/image"
import Link from "next/link"

export default function LoginContainer() {
  return (
    <div className="w-full h-screen px-5">
      <section className="flex-i-center w-full h-[54px]">
        <Image
          src="/svgs/svg_leftArrow.svg"
          alt="letfArrow"
          width={24}
          height={24}
          priority
          unoptimized
        />
      </section>
      <section className="mt-8 mb-6 flex-all-center">
        <Image 
          src="/svgs/svg_logo.svg"
          alt="logo"
          width={155}
          height={64}
          priority
          unoptimized
        />
      </section>
      <section className="mb-8 flex-all-center">
        <h1 className="font-pretendard">카페인 관리를 위한 조언 한 잔</h1>
      </section>
      <section className="px-4 mb-6">
        <form className="flex flex-col items-center justify-center space-y-4">
          <input 
            type="text"
            placeholder="아이디"
            className="px-5 py-4 w-[320px] h-[50px] rounded-md text-[14px] bg-gray01 border border-gray05 placeholder:text-gray05"
          />
          <input 
            type="password"
            placeholder="비밀번호"
            className="px-5 py-4 w-[320px] h-[50px] rounded-md text-[14px] bg-gray01 border border-gray05 placeholder:text-gray05"
          />
          <button className="w-[320px] h-[50px] bg-orange02 rounded-md text-gray06">로그인</button>
        </form>
      </section>
      <section>
        <div className="flex-all-center text-xs px-2">
          <div >아이디찾기</div>
          <div className="mx-4 w-[1px] h-[12px] border-l border-gray06"/>
          <div >비밀번호찾기</div>
          <div className="mx-4 w-[1px] h-[12px] border-l border-gray06"/>
          <div >
            <Link href="/auth/signup">
              회원가입
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
