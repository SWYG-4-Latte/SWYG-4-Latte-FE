import axios from "axios";

export const login = async(username: string, password: string) => {
  try{
    const endpoint = 'https://latte-server.site/auth/login';
    const response = await axios.post(endpoint, {
      mbrId: username,
      password
    })
    return response.data;
  } catch (error) {
    console.log("Login API Error", error)
    throw error;
  }
}