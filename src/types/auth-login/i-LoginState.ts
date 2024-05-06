export interface ILoginState {
  username: string;
  password: string;
  usernameError: string | null;
  passwordError: string | null;
  usernameFocused: boolean;
  passwordFocused: boolean;
  accessToken: string;
  refreshToken: string;
  isLoggedIn: boolean;
  loginError: string | null;


  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setUsernameFocused: (focused: boolean) => void;
  setPasswordFocused: (focused: boolean) => void;
  validateUsername: (username: string) => void;
  validatePassword: (password: string) => void;
  setToken: (accessToken: string, refreshToken?: string) => void;
  clearToken: () => void;
}