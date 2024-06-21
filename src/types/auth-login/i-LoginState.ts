export interface ILoginState {
  accessToken: string;
  refreshToken: string;
  isLoggedIn: boolean;
  loginError: string | null;

  nickname: string;
  gender: string;
  pregnancy: boolean;
  pregMonth: string;
  allergies: string[];
  caffeineIntake: number; // Backend지정값

  setLogin: (accessToken: any, refreshToken: any) => void;
  setLogout: () => void;
  setUserInfo: (userInfo: any) => void;
}
