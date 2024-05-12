import { create } from "zustand";
import axios from "axios";

interface IMemberInfoProfile {
  mbrNo: number;
  email: string;
  nickname: string;
  gender?: string;
  pregnancy?: boolean;
  pregMonth?: number;
  age?: string;
  cupDay?: string;
  symptoms?: string[];
  allergies?: string[];
}

interface IMemberStoreState {
  memberInfo: IMemberInfoProfile;
  setMemberInfo: (info: IMemberInfoProfile) => void;
  updateMemberInfo: () => Promise<void>;
  updateMemberInfoTwo: (info: { cupDay: string, symptoms: string[], allergies: string[] }) => Promise<void>;
}

const useMemberStore = create<IMemberStoreState>((set, get) => ({
  memberInfo: {
    mbrNo: 0,
    email: '',
    nickname: '',
    gender: '',
    pregnancy: false,
    pregMonth: 0,
    age: '',
    cupDay: '',
    symptoms: [],
    allergies: []
  },

  setMemberInfo: (info: IMemberInfoProfile) => set({ memberInfo: {...get().memberInfo, ...info}}),

  updateMemberInfo: async () => {
    console.log('memberInfo update is working')
    const memberInfo = get().memberInfo;

    console.log('memberInfo.mbrNo in updateMethood',memberInfo.mbrNo)
    console.log('업데이트 호출 시 memberInfo:', memberInfo); // API 호출 시점의 memberInfo 상태 확인

    if (memberInfo.mbrNo === 0) {
      throw new Error('회원 번호가 설정되지 않았습니다.');
    }
    

    try {
      const response = await axios.post(`https://latte-server.site/auth/update/${memberInfo.mbrNo}`, memberInfo);
      if (response.data.message === "회원 수정에 성공했습니다.") {
      } else {
        console.error('업데이트 실패:', response.data.message);
      }
    } catch (error) {
        console.error('업데이트 에러', error);
    }
  },

  updateMemberInfoTwo: async (info: { cupDay: string, symptoms: string[], allergies: string[] }) => {
    const memberInfo = get().memberInfo;
  
    if (memberInfo.mbrNo === 0) {
      throw new Error('회원 번호가 설정되지 않았습니다.');
    }
  
    try {
      const { cupDay, symptoms, allergies } = info;
      const postData = {
        cupDay,
        symptom: symptoms.join(', '),
        allergy: allergies.join(', ')
      };
      const response = await axios.post(`https://latte-server.site/auth/update/${memberInfo.mbrNo}`, postData);
      if (response.data.message === "회원 수정에 성공했습니다.") {
        set({
          memberInfo: {...memberInfo, cupDay, symptoms, allergies}
        });
        console.log('업데이트 성공, 최신 정보로 상태 갱신');
      } else {
        throw new Error('추가 정보 업데이트 실패: ' + response.data.message);
      }
    } catch (error) {
      console.error('업데이트 에러', error);
      throw error;
    }
  }
  
}));

export default useMemberStore