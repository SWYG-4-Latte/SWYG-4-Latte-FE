import Image from 'next/image';

import NutrientInfo from '@/components/menuDetail/NutrientInfo';
import { ellipsisText } from '@/utils/string';
import { MenuDetail } from '@/types/home/menu';

const MenuInfoContainer = ({ menu }: { menu: MenuDetail }) => {
  return (
    <div>
      <div className="flex h-[260px] items-center justify-center overflow-hidden">
        <Image
          src={menu.imageUrl}
          priority
          width={0}
          height={0}
          sizes="100vw"
          className="h-full w-[360px]"
          alt={menu.menuName}
        />
      </div>
      <div className="flex-col bg-primaryIvory px-5 py-4">
        <div className="text-xs text-primaryOrange">{menu.brand}</div>
        <div className="my-2">
          <div className="text-[22px] font-semibold leading-[30px] text-gray10">{ellipsisText(menu.menuName, 15)}</div>
          <div className="my-2">
            <div className="flex items-center font-medium text-gray08">
              <div>{menu.caffeine}</div>
              <div className="mx-2 h-3 w-px bg-[#D9D9D9]" />
              <div>{menu.price}</div>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray08">
            하루 적정 카페인 섭취량의
            <div className="mx-[5px] flex w-fit items-center justify-center rounded bg-primaryBeige px-2 py-1 text-orange09">
              20%
            </div>
            를 차지해요
          </div>
        </div>
      </div>
      <NutrientInfo nutrient={menu.nutrient} />
    </div>
  );
};

export default MenuInfoContainer;
