import Image from 'next/image';

import { Menu } from '@/types/home/menu';
import { ellipsisText } from '@/utils/string';

const LowerCaffeineMenuContainer = ({ menus }: { menus: Menu[] }) => {
  return (
    <div className="bg-gray02 px-5 py-4">
      <div className="font-medium text-gray10">낮은 카페인 함량의 음료를 찾고 있다면?</div>
      <div className="mt-3 flex justify-between">
        {menus.map((menu) => (
          <div key={menu.menuNo} className="flex flex-col items-center justify-center gap-2">
            <div className="flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-full bg-primaryBeige">
              <Image
                src={menu.imageUrl}
                alt={menu.menuName}
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-full"
              />
            </div>

            <div className="whitespace-nowrap text-xs text-gray08">{ellipsisText(menu.menuName, 10)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowerCaffeineMenuContainer;
