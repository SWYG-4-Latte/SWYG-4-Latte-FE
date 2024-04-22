'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavItemProps } from '@/types/navigation';
import { NAV_ICON } from '@/constants/navIcon';

const NavItem = ({ path, name }: NavItemProps) => {
  const pathname = usePathname();

  const isActive = path === pathname;
  const color = isActive ? 'text-orange09' : 'text-gray06';
  const NavIcon = NAV_ICON[path.slice(1)];

  return (
    <div className="flex w-[68px] justify-center">
      <Link href={path} className="flex flex-col items-center justify-center">
        <NavIcon className={color} />
        <span className={`${color} mt-1 text-xs tracking-[-0.12px]`}>{name}</span>
      </Link>
    </div>
  );
};

export default NavItem;
