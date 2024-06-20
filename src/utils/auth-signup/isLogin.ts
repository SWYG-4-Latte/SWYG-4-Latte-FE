import apiInstance from '@/api/instance';

export interface LoginResponse {
  message: string;
  data: {
    nickname: string;
    mbrNo: number;
    jwtToken?: {
      grantType: string;
      accessToken: string;
      refreshToken: string;
    };
  };
}

export const login = async (username: string, password: string) => {
  const response = (await apiInstance.post('/auth/login', {
    mbrId: username,
    password,
  })) as LoginResponse;

  return response;
};
