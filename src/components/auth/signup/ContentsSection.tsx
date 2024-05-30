'use client';
// NEXT && React
import Image from 'next/image';
import React from 'react';
// Zustand && Hook
import useSignupStore from '@/store/signupStore';



export default function ContentsSection() {
  const {
    username,
    setUsername,
    validateUsername,
    usernameError,
    usernameFocused,
    setUsernameFocused,
    email,
    setEmail,
    validateEmail,
    emailError,
    emailFocused,
    setEmailFocused,
    nickname,
    setNickname,
    validateNickname,
    nicknameError,
    nicknameFocused,
    setNicknameFocused,
    password,
    setPassword,
    passwordError,
    passwordFocused,
    setPasswordFocused,
    validatePassword,
    confirmPassword,
    setConfirmPassword,
    confirmPasswordError,
    confirmPasswordFocused,
    setConfirmPasswordFocused,
    validateConfirmPassword,
    currentStep,
    termsAgreed,
    term1Agreed,
    term2Agreed,
    termsError,
    toggleTermsAgreed,
    toggleTerm1Agreed,
    toggleTerm2Agreed,
    age,
    setAge,
    gender,
    setGender,
    pregnancy,
    togglePregnancy,
    pregMonth,
    setPregMonth,
    setAgeFocused,
    setPregMonthFocused,
    validateAge,
    validatePregMonth,
    ageError,
    pregMonthError,
    ageFocused,
    pregMonthFocused,
    cupDay,
    setCupDay,
    symptoms,
    toggleSymptom,
    allergies,
    toggleAllergy,
    checkEmailDuplication,
    checkNicknameDuplication,
    checkUsernameDuplication,
  } = useSignupStore();

  
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
        validatePassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        validateConfirmPassword(value);
        break;
      case 'age':
        setAge(value);
        validateAge(value);
        break;
      case 'pregMonth':
        setPregMonth(value);
        validatePregMonth(value);
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
        setAgeFocused(focused);
        break;
      case 'pregMonth':
        setPregMonthFocused(focused);
        break;
    }
  };

  const toggleTermsAgreement = () => {
    toggleTermsAgreed();
  };


  const renderedContentsSection = () => {
    switch (currentStep) {
      case 1:
        return (
          <section className="flex w-full px-5">
            <form className="flex w-full flex-col">
              <div className="mb-[8px]">
                <p className="mb-2 text-xs">아이디 입력</p>
                <div className="flex flex-col">
                  <div className="flex">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      onFocus={() => handleFocusChange('username', true)}
                      onBlur={() => handleFocusChange('username', false)}
                      placeholder="아이디(6~12자 이내, 숫자/영문조합)"
                      className={`mr-2 h-[50px] min-w-[236px] grow rounded-lg border bg-gray01 px-4 py-4 text-[14px] leading-6 text-gray10 outline-none
                              placeholder:text-gray08 ${usernameError ? (usernameError === '사용 가능한 아이디 입니다.' ? 'border-primaryOrange' : 'border-primaryRed') : usernameFocused ? 'border-primaryOrange' : 'border-gray05'} placeholder:text-gray05`}
                    />
                    <button
                      type="button"
                      onClick={() => checkUsernameDuplication('username')}
                      className={`h-[50px] w-[76px] rounded-lg text-sm font-medium
                  ${username ? 'bg-gray09 text-gray00' : 'bg-gray04 text-gray06'}`}
                    >
                      중복 확인
                    </button>
                  </div>

                  {usernameError && (
                    <p
                      className={`mt-2 text-xs ${usernameError === '사용 가능한 아이디 입니다.' ? 'text-primaryOrange' : 'text-primaryRed'}`}
                    >
                      {usernameError}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-[8px]">
                <p className="mb-2 text-xs">이메일</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onFocus={() => handleFocusChange('email', true)}
                  onBlur={() => handleFocusChange('email', false)}
                  placeholder="ex) latte@example.com"
                  className={`h-[50px] w-full rounded-lg border bg-gray01 px-5 py-4 text-[14px] leading-6 text-gray10 outline-none
                              placeholder:text-gray08 ${emailError ? 'border-primaryRed' : emailFocused ? 'border-primaryOrange' : 'border-gray05'} placeholder:text-gray05`}
                />
                {emailError && <p className="mt-2 text-xs text-primaryRed">{emailError}</p>}
              </div>

              <div>
                <p className="mb-2 text-xs">닉네임</p>
                <div className="flex flex-col">
                  <div className="flex">
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => handleInputChange('nickname', e.target.value)}
                      onFocus={() => handleFocusChange('nickname', true)}
                      onBlur={() => handleFocusChange('nickname', false)}
                      placeholder="한글 3자 이상, 8자 이하"
                      className={`mr-2 h-[50px] min-w-[236px] grow rounded-lg border bg-gray01 px-4 py-4 text-[14px] leading-6 text-gray10 outline-none
                              placeholder:text-gray08 ${nicknameError ? (nicknameError === '사용 가능한 닉네임 입니다.' ? 'border-primaryOrange' : 'border-primaryRed') : nicknameFocused ? 'border-primaryOrange' : 'border-gray05'} placeholder:text-gray05`}
                    />
                    <button
                      type="button"
                      onClick={() => checkNicknameDuplication('nickname')}
                      className={`h-[50px] w-[76px] rounded-lg text-sm font-medium
                  ${nickname ? 'bg-gray09 text-gray00' : 'bg-gray04 text-gray06'}`}
                    >
                      중복 확인
                    </button>
                  </div>
                </div>

                {nicknameError && (
                  <p
                    className={`mt-2 text-xs ${nicknameError === '사용 가능한 닉네임 입니다.' ? 'text-primaryOrange' : 'text-primaryRed'}`}
                  >
                    {nicknameError}
                  </p>
                )}
              </div>
            </form>
          </section>
        );
      case 2:
        return (
          <section className="mb-[18px] flex w-full flex-col px-5">
            <form className="mb-[61px] flex w-full flex-col">
              <p className="mb-2 text-xs">비밀번호 입력</p>
              <div className="mb-4 flex flex-col">
                <input
                  type="password"
                  value={password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    placeholder="비밀번호(8자 이상, 영어 소문자/숫자/특수문자)조합"
                    className={`h-[50px] min-w-[320px] grow rounded-lg border bg-gray01 px-5 py-4 text-[14px] text-gray10 outline-none
                  placeholder:text-gray08 ${passwordError ? 'border-primaryRed' : passwordFocused ? 'border-primaryOrange' : 'border-gray05'} placeholder:text-gray05`}
                />
                {passwordError && <span className="mt-2 text-xs text-primaryRed">{passwordError}</span>}
              </div>
              <p className="mb-2 text-xs">비밀번호 확인</p>
              <div className="flex flex-col justify-center space-y-2">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  onFocus={() => setConfirmPasswordFocused(true)}
                  onBlur={() => setConfirmPasswordFocused(false)}
                  placeholder="다시 한번 입력해주세요."
                  className={`h-[50px] rounded-lg border bg-gray01 px-5 py-4 text-[14px] text-gray10 outline-none
                    placeholder:text-gray08 ${confirmPasswordError ? 'border-primaryRed' : confirmPasswordFocused ? 'border-primaryOrange' : 'border-gray05'} placeholder:text-gray05`}
                />
                {confirmPasswordError && <span className="text-xs text-primaryRed">{confirmPasswordError}</span>}
              </div>
            </form>

            <div
              className={`text-md flex h-[50px] items-center bg-primaryIvory ${termsError ? 'border-primaryRed' : 'border-gray05'} rounded-t-lg border border-b-0 border-b-gray05`}
            >
              <div className="flex cursor-pointer space-x-2 px-5 py-4" onClick={toggleTermsAgreement}>
                <Image
                  src={termsAgreed ? '/svgs/svg_checkbox-on.svg' : '/svgs/svg_checkbox-off.svg'}
                  alt={termsAgreed ? 'checkbox-on' : 'checkbox-off'}
                  width={16}
                  height={16}
                  priority
                />
                <p className="text-[12px] text-gray10">약관 전체 동의</p>
              </div>
            </div>

            <div
              className={`flex h-[91px] flex-col justify-center bg-primaryIvory text-sm ${termsError ? 'border-primaryRed' : 'border-gray05'} rounded-b-lg border border-t-gray04`}
            >
              <div
                className="mt-2 flex w-fit cursor-pointer items-center space-x-2 px-5 py-2.5"
                onClick={toggleTerm1Agreed}
              >
                <Image
                  src={term1Agreed ? '/svgs/svg_checkbox-on.svg' : '/svgs/svg_checkbox-off.svg'}
                  alt={term1Agreed ? 'checkbox-on' : 'checkbox-off'}
                  width={16}
                  height={16}
                  priority
                />
                <p className="text-[10px] text-gray08">이용약관 동의 (필수)</p>
              </div>
              <div
                className="mb-2 flex w-fit cursor-pointer items-center space-x-2 px-5 py-2.5"
                onClick={toggleTerm2Agreed}
              >
                <Image
                  src={term2Agreed ? '/svgs/svg_checkbox-on.svg' : '/svgs/svg_checkbox-off.svg'}
                  alt={term2Agreed ? 'checkbox-on' : 'checkbox-off'}
                  width={16}
                  height={16}
                  priority
                />
                <p className="text-[10px] text-gray08">개인정보 수집 및 이용동의(필수)</p>
              </div>
            </div>
            {termsError && (
              <div className="flex w-full items-start justify-start">
                <p className="mt-2 text-xs text-primaryRed">약관 동의 후 가입할 수 있습니다.</p>
              </div>
            )}
          </section>
        );
      case 3:
        return (
          <section className="flex w-full flex-col px-5">
            <form className="flex flex-col">
              <div className="mb-4 flex flex-col">
                <div className="flex flex-col gap-2">
                  <p className="text-xs">만 나이</p>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      onFocus={() => setAgeFocused(true)}
                      onBlur={() => setAgeFocused(false)}
                      placeholder="만 나이를 입력해주세요."
                      className={`h-[50px] grow rounded-lg border bg-gray01 px-4 py-4 text-[14px] text-gray10 outline-none
                              placeholder:text-gray08 ${ageError ? 'border-primaryRed' : ageFocused ? 'border-primaryOrange' : 'border-gray05'} placeholder:text-gray05`}
                    />
                    <span className="text-sm">세</span>{' '}
                  </div>
                  {ageError && <span className="text-xs text-primaryRed">{ageError}</span>}
                </div>
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <p className="text-xs">성별</p>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className={`flex-all-center h-[34px] w-[96px] rounded-md border border-gray05 px-4 py-2 text-sm 
                  ${gender === 'M' ? 'border-primaryOrange bg-orange01 text-primaryOrange' : 'bg-primaryIvory text-gray08'}`}
                    onClick={() => setGender(gender === 'M' ? '' : 'M')}
                  >
                    남성
                  </button>
                  <button
                    type="button"
                    className={`flex-all-center h-[34px] w-[96px] rounded-md border border-gray05 px-4 py-2 text-sm 
                  ${gender === 'F' ? 'border-primaryOrange bg-orange01 text-primaryOrange' : 'bg-primaryIvory text-gray08'}`}
                    onClick={() => setGender(gender === 'F' ? '' : 'F')}
                  >
                    여성
                  </button>
                </div>
              </div>

              {gender === 'F' && (
                <div className="mb-4 flex flex-col gap-2">
                  <p className="text-xs">임신여부</p>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className={`flex-all-center h-[34px] w-[96px] rounded-md border px-4 py-2 text-sm
                                ${pregnancy ? 'border-primaryOrange bg-orange01 text-primaryOrange' : 'border-gray05 bg-primaryIvory text-gray08'}`}
                      onClick={() => togglePregnancy(!pregnancy)}
                    >
                      예
                    </button>
                    <button
                      type="button"
                      className={`flex-all-center h-[34px] w-[96px] rounded-md border px-4 py-2 text-sm
                                  ${!pregnancy ? 'border-primaryOrange bg-orange01 text-primaryOrange' : 'border-gray05 bg-primaryIvory text-gray08'}`}
                      onClick={() => togglePregnancy(false)}
                    >
                      아니요
                    </button>
                  </div>
                </div>
              )}
              {gender === 'F' && pregnancy && (
                <div className="flex flex-col gap-2">
                  <p className="text-xs">임신 개월 수</p>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={pregMonth}
                      onChange={(e) => handleInputChange('pregMonth', e.target.value)}
                      onFocus={() => setPregMonthFocused(true)}
                      onBlur={() => setPregMonthFocused(false)}
                      placeholder="임신 개월 수를 입력해주세요."
                      className={`h-[50px] w-[288px] rounded-lg border bg-gray01 px-5 py-4 text-[14px] text-gray10 outline-none
                                    placeholder:text-gray08 ${pregMonthError ? 'border-primaryRed' : pregMonthFocused ? 'border-primaryOrange' : 'border-gray05'} placeholder:text-gray05`}
                    />
                    <span className="whitespace-nowrap text-sm">개월</span>
                  </div>
                  {pregMonthError && <span className="text-xs text-primaryRed">{pregMonthError}</span>}
                </div>
              )}
            </form>
          </section>
        );
      case 4:
        return (
          <section className="mb-[52px] flex w-full px-5">
            <form className="space-y-8">
              <div className="flex flex-col justify-center space-y-4">
                <p className="font-medium">하루에 커피를 몇 잔 정도 마시나요?</p>
                <div className="flex items-center space-x-2">
                  {['안 마심', '1잔', '2잔', '3잔 이상'].map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setCupDay(option)}
                      className={`rounded-md border px-4 py-2 text-sm text-gray08 ${cupDay === option ? 'border-primaryOrange bg-orange01 text-primaryOrange' : 'border-gray05 bg-primaryIvory'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <p className="font-medium">커피를 마실 때 나타나는 증상을 모두 선택해주세요.</p>
                <div className="flex items-center space-x-2">
                  {['잠이 안와요', '심장이 빨리 뛰어요'].map((symptom) => (
                    <button
                      type="button"
                      key={symptom}
                      onClick={() => toggleSymptom(symptom)}
                      className={`rounded-md border px-4 py-2 text-sm text-gray08 ${symptoms.includes(symptom) ? 'border-primaryOrange bg-orange01 text-primaryOrange' : 'border-gray05 bg-primaryIvory'}`}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  {['속이 메스꺼워요', '예민해져요'].map((symptom) => (
                    <button
                      type="button"
                      key={symptom}
                      onClick={() => toggleSymptom(symptom)}
                      className={`rounded-md border px-4 py-2 text-sm text-gray08 ${symptoms.includes(symptom) ? 'border-primaryOrange bg-orange01 text-primaryOrange' : 'border-gray05 bg-primaryIvory'}`}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  {['별다른 증상이 없어요'].map((symptom) => (
                    <button
                      type="button"
                      key={symptom}
                      onClick={() => toggleSymptom(symptom)}
                      className={`rounded-md border px-4 py-2 text-sm text-gray08 ${symptoms.includes(symptom) ? 'border-primaryOrange bg-orange01 text-primaryOrange' : 'border-gray05 bg-primaryIvory'}`}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <p className="font-medium">음식 알레르기가 있다면 모두 선택해주세요.</p>
                <div className="flex items-center space-x-2">
                  {['없어요', '우유', '대두', '밀'].map((allergy) => (
                    <button
                      type="button"
                      key={allergy}
                      onClick={() => toggleAllergy(allergy)}
                      className={`rounded-md border px-4 py-2 text-sm text-gray08 ${allergies.includes(allergy) ? 'border-primaryOrange bg-orange01 text-primaryOrange' : 'border-gray05 bg-primaryIvory'}`}
                    >
                      {allergy}
                    </button>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  {['땅콩', '복숭아'].map((allergy) => (
                    <button
                      type="button"
                      key={allergy}
                      onClick={() => toggleAllergy(allergy)}
                      className={`rounded-md border px-4 py-2 text-sm text-gray08 ${allergies.includes(allergy) ? 'border-primaryOrange bg-orange01 text-primaryOrange' : 'border-gray05 bg-primaryIvory'}`}
                    >
                      {allergy}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </section>
        );
      case 5:
        return (
          <div>
            <Image src="/svgs/svg_character01.svg" alt="character01" width={320} height={320} priority />
          </div>
        );
      default:
        return <div>Invalid Step 😮</div>;
    }
  };

  return renderedContentsSection();
}
