export const REDIRECT_URI =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI
    : 'http://localhost:3000/auth/login/kakao';
export const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
