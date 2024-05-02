'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: PropsWithChildren) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? createPortal(children, document.getElementById('modal-root') as HTMLDivElement) : null;
};

export default Portal;
