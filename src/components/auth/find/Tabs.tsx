'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/utils/style';

const TAB = [
  {
    label: '아이디 찾기',
    path: '/auth/find/id',
  },
  {
    label: '비밀번호 찾기',
    path: '/auth/find/password',
  },
];

const Tabs = () => {
  const pathname = usePathname();

  return (
    <section className="absolute top-14 w-full">
      <div className="flex h-12 border-b-2 border-gray03 bg-primaryIvory">
        {TAB.map(({ label, path }) => (
          <Link
            href={path}
            key={label}
            className={cn(
              'flex w-1/2 items-center justify-center text-gray08',
              pathname.includes(path) && 'text-primaryOrange',
            )}
          >
            <span className="text-nowrap text-[14px] leading-6">{label}</span>
            {pathname.includes(path) && (
              <motion.div
                layoutId="underline"
                transition={{ duration: 0.2 }}
                className="absolute bottom-0 h-[2px] w-1/2 bg-primaryOrange"
              />
            )}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Tabs;
