import axios from "axios";

export const fetchMemberInfo = async() => {
  try{
    const endpoint = 'https://latte-server.site/mypage/memberInfo'
    const response = await axios.get(endpoint, 
    //   {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //   }
    // }
  )

    if (response.data.data) {
      console.log("회원 정보를 성공적으로 불러왔습니다.", response.data.data);
      return response.data.data;
    }
  } 
  catch (error) {
    console.error('API 통신 실패 - fethMebmberInfo', error)
    throw error
  }
}