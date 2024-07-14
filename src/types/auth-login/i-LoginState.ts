export interface ILoginState {
  accessToken: string;
  refreshToken: string | undefined;
  isLoggedIn: boolean;
  loginError: string | null;

  nickname: string;
  gender: string;
  pregnancy: boolean;
  pregMonth: string;
  allergies: string[];
  caffeineIntake: number; // Backend지정값

  setLogin: (accessToken: string, refreshToken?: string) => void;
  setLogout: () => void;
  setUserInfo: (userInfo: any) => void;
}
