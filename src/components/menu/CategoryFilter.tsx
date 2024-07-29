'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

import { MENU_CATEGORIES } from '@/constants/menu/menuList';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const CategoryFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const categoryName = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState(categoryName ?? 'all');

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [selectedCategory, pathname, router, searchParams]);

  return (
    <div className="flex gap-7 overflow-x-scroll border-b-[1px] border-b-gray04 pb-2 pt-4">
      <Swiper freeMode modules={[FreeMode]} slidesPerView="auto">
        {MENU_CATEGORIES.map(({ key, name, icon, selectedIcon }) => (
          <SwiperSlide key={key}>
            <div
              onClick={() => {
                setSelectedCategory(key);
              }}
              className="ml-5 flex cursor-pointer flex-col items-center justify-center gap-2"
            >
              <Image priority src={selectedCategory === key ? selectedIcon : icon} alt={name} width={48} height={48} />
              <span className="text-nowrap text-xs text-gray08">{name}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryFilter;
