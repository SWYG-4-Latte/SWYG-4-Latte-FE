export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
};

export const validateNickname = (name: string) => {
  const nicknameRegex = /^[가-힣]{2,10}$/;

  return nicknameRegex.test(name);
};

export const validateId = (id: string) => {
  const idRegex = /^[A-Za-z0-9]{6,12}$/;

  return idRegex.test(id);
};

export const validatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>~`\\/\[\]\-=_+;'])[A-Za-z\d!@#$%^&*(),.?":{}|<>~`\\/\[\]\-=_+;']{8,18}$/;

  return passwordRegex.test(password);
};
