'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import HomeIcon from '../icons/HomeIcon';
import CategoryIcon from '../icons/CategoryIcon';
import CalendarIcon from '../icons/CalendarIcon';
import ArticleIcon from '../icons/ArticleIcon';

interface Icon {
  [key: string]: ({ className }: { className: string }) => JSX.Element;
}

interface NavItemProps {
  path: string;
  name: string;
}

const ICON: Icon = {
  home: HomeIcon,
  category: CategoryIcon,
  calendar: CalendarIcon,
  article: ArticleIcon,
};

const NavItem = ({ path, name }: NavItemProps) => {
  const pathname = usePathname();

  const isActive = path === pathname;
  const color = isActive ? 'text-orange09' : 'text-gray06';
  const NavIcon = ICON[path.slice(1)];

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
