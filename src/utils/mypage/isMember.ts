import axios from 'axios';

export const fetchMemberInfo = async () => {
  try {
    const endpoint = 'https://latte-server.site/mypage/tokenInfo';
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (response.data.data) {
      return response.data.data;
    }
  } catch (error) {
    console.error('API 통신 실패 - fethMebmberInfo', error);
    throw error;
  }
};
