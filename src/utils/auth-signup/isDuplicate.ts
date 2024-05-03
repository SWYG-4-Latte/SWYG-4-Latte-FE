import axios from "axios";

/** Docs
 * 중복 검사 함수
 * @param fieldType 검사할 필드의 종류 ('username', 'nickname', 'email')
 * @param value 검사할 값
 * @returns 중복 여부 (true: 미중복, false: 중복)
 */

async function checkDuplicate(fieldType: string, value: string): Promise<boolean> {
  try {
    const endpoint = "https://latte-server.site/auth/signup";
    const response = await axios.post(endpoint, { type: fieldType, value: value });
    return response.data.confirmId === true
  } catch (error) {
    console.error(`Duplicate check failed for ${fieldType}:`, error);
    return false; 
  }
}

export default checkDuplicate