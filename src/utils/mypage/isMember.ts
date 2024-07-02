import apiInstance from '@/api/instance';

export const fetchMemberInfo = async () => {
  try {
    const { data } = await apiInstance.get('/mypage/tokenInfo');

    return data.data;
  } catch (error) {
    console.error('API 통신 실패 - fethMebmberInfo', error);
    throw error;
  }
};
