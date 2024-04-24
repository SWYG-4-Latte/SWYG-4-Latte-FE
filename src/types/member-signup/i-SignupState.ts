export interface ISignupState {
  mbrId?: string; 
  password: string;
  mbrName?: string; 
  age: number;
  nickname: string;
  allergies: string[];
  caffeine: '0' | '1' | '2' | '3+';
  gender: 'male' | 'female';
  email: string;
  pregnancy: boolean;
  symptoms: string[];
  currentStep: number;

  setField: <T extends keyof ISignupState>(field: T, value: ISignupState[T]) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}

