// Library
import { create } from "zustand";
// TypeScript
import { ISignupState } from '../types/auth-signup/i-SignupState';

const useSignupStore = create<ISignupState>((set)=> ({
  mbrId: undefined,
  password: '',
  mbrName: undefined,
  age: 0,
  nickname: '',
  imageUrl: undefined,
  allergies: [],
  caffeine: '0',
  gender: 'male',
  cellPhone: undefined,
  email: '',
  pregnancy: false,
  pregMonth: undefined,
  symptoms: [],
  currentStep: 1,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  goToNextStep: () => set((state) => ({ 
    currentStep: state.currentStep < 5 ? state.currentStep + 1 : 5
  })),
  goToPrevStep: () => set((state) => ({ 
    currentStep: state.currentStep > 1 ? state.currentStep - 1  : 1
  }))
}))

export default useSignupStore;