import apiInstance from '@/api/instance';

export interface SignupResponseData {
  result: {
    mbrNo: number;
    nickname: string;
  };
  jwtToken: {
    accessToken: string;
    refreshToken: string;
  };
}

export const signup = async (signupData: any) => {
  const { data } = await apiInstance.post('/auth/signup', signupData);

  return data.data as SignupResponseData;
};
