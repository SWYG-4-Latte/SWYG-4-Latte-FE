'use client';

import { useState } from 'react';

const useInput = (defaultValue: string, validationFn: (value: string) => boolean) => {
  const [enteredValue, setEnteredValue] = useState(defaultValue);

  const isValid = validationFn(enteredValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
  };

  return {
    value: enteredValue,
    handleInputChange,
    isValid,
  };
};

export default useInput;
