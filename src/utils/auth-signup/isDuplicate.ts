import axios from 'axios';

/** Docs
 * 중복 검사 함수
 * @param fieldType 검사할 필드의 종류 ('username', 'nickname', 'email')
 * @param value 검사할 값
 * @returns 중복 여부 (true: 미중복, false: 중복)
 */

async function checkDuplicate(fieldType: string, value: string): Promise<boolean> {
  try {
    let endpoint = '';
    let requestData = {};
    if (fieldType === 'username') {
      endpoint = `https://latte-server.site/auth/existsId/${value}`;
    } else if (fieldType === 'nickname') {
      endpoint = `https://latte-server.site/auth/existsNickname/${value}`;
    } else if (fieldType === 'email') {
      endpoint = `https://latte-server.site/auth/existsEmail/${value}`;
    } else {
      throw new Error(`Unsupported field type: ${fieldType}`);
    }

    const response = await axios.post(endpoint);
    const { data } = response.data;

    if (fieldType === 'username') return data.confirmIdYn === 'true';
    if (fieldType === 'nickname') return data.confirmNicknameYn === 'true';
    if (fieldType === 'email') return data.confirmEmailYn === 'true';

    return false;
  } catch (error) {
    console.error(`Duplicate check failed for ${fieldType}:`, error);
    return false;
  }
}

export default checkDuplicate;
