// Zustand
import { create } from "zustand";
// TypeScript
import { ISignupState } from '../types/auth-signup/i-SignupState';

const useSignupStore = create<ISignupState>((set)=> ({
  username: '',
  email: '',
  nickname: '',
  usernameValid: false,
  emailValid: false,
  nicknameValid: false,
  currentStep: 1,

  mbrId: undefined,
  password: '',
  mbrName: undefined,
  age: 0,
  imageUrl: undefined,
  allergies: [],
  caffeine: '0',
  gender: 'M',
  cellPhone: undefined,
  pregnancy: false,
  pregMonth: undefined,
  symptoms: [],

  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  setValidity: (field, isValid) => set((state) => ({ ...state, [field]: isValid })),
  goToNextStep: () => set((state) => ({ 
    currentStep: state.currentStep < 5 ? state.currentStep + 1 : 5
  })),
  goToPrevStep: () => set((state) => ({ 
    currentStep: state.currentStep > 1 ? state.currentStep - 1  : 1
  }))
}))

export default useSignupStore;