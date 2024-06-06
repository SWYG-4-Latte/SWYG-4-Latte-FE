import { create } from 'zustand';
import axios from 'axios';

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
  updateMemberInfoTwo: (info: { cupDay: string; symptoms: string[]; allergies: string[] }) => Promise<void>;
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
    allergies: [],
  },

  setMemberInfo: (info: IMemberInfoProfile) => set({ memberInfo: { ...get().memberInfo, ...info } }),

  updateMemberInfo: async () => {
    const memberInfo = get().memberInfo;

    if (memberInfo.mbrNo === 0) {
      throw new Error('회원 번호가 설정되지 않았습니다.');
    }

    try {
      const response = await axios.post(`https://latte-server.site/auth/update/${memberInfo.mbrNo}`, memberInfo);
      if (response.data.message === '회원 수정에 성공했습니다.') {
      } else {
        console.error('업데이트 실패:', response.data.message);
      }
    } catch (error) {
      console.error('업데이트 에러', error);
    }
  },

  updateMemberInfoTwo: async (info: { cupDay: string; symptoms: string[]; allergies: string[] }) => {
    const memberInfo = get().memberInfo;

    if (memberInfo.mbrNo === 0) {
      throw new Error('회원 번호가 설정되지 않았습니다.');
    }

    try {
      const { cupDay, symptoms, allergies } = info;
      const updatedSymptoms = symptoms.includes('별다른 증상이 없어요') ? ['별다른 증상이 없어요'] : symptoms;
      const updatedAllergies = allergies.includes('없어요') ? ['없어요'] : allergies;
      const postData = {
        cupDay,
        symptom: updatedSymptoms.join(', '),
        allergy: updatedAllergies.join(', '),
      };
      const response = await axios.post(`https://latte-server.site/auth/update/${memberInfo.mbrNo}`, postData);
      if (response.data.message === '회원 수정에 성공했습니다.') {
        set({
          memberInfo: { ...memberInfo, cupDay, symptoms: updatedSymptoms, allergies: updatedAllergies },
        });
      } else {
        throw new Error('추가 정보 업데이트 실패: ' + response.data.message);
      }
    } catch (error) {
      console.error('업데이트 에러', error);
      throw error;
    }
  },
}));

export default useMemberStore;
