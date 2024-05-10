import axios from "axios";

export const deleteUser = async(mbrNo: any) => {
  try{
    const endpoint = `https://latte-server.site/auth/delete/${mbrNo}`;
    const response = await axios.delete(endpoint)
    return response.data
  } catch (error) {
    console.error('API - Delte 에러', error)
    throw error
  }
}