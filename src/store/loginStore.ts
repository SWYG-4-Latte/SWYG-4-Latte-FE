// Zustand
import { create } from "zustand";
// TS
import { ILoginState } from './../types/auth-login/i-LoginState';

const useLoginStore = create<ILoginState>((set) => ({
  username: '',
  password: '',
  setUsername: (username: string) => set(() => ({ username })),
  setPassword: (password: string) => set(() => ({ password })),
}))

export default useLoginStore