export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9\._-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  return emailRegex.test(email);
};

export const validateNickname = (name: string) => {
  const nicknameRegex = /^[가-힣]{2,10}$/;

  return nicknameRegex.test(name);
};

export const validateId = (id: string) => {
  const idRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,12}$/g;

  return idRegex.test(id);
};

export const validatePassword = (password: string) => {
  const passwordRegex = /^(?!((?:[a-z]+)|(?:[~!@#$%^&*()\-_+=]+)|(?:[\d]+))$)[a-z\d~!@#$%^&*()\-_+=]{8,}$/;

  return passwordRegex.test(password);
};

export const validateAge = (age: string) => {
  return Number(age) >= 19 && Number(age) <= 98;
};

export const validatePregnancyMonth = (month: string) => {
  if (!month) return false;

  return Number(month) >= 0 && Number(month) <= 10;
};
