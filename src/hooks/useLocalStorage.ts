'use client';

import { useEffect, useState } from 'react';

const useLocalStorage = (key: string) => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    setValue(localStorage.getItem(key));
  }, [key]);

  return value;
};

export default useLocalStorage;
