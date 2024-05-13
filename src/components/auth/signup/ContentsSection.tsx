'use client'
// NEXT && React
import Image from "next/image"
import React from "react";
// Zustand
import useSignupStore from '@/store/signupStore'
// Hook

export default function ContentsSection() {

  const {
    username, setUsername, validateUsername, usernameError, usernameFocused, setUsernameFocused,
    email, setEmail, validateEmail, emailError, emailFocused, setEmailFocused,
    nickname, setNickname, validateNickname, nicknameError, nicknameFocused, setNicknameFocused,
    password, setPassword, passwordError, passwordFocused, setPasswordFocused, validatePassword,
    confirmPassword, setConfirmPassword, confirmPasswordError, confirmPasswordFocused, setConfirmPasswordFocused, validateConfirmPassword,
    currentStep, termsAgreed, term1Agreed, term2Agreed, termsError, toggleTermsAgreed, toggleTerm1Agreed, toggleTerm2Agreed,
    age, setAge, gender, setGender, pregnancy, togglePregnancy, pregMonth, setPregMonth, setAgeFocused, setPregMonthFocused,
    validateAge, validatePregMonth, ageError, pregMonthError, ageFocused, pregMonthFocused,
    cupDay, setCupDay, symptoms, toggleSymptom, allergies, toggleAllergy,
    checkEmailDuplication,checkNicknameDuplication, checkUsernameDuplication, 
  } = useSignupStore()

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'username':
        setUsername(value);
        validateUsername(value);
        break;
      case 'email':
        setEmail(value);
        validateEmail(value);
        break;
      case 'nickname':
        setNickname(value);
        validateNickname(value);
        break;
      case 'password':
        setPassword(value);
        validatePassword(value)
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        validateConfirmPassword(value);
        break;
      case 'age':
        setAge(value)
        validateAge(value)
        break;
      case 'pregMonth':
        setPregMonth(value)
        validatePregMonth(value)
        break;
    }
  };


  const handleFocusChange = (field: string, focused: boolean) => {
    switch (field) {
      case 'username':
        setUsernameFocused(focused);
        break;
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

  const toggleTermsAgreement = () => {
    toggleTermsAgreed();
  };
  
  const renderedContentsSection = () => {
    switch(currentStep) {
      case 1:
        return(
        <section className="flex items-between justify-center w-full h-[252px] mb-[126px] px-5"> 
          <form className="space-y-2">
            <p className="text-xs">아이디 입력</p>
            <div className="space-x-2">
            <input 
                  type="text"
                  value={username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  onFocus={() => handleFocusChange('username', true)}
                  onBlur={() => handleFocusChange('username', false)}
                  placeholder="아이디(6~12자 이내, 숫자/영문조합)"
                  className={`px-5 py-4 w-[236px] h-[50px] rounded-md text-[14px] placeholder:tracking-tighter bg-gray01 outline-none text-gray10
                              border ${usernameError ? 'border-primaryRed' : (usernameFocused ? 'border-primaryOrange' : 'border-gray05')} placeholder:text-gray05`}
                />
            <button
                  type="button"
                  onClick={() => checkUsernameDuplication('username')}
                  className={`w-[76px] h-[50px] rounded-md 
                  ${username ? "bg-gray09 text-gray00" : "bg-gray04 text-gray06"}`}
            >
                중복확인
              </button>
              { usernameError &&  <p className="mt-2 text-xs text-primaryRed">{usernameError}</p> }
            </div>
            <p className="text-xs">이메일</p>
            <div >
            <input 
                  type="email"
                  value={email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onFocus={() => handleFocusChange('email', true)}
                  onBlur={() => handleFocusChange('email', false)}
                  placeholder="ex) latte@example.com"
                  className={`px-5 py-4 w-[320px] h-[50px] rounded-md text-[14px] bg-gray01 outline-none text-gray10
                              border ${emailError ? 'border-primaryRed' : (emailFocused ? 'border-primaryOrange' : 'border-gray05')} placeholder:text-gray05`}
                />
                { emailError &&  <p className="mt-2 text-xs text-primaryRed">{emailError}</p> }
            </div>
            <p className="text-xs">닉네임</p>
            <div className="space-x-2">
            <input 
                  type="text"
                  value={nickname}
                  onChange={(e) => handleInputChange('nickname', e.target.value)}
                  onFocus={() => handleFocusChange('nickname', true)}
                  onBlur={() => handleFocusChange('nickname', false)}
                  placeholder="한글 3자 이상, 8자 이하"
                  className={`px-5 py-4 w-[236px] h-[50px] rounded-md text-[14px] bg-gray01 outline-none text-gray10
                              border ${nicknameError ? 'border-primaryRed' : (nicknameFocused ? 'border-primaryOrange' : 'border-gray05')} placeholder:text-gray05`}
                />
            <button
                  type="button"
                  onClick={() => checkNicknameDuplication('nickname')}
                  className={`w-[76px] h-[50px] rounded-md 
                  ${nickname ? "bg-gray09 text-gray00" : "bg-gray04 text-gray06"}`}
            >
                중복확인
              </button>
              { nicknameError &&  <p className="mt-2 text-xs text-primaryRed">{nicknameError}</p> }
            </div>
          </form>
        </section> 
      )
      case 2:
        return(
          <section className="flex flex-col justify-center items-center px-5 ">
            <form className="space-y-2 mb-[61px]">
              <p className="text-xs">비밀번호 입력</p>
              <div className="flex flex-col justify-center space-y-2">
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => handleInputChange('password',e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  placeholder="비밀번호(10자 이상, 영어 소문자/숫자/특수문자)조합"
                  className={`px-5 py-4 w-[320px] h-[50px] rounded-md text-[14px] bg-gray01 outline-none text-gray10
                  border ${passwordError ? 'border-primaryRed' : (passwordFocused ? 'border-primaryOrange' : 'border-gray05')} placeholder:text-gray05`}
                  />
                {passwordError && <span className="text-xs text-primaryRed">{passwordError}</span>}
                </div>
              <p className="mt-2 text-xs">비밀번호 확인</p>
              <div className="flex flex-col justify-center space-y-2">
                <input 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    onFocus={() => setConfirmPasswordFocused(true)}
                    onBlur={() => setConfirmPasswordFocused(false)}
                    placeholder="다시 한번 입력해주세요."
                    className={`px-5 py-4 w-[320px] h-[50px] rounded-md text-[14px] bg-gray01 outline-none text-gray10
                    border ${confirmPasswordError ? 'border-primaryRed' : (confirmPasswordFocused ? 'border-primaryOrange' : 'border-gray05')} placeholder:text-gray05`}
                    />
                {confirmPasswordError && <span className="text-xs text-primaryRed">{confirmPasswordError}</span>}
              </div>
            </form>
            <div className={`flex items-center text-md w-[320px] h-[50px] ${termsError ? 'border-primaryRed' : 'border-gray05'} border border-b-0 border-b-gray05 rounded-t-lg`}>
              <div className="w-full flex px-5 py-4 space-x-2">
              <Image 
                src={termsAgreed ? "/svgs/svg_checkbox-on.svg" : "/svgs/svg_checkbox-off.svg"}
                alt={termsAgreed ? "checkbox-on" : "checkbox-off"}
                onClick={toggleTermsAgreement}
                width={16}
                height={16}
                priority
              />
                <p className="font-pretendard text-gray10 text-[12px]">약관 전체 동의</p>
              </div>
            </div>
            <div className={`flex flex-col justify-center text-sm w-[320px] h-[91px] ${termsError ? 'border-primaryRed' : 'border-gray05'} border border-t-gray05 rounded-b-lg`}>
              <div className="w-full flex px-5 py-2.5 mt-2 space-x-2">
              <Image 
                src={term1Agreed ? "/svgs/svg_checkbox-on.svg" : "/svgs/svg_checkbox-off.svg"}
                alt={term1Agreed ? "checkbox-on" : "checkbox-off"}
                onClick={toggleTerm1Agreed}
                width={16}
                height={16}
                priority
              />
                <p className="font-pretendard text-[10px] text-gray08">이용약관 동의 (필수)</p>
              </div>
              <div className="w-full flex px-5 py-2.5 mb-2 space-x-2">
              <Image 
                src={term2Agreed ? "/svgs/svg_checkbox-on.svg" : "/svgs/svg_checkbox-off.svg"}
                alt={term2Agreed ? "checkbox-on" : "checkbox-off"}
                onClick={toggleTerm2Agreed}
                width={16}
                height={16}
                priority
              />
                <p className="font-pretendard  text-[10px] text-gray08">개인정보 수집 및 이용동의(필수)</p>
              </div>
            </div>
            {termsError && (
              <div className="w-full flex justify-start items-start">
                <p className="text-xs text-primaryRed mt-2">
                  약관 동의 후 가입할 수 있습니다.
                </p>
              </div>
            )}
          </section>
        )
      case 3:
        return(
          <section className="flex flex-col items-center justify-center px-5">
            <form className="space-y-2">
              <p className="text-xs">만 나이</p>
              <div className="flex items-center space-x-2 mb-4">
                <input 
                  type="text"
                  value={age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  onFocus={() => setAgeFocused(true)}
                  onBlur={() => setAgeFocused(false)}
                  placeholder="만 나이를 입력해주세요."
                  className={`px-5 py-4 w-[296px] h-[50px] rounded-md text-[14px] bg-gray01 outline-none text-gray10
                              border ${ageError ? 'border-primaryRed' : (ageFocused ? 'border-primaryOrange' : 'border-gray05')} placeholder:text-gray05`}
              />
                <span className="text-sm">세</span>
              </div>
              {ageError && <span className="text-xs text-primaryRed">{ageError}</span>}
              <p className="text-xs">성별</p>
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
          </section>
        )
      case 4:
        return(
          <section className="flex flex-col items-center px-5">
            <form className="space-y-8">
              <div className="flex flex-col space-y-4 justify-center">
                <p className="text-md font-pretendard600">하루에 커피를 몇 잔 정도 마시나요?</p>
                <div className="flex items-center space-x-2">
                {['안마심', '1잔', '2잔', '3잔 이상'].map(option => (
                  <button
                    type="button"
                    key={option}
                    onClick={() => setCupDay(option)}
                    className={`px-4 py-2 border rounded-md text-sm ${cupDay === option ? 'bg-orange01 text-primaryOrange border-primaryOrange' : 'border-gray05'}`}
                  >
                  {option}
                  </button>
                ))}
                </div>
              </div>
              <div className="flex flex-col space-y-4 justify-center">
                <p className="text-md font-pretendard600">커피를 마실 때 나타나는 증상을 모두 선택해주세요.</p>
                <div className="flex items-center space-x-2">
                {['잠이 안와요', '심장이 빨리 뛰어요'].map(symptom => (
                  <button
                    type="button"
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)}
                    className={`px-4 py-2 border rounded-md text-sm ${symptoms.includes(symptom) ? 'bg-orange01 text-primaryOrange border-primaryOrange' : 'border-gray05'}`}
                  >
                    {symptom}
                  </button>
                ))}
                </div>
                <div className="flex items-center space-x-2">
                {['속이 메스꺼워요', '예민해져요'].map(symptom => (
                  <button
                    type="button"
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)}
                    className={`px-4 py-2 border rounded-md text-sm ${symptoms.includes(symptom) ? 'bg-orange01 text-primaryOrange border-primaryOrange' : 'border-gray05'}`}
                  >
                    {symptom}
                  </button>
                ))}
                </div>
                <div className="flex items-center space-x-2">
                {['별다른 증상이 없어요'].map(symptom => (
                  <button
                    type="button"
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)}
                    className={`px-4 py-2 border rounded-md text-sm ${symptoms.includes(symptom) ? 'bg-orange01 text-primaryOrange border-primaryOrange' : 'border-gray05'}`}
                  >
                    {symptom}
                  </button>
                ))}
                </div>
              </div>
              <div className="flex flex-col space-y-4 justify-center">
                <p className="text-md font-pretendard600">음식 알레르기가 있다면 모두 선택해주세요.</p>
                <div className="flex items-center space-x-2">
                {['없어요','우유','대두','밀'].map(allergy => (
                  <button
                    type="button"
                    key={allergy}
                    onClick={() => toggleAllergy(allergy)}
                    className={`px-4 py-2 border rounded-md text-sm ${allergies.includes(allergy) ? 'bg-orange01 text-primaryOrange border-primaryOrange' : 'border-gray05'}`}
                  >
                    {allergy}
                  </button>
                ))}
                </div> 
                <div className="flex items-center space-x-2">
                {['땅콩','복숭아'].map(allergy => (
                  <button
                    type="button"
                    key={allergy}
                    onClick={() => toggleAllergy(allergy)}
                    className={`px-4 py-2 border rounded-md text-sm ${allergies.includes(allergy) ? 'bg-orange01 text-primaryOrange border-primaryOrange' : 'border-gray05'}`}
                  >
                    {allergy}
                  </button>
                ))}
                </div>
              </div>
            </form>
          </section>
        )
      case 5:
        return(
          <div>
            <Image 
              src="/svgs/svg_character01.svg"
              alt="character01"
              width={320}
              height={320}
              priority
            />
          </div>
        )
      default:
        return <div>Invalid Step 😮</div>
    }
  }

  return renderedContentsSection()
}
