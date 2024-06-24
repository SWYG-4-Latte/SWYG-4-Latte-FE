import { create } from 'zustand';

interface IMemberInfoProfile {
  mbrNo: null | number;
  email: string;
  nickname: string;
  gender: string;
  pregnancy: boolean;
  pregMonth: number;
  age: string;
  cupDay: string;
  symptom: string;
  allergy: string;
  caffeineIntake: string;
}

interface IMemberStoreState {
  memberInfo: IMemberInfoProfile;
  setMemberInfo: (info: IMemberInfoProfile) => void;
}

const useMemberStore = create<IMemberStoreState>((set, get) => ({
  memberInfo: {
    mbrNo: null,
    email: '',
    nickname: '',
    gender: '',
    pregnancy: false,
    pregMonth: 0,
    age: '',
    cupDay: '',
    symptom: '',
    allergy: '',
    caffeineIntake: '',
  },

  setMemberInfo: (info: IMemberInfoProfile) => set({ memberInfo: { ...get().memberInfo, ...info } }),
}));

export default useMemberStore;
