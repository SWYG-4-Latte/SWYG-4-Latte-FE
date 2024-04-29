export interface ISignupState {
  username: string;
  email: string;
  nickname: string;
  usernameValid: boolean;  // Validation state for username
  emailValid: boolean;     // Validation state for email
  nicknameValid: boolean;  // Validation state for nickname
  currentStep: number;

  password: string;
  age: number;
  cellPhone?: string;
  gender: 'M' | 'F';
  pregnancy: boolean;
  pregMonth?: number;
  allergy?: string;
  symptom?: string;
  imgUrl?: string;
  role?: 'USER' | 'ADMIN';
  deleteYn?: 'Y' | 'N';
  cupDay?: number;
  regDate?: Date;
  updateDate?: Date;


  setField: <T extends keyof ISignupState>(field: T, value: ISignupState[T]) => void;
  setValidity: (field: keyof ISignupState, isValid: boolean) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}