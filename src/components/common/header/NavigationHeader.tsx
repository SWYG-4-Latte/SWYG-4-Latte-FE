'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

const NavigationHeader = ({ title, children }: PropsWithChildren<{ title?: string }>) => {
  const router = useRouter();

  return (
    <header className="fixed z-10 flex h-14 w-full max-w-[500px] items-center justify-center bg-primaryIvory px-5">
      <button className="absolute left-4">
        <Image src="/svgs/arrow-left.svg" width={24} height={24} alt="뒤로 가기" onClick={() => router.back()} />
      </button>
      {title && <span className="font-medium text-gray10">{title}</span>}
      {children}
    </header>
  );
};

export default NavigationHeader;
