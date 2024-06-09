'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Splash = () => {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    router.prefetch('/home');

    setTimeout(() => {
      setIsVisible(false);
      router.replace('/home');
    }, 2000);
  }, [router]);

  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <>
          <meta name="theme-color" content="#F6B66E" />
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
            }}
            className="relative flex h-dvh flex-col items-center bg-gradient-to-t from-primaryOrange from-[-21.45%] to-primaryAmber to-[73.29%]"
          >
            <div className="mb-[45px] flex h-2/5 flex-col justify-center gap-[23px]">
              <p className="text-center font-medium leading-[22px] text-[#282828]">
                나에게 핏한 카페인 관리
                <br />
                라떼핏의 조언 한 잔으로 시작해요
              </p>
              <Image priority src="/svgs/logo-splash.svg" width={204} height={66} alt="로고" />
            </div>
            <Image
              priority
              src="/images/img-splash.png"
              width={0}
              height={0}
              sizes="100vw"
              className="absolute bottom-0 h-auto w-full"
              alt="스플래시"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Splash;
