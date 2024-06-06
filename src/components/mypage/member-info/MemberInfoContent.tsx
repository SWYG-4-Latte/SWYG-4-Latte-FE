'use client';
//NEXT
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
//Zustand
import useMemberStore from '@/store/memberStore';
//utils
import { fetchMemberInfo } from '@/utils/mypage/isMember';
import FooterGradientButton from '@/components/common/button/FooterGradientButton';

export default function MemberInfoContent() {
  const { memberInfo, setMemberInfo, updateMemberInfoTwo } = useMemberStore();

  const [localMemberInfo, setLocalMemberInfo] = useState({
    cupDay: memberInfo.cupDay || '안 마심',
    symptoms: memberInfo.symptoms || [],
    allergies: memberInfo.allergies || [],
  });

  useEffect(() => {
    const loadMemberInfo = async () => {
      const info = await fetchMemberInfo();
      setMemberInfo(info.member);
      setLocalMemberInfo({
        cupDay: info.member.cupDay || '안 마심',
        symptoms: info.member.symptom ? info.member.symptom.split(', ') : [],
        allergies: info.member.allergy ? info.member.allergy.split(', ') : [],
      });
    };

    loadMemberInfo();
  }, [setMemberInfo]);

  const handleCupDayChange = (cupDay: any) => {
    setLocalMemberInfo((prev) => ({ ...prev, cupDay }));
  };

  const toggleSymptom = (symptom: any) => {
    setLocalMemberInfo((prev) => {
      const updatedSymptoms =
        symptom === '별다른 증상이 없어요'
          ? ['별다른 증상이 없어요']
          : prev.symptoms.includes(symptom)
            ? prev.symptoms.filter((s) => s !== symptom)
            : [...prev.symptoms.filter((s) => s !== '별다른 증상이 없어요'), symptom];

      return { ...prev, symptoms: updatedSymptoms };
    });
  };
  const toggleAllergy = (allergy: any) => {
    setLocalMemberInfo((prev) => {
      const updatedAllergies =
        allergy === '없어요'
          ? ['없어요']
          : prev.allergies.includes(allergy)
            ? prev.allergies.filter((a) => a !== allergy)
            : [...prev.allergies.filter((a) => a !== '없어요'), allergy];

      return { ...prev, allergies: updatedAllergies };
    });
  };

  const handleUpdateProfileTwo = async () => {
    try {
      // 프로필 정보 업데이트를 시도합니다.
      await updateMemberInfoTwo({
        cupDay: localMemberInfo.cupDay,
        symptoms: localMemberInfo.symptoms,
        allergies: localMemberInfo.allergies,
      });

      const info = await fetchMemberInfo();
      setMemberInfo(info.member);
      setLocalMemberInfo({
        cupDay: info.member.cupDay || '안 마심',
        symptoms: info.member.symptom ? info.member.symptom.split(', ') : [],
        allergies: info.member.allergy ? info.member.allergy.split(', ') : [],
      });

      toast('내 프로필을 저장했어요', {
        toastId: 'profile-update2',
      });
    } catch (error) {
      console.error('프로필 업데이트 중 에러 발생:', error);
      toast('프로필 업데이트에 실패했습니다.', {
        toastId: 'profile-update-error',
      });
    }
  };

  return (
    <section className="w-full px-5 pt-14">
      <section className="flex flex-col">
        <h1 className="mb-6 mt-8 flex min-w-[360px] items-center justify-start text-[22px] font-semibold leading-[30px] text-gray10">
          곧 나에게 알맞은 <br /> 카페인 양을 알 수 있어요.
        </h1>
        <form className="space-y-8">
          <div className="flex flex-col justify-center space-y-4">
            <p className="text-md font-medium text-gray10">하루에 커피를 몇 잔 정도 마시나요?</p>
            <div className="flex items-center space-x-2">
              {['안 마심', '1잔', '2잔', '3잔 이상'].map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => handleCupDayChange(option)}
                  className={`flex h-[34px] items-center rounded-md border px-4 py-2 text-sm leading-6 ${localMemberInfo.cupDay === option ? 'border-primaryOrange bg-orange01 text-primaryOrange' : 'border-gray05 bg-gray01 text-gray08'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <p className="text-md font-medium text-gray10">커피를 마실 때 나타나는 증상을 모두 선택해주세요.</p>
            <div className="flex items-center space-x-2">
              {['잠이 안와요', '심장이 빨리 뛰어요'].map((symptom) => (
                <button
                  type="button"
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  className={`flex h-[34px] items-center rounded-md border px-4 py-2 text-sm leading-6 ${localMemberInfo.symptoms.includes(symptom) ? 'border-primaryOrange bg-orange01 text-primaryOrange' : 'border-gray05 bg-gray01 text-gray08'}`}
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
                  className={`flex h-[34px] items-center rounded-md border px-4 py-2 text-sm leading-6 ${localMemberInfo.symptoms.includes(symptom) ? 'border-primaryOrange bg-orange01 text-primaryOrange' : 'border-gray05 bg-gray01 text-gray08'}`}
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
                  className={`flex h-[34px] items-center rounded-md border px-4 py-2 text-sm leading-6 ${localMemberInfo.symptoms.includes(symptom) ? 'border-primaryOrange bg-orange01 text-primaryOrange' : 'border-gray05 bg-gray01 text-gray08'}`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <p className="text-md font-medium text-gray10">음식 알레르기가 있다면 모두 선택해주세요.</p>
            <div className="flex items-center space-x-2">
              {['없어요', '우유', '대두', '밀'].map((allergy) => (
                <button
                  type="button"
                  key={allergy}
                  onClick={() => toggleAllergy(allergy)}
                  className={`flex h-[34px] items-center rounded-md border px-4 py-2 text-sm leading-6 ${localMemberInfo.allergies.includes(allergy) ? 'border-primaryOrange bg-orange01 text-primaryOrange' : 'border-gray05 bg-gray01 text-gray08'}`}
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
                  className={`flex h-[34px] items-center rounded-md border px-4 py-2 text-sm leading-6 ${localMemberInfo.allergies.includes(allergy) ? 'border-primaryOrange bg-orange01 text-primaryOrange' : 'border-gray05 bg-gray01 text-gray08'}`}
                >
                  {allergy}
                </button>
              ))}
            </div>
          </div>
        </form>
        <FooterGradientButton onClick={handleUpdateProfileTwo}>저장하기</FooterGradientButton>
      </section>
    </section>
  );
}
