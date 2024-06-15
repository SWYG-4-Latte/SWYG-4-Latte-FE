export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
};

export const validateNickname = (name: string) => {
  const nicknameRegex = /^[가-힣]{2,10}$/;

  return nicknameRegex.test(name);
};
