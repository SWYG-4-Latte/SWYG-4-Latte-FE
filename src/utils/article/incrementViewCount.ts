import axios from 'axios';

export const incrementViewCount = async (articleNo: number) => {
  try {
    const response = await axios.get(`https://latte-server.site/article/detail/${articleNo}`);

    return response.data;
  } catch (error) {
    console.error('Error incrementing view count:', error);
    throw error;
  }
};
