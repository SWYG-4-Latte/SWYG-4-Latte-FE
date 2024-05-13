'use client'
//NEXT
import React, {useState, useEffect} from "react";
import { toast } from "react-toastify";
//Zustand
import useMemberStore from "@/store/memberStore";
//utils
import { fetchMemberInfo } from "@/utils/mypage/isMember";

export default function MemberInfoContent() {
  const {memberInfo, setMemberInfo, updateMemberInfoTwo } = useMemberStore()

  const [localMemberInfo, setLocalMemberInfo] = useState({
    cupDay: memberInfo.cupDay || '안 마심',
    symptoms: memberInfo.symptoms || [],
    allergies: memberInfo.allergies || []
  });

  useEffect(()=>{
    console.log('fetch memberInfo useEffect working in 나의 카페인 추가설정')
    const loadMemberInfo = async () => {
      const info = await fetchMemberInfo()
      setMemberInfo(info.member)
      setLocalMemberInfo({
        cupDay: info.member.cupDay || '안 마심',
        symptoms: info.member.symptom ? info.member.symptom.split(', ') : [],
        allergies: info.member.allergy ? info.member.allergy.split(', ') : []
      });
    }

    loadMemberInfo()
  },[setMemberInfo])

  const handleCupDayChange = (cupDay: any) => {
    setLocalMemberInfo(prev => ({ ...prev, cupDay }));
  };

  const toggleSymptom = (symptom: any) => {
    setLocalMemberInfo(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const toggleAllergy = (allergy: any) => {
    setLocalMemberInfo(prev => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter(a => a !== allergy)
        : [...prev.allergies, allergy]
    }));
  };

  const handleUpdateProfileTwo = async () => {
    try {
      // 프로필 정보 업데이트를 시도합니다.
      await updateMemberInfoTwo({
        cupDay: localMemberInfo.cupDay,
        symptoms: localMemberInfo.symptoms,
        allergies: localMemberInfo.allergies
      });

      const info = await fetchMemberInfo();
      setMemberInfo(info.member);
      setLocalMemberInfo({
        cupDay: info.member.cupDay || '안 마심',
        symptoms: info.member.symptom ? info.member.symptom.split(', ') : [],
        allergies: info.member.allergy ? info.member.allergy.split(', ') : []
      });

      toast('내 프로필을 저장했어요', {
        toastId: 'profile-update2'
      });
    } catch (error) {
      console.error('프로필 업데이트 중 에러 발생:', error);
      toast('프로필 업데이트에 실패했습니다.', {
        toastId: 'profile-update-error'
      });
    }
};

console.log('localMemberInfo.cupDay', localMemberInfo.cupDay)
console.log('localMemberInfo.symptoms', localMemberInfo.symptoms)

  return (
    <section className="px-5 ">
      <section className="flex flex-col items-center">
        <h1 className="text-gray10 px-5 flex items-center justify-start font-semibold min-w-[360px] text-[22px] my-6 leading-7">곧 나에게 알맞은 <br/> 카페인 양을 알 수 있어요.</h1>
        <form className="space-y-8">
          <div className="flex flex-col space-y-4 justify-center">
            <p className="text-md font-pretendard600 text-gray10">하루에 커피를 몇 잔 정도 마시나요?</p>
            <div className="flex items-center space-x-2">
            {['안마심', '1잔', '2잔', '3잔 이상'].map(option => (
              <button
                type="button"
                key={option}
                onClick={() => handleCupDayChange(option)}
                className={`px-4 py-2 border rounded-md text-sm ${localMemberInfo.cupDay === option ? 'bg-orange01 text-primaryOrange border-primaryOrange' : 'border-gray05'}`}
              >
              {option}
              </button>
            ))}
            </div>
          </div>
          <div className="flex flex-col space-y-4 justify-center">
            <p className="text-md font-pretendard600 text-gray10">커피를 마실 때 나타나는 증상을 모두 선택해주세요.</p>
            <div className="flex items-center space-x-2">
            {['잠이 안와요', '심장이 빨리 뛰어요'].map(symptom => (
              <button
                type="button"
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
                className={`px-4 py-2 border rounded-md text-sm ${localMemberInfo.symptoms.includes(symptom) ? 'bg-orange01 text-primaryOrange border-primaryOrange' : 'border-gray05'}`}
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
                className={`px-4 py-2 border rounded-md text-sm ${localMemberInfo.symptoms.includes(symptom) ? 'bg-orange01 text-primaryOrange border-primaryOrange' : 'border-gray05'}`}
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
                className={`px-4 py-2 border rounded-md text-sm ${localMemberInfo.symptoms.includes(symptom) ? 'bg-orange01 text-primaryOrange border-primaryOrange' : 'border-gray05'}`}
              >
                {symptom}
              </button>
            ))}
            </div>
          </div>
          <div className="flex flex-col space-y-4 justify-center">
            <p className="text-md font-pretendard600 text-gray10">음식 알레르기가 있다면 모두 선택해주세요.</p>
            <div className="flex items-center space-x-2">
            {['없어요','우유','대두','밀'].map(allergy => (
              <button
                type="button"
                key={allergy}
                onClick={() => toggleAllergy(allergy)}
                className={`px-4 py-2 border rounded-md text-sm ${localMemberInfo.allergies.includes(allergy) ? 'bg-orange01 text-primaryOrange border-primaryOrange' : 'border-gray05'}`}
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
                className={`px-4 py-2 border rounded-md text-sm ${localMemberInfo.allergies.includes(allergy) ? 'bg-orange01 text-primaryOrange border-primaryOrange' : 'border-gray05'}`}
              >
                {allergy}
              </button>
            ))}
            </div>
          </div>
        </form>
        <button 
          onClick={handleUpdateProfileTwo}
          className='mt-[45px] z-10 w-[320px] h-[50px] rounded-md bg-primaryOrange text-gray00 '>
            저장하기
        </button>
      </section>
    </section>
    
  )
}
