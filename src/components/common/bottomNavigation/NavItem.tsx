'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { NavItemProps } from '@/types/layout/navigation';
import { NAV_ICON } from '@/constants/navIcon';

const NavItem = ({ path, name }: NavItemProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const isActive = path === pathname;
  const color = isActive ? 'text-orange09' : 'text-gray06';
  const NavIcon = NAV_ICON[path.slice(1)];

  const pathWithParams = isActive && params.toString() ? `${path}?${params.toString()}` : path;

  return (
    <div className="flex w-[68px] justify-center">
      <Link href={pathWithParams} className="flex flex-col items-center justify-center">
        <NavIcon className={color} />
        <span className={`${color} mt-1 h-[14px] text-xs`}>{name}</span>
      </Link>
    </div>
  );
};

export default NavItem;
