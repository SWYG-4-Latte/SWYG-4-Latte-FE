'use client'
//NEXT
import Image from "next/image"
//Zustand
import useSignupStore from "@/store/signupStore"
import Link from "next/link";


export default function MyProfileContent() {
  const {
    email, emailError, emailFocused, setEmail, validateEmail, setEmailFocused,
    age, ageError, ageFocused, setAge, validateAge, setAgeFocused,
    nickname, nicknameError, nicknameFocused, setNickname, validateNickname, setNicknameFocused,
    gender,setGender,
    pregnancy, togglePregnancy,
    pregMonth, setPregMonthFocused, pregMonthError, pregMonthFocused,
    mbrNo, updateUserInfo
  } = useSignupStore();

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'email':
        setEmail(value);
        validateEmail(value);
        break;
      case 'nickname':
        setNickname(value);
        validateNickname(value);
        break;
      case 'age':
        setAge(value)
        validateAge(value)
        break;
      // case 'pregMonth':
      //   setPregMonth(value)
      //   validatePregMonth(value)
      // break;
    }
  };

  const handleUpdateProfile = async () => {
    await(updateUserInfo({
      mbrNo, email, nickname, gender, pregnancy, pregMonth, age
    }))
  }

  const handleFocusChange = (field: string, focused: boolean) => {
    switch (field) {
      case 'email':
        setEmailFocused(focused);
        break;
      case 'nickname':
        setNicknameFocused(focused);
        break;
      case 'age':
        setAgeFocused(focused)
        break;
      case 'pregMonth':
        setPregMonthFocused(focused)
        break;
    }
  };


  return (
    <>

    <section className="px-5 min-w-[360px] w-full h-auto flex flex-col items-center relative">
      {/* 이미지 */}
      <div className="w-full mt-8 mb-[19px] flex-all-center">
        <Image 
          src="/svgs/svg_profile.svg"
          alt="my-profile"
          width={120}
          height={120}
          priority
          unoptimized
        />
      </div>
      {/* 나의 기본 정보 */}
      <form className="flex flex-col justify-center space-y-2">
        <h2 className="text-10 font-semibold">나의 기본 정보</h2>
        <label className="text-xs">닉네임 <span className="text-primaryOrange">*</span></label>
        <input 
          type="text"
          value={nickname}
          onChange={(e) => handleInputChange('nickname', e.target.value)}
          onFocus={() => handleFocusChange('nickname', true)}
          onBlur={() => handleFocusChange('nickname', false)}
          placeholder="닉네임"
          className={`px-5 py-4 w-[320px] h-[50px] rounded-md text-[14px] placeholder:tracking-tighter bg-gray01 outline-none text-gray10
                      border ${nicknameError ? 'border-primaryRed' : (nicknameFocused ? 'border-primaryOrange' : 'border-gray05')} placeholder:text-gray05`}
        />
        { nicknameError &&  <p className="mt-2 text-xs text-primaryRed">{nicknameError}</p> }
        <label className="text-xs">이메일 <span className="text-primaryOrange">*</span></label>
        <input 
          type="text"
          value={email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          onFocus={() => handleFocusChange('email', true)}
          onBlur={() => handleFocusChange('email', false)}
          placeholder="이메일"
          className={`px-5 py-4 w-[320px] h-[50px] rounded-md text-[14px] placeholder:tracking-tighter bg-gray01 outline-none text-gray10
                      border ${emailError ? 'border-primaryRed' : (emailFocused ? 'border-primaryOrange' : 'border-gray05')} placeholder:text-gray05`}
        />
        { emailError &&  <p className="mt-2 text-xs text-primaryRed">{emailError}</p> }
        <label className="text-xs">만 나이</label>
        <div className="flex items-center">
          <input 
            type="text"
            value={age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            onFocus={() => handleFocusChange('age', true)}
            onBlur={() => handleFocusChange('age', false)}
            placeholder="만 나이를 입력해주세요"
            className={`px-5 py-4 w-[296px] h-[50px] rounded-md text-[14px] placeholder:tracking-tighter bg-gray01 outline-none text-gray10
                        border ${ageError ? 'border-primaryRed' : (ageFocused ? 'border-primaryOrange' : 'border-gray05')} placeholder:text-gray05`}
          />
          <p className="flex-all-center text-sm w-[30px] h-[28px] ml-[1px]">세</p>
        </div>
        <label className="text-xs">성별</label>
        <div className="flex items-center space-x-2">
          <button 
            type="button"
            className={`flex-all-center w-[96px] h-[34px] py-2 px-4 border border-gray05 rounded-md 
            ${gender === 'M' ? 'bg-orange01 text-primaryOrange border-primaryOrange' : 'text-gray08'}`}
            onClick={() => setGender(gender === 'M' ? '' : 'M')}
            >
            남성
          </button>
          <button 
            type="button"
            className={`flex-all-center w-[96px] h-[34px] py-2 px-4 border border-gray05 rounded-md 
            ${gender === 'F' ? 'bg-orange01 text-primaryOrange border-primaryOrange' : 'text-gray08'}`}
            onClick={() => setGender(gender === 'F' ? '' : 'F')}
            >
            여성
          </button>
        </div>

        {
          gender === 'F' && (
            <>
              <p className="text-xs">임신여부</p>
              <div className="flex items-center space-x-2">
              <button 
                type="button"
                className={`flex-all-center w-[96px] h-[34px] py-2 px-4 border rounded-md 
                          ${pregnancy ? 'bg-orange01 text-primaryOrange border-primaryOrange' : 'text-gray08 border-gray05'}`}
                onClick={() => togglePregnancy(!pregnancy)} 
                >
                예</button>
                <button 
                  type="button"
                  className={`flex-all-center w-[96px] h-[34px] py-2 px-4 border rounded-md 
                            ${!pregnancy ? 'bg-orange01 text-primaryOrange border-primaryOrange' : 'text-gray08 border-gray05'}`}
                  onClick={() => togglePregnancy(false)}
                >아니요</button>
              </div>
            </>
          )
        }
        {
          gender === 'F' && pregnancy && (
            <>
              <p className="text-xs">임신 개월 수</p>
                <div className="flex items-center space-x-2 mb-4">
                <input 
                  type="text"
                  value={pregMonth}
                  onChange={(e) => handleInputChange('pregMonth', e.target.value)}
                  onFocus={() => setPregMonthFocused(true)}
                  onBlur={() => setPregMonthFocused(false)}
                  placeholder="임신 개월 수를 입력해주세요."
                  className={`px-5 py-4 w-[288px] h-[50px] rounded-md text-[14px] bg-gray01 outline-none text-gray10
                              border ${pregMonthError ? 'border-primaryRed' : (pregMonthFocused ? 'border-primaryOrange' : 'border-gray05')} placeholder:text-gray05`}
                />
                  <span className="text-sm whitespace-nowrap">개월</span>
                </div>
                {pregMonthError && <span className="text-xs text-primaryRed">{pregMonthError}</span>}
            </>
          )
        }
      </form>
      
      <div className="px-5 max-w-[340px] w-full h-2 mt-6 bg-gray04" />
      {/* 나의 추가 설정 */}
      <div className="px-5 max-w-[360px] w-full h-[200px] text-gray10">
        <Link href="/mypage/memberinfo">
          <div className="w-full py-1 my-4 flex items-center">
            <div className="mr-6">
              <h2 className="mb-2">나의 카페인 추가 설정</h2>
              <p className="text-xs text-gray06">추가 정보를 입력하고 나에게 적절한 카페인 양을 알아보세요</p>
            </div>
            <Image 
              src="/svgs/svg_rightArrow.svg"
              alt="rightArrow"
              width={16}
              height={16}
              priority
              unoptimized
            />
          </div>
        </Link>
        <div className="w-full flex items-center justify-center text-xs">
          <p className="hover:text-primaryOrange">로그아웃</p>
          <div className="border w-[1px] h-4 border-gray05 mx-4"/>
          <p className="hover:text-primaryOrange">회원탈퇴</p>
        </div>
      </div>
      <div className="fixed bottom-0 px-5 pb-[30px] bg-gray03">
        <button 
          onClick={handleUpdateProfile}
          className='z-10 w-[320px] h-[50px] rounded-md bg-orange02 text-gray06 '>
            저장하기
        </button>
      </div>
    </section>
    </>
  )
}
