import axios from "axios";

export const signup = async(signupData: any) => {
  try {
    const endpoint = 'https://latte-server.site/auth/signup'
    const response = await axios.post(endpoint, signupData);
    return response.data
  } catch (error) {
    console.log('Signup API Error', error)
    throw error;
  }
};
