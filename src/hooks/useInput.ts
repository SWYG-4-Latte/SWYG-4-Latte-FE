'use client';

import { useState } from 'react';

const useInput = (defaultValue: string, validationFn: (value: string) => boolean) => {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validationFn(enteredValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true);
    setEnteredValue(event.target.value);
  };

  return {
    value: enteredValue,
    setValue: setEnteredValue,
    handleInputChange,
    isValid,
    hasError: isTouched && !isValid,
  };
};

export default useInput;
