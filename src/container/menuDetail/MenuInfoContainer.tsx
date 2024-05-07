import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

import NutrientInfo from '@/components/menuDetail/NutrientInfoList';
import { ellipsisText } from '@/utils/string';
import { MenuDetail } from '@/types/home/menu';
import MenuSizeTab from '@/components/menuDetail/MenuSizeTab';

interface MenuInfoContainerProps {
  menu: MenuDetail;
}

const MenuInfoContainer = ({ menu }: MenuInfoContainerProps) => {
  const isLoggedIn = true; // 로그인 여부

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
      <div className="flex flex-col gap-2 bg-primaryIvory px-5 py-4">
        <span className="text-xs text-primaryOrange">{menu.brand}</span>
        <span className="text-[22px] font-semibold leading-[30px] text-gray10">{ellipsisText(menu.menuName, 15)}</span>
        <div className="flex items-center font-medium text-gray08">
          <span>카페인 {menu.caffeine}</span>
          <span className="mx-2 h-3 w-px bg-[#D9D9D9]" />
          <span>{menu.price.toLocaleString('ko-KR')}원</span>
        </div>
        <div className="flex items-center text-sm leading-6 text-gray08">
          {isLoggedIn ? (
            <>
              하루 적정 카페인 섭취량의
              <div className="mx-[5px] flex h-[22px] w-fit items-center justify-center rounded bg-primaryBeige px-2 py-1 leading-normal text-orange09">
                {menu.percent}
              </div>
              를 차지해요.
            </>
          ) : (
            <>로그인하고 하루 적정 카페인 섭취량을 확인해보세요.</>
          )}
        </div>
      </div>
      <MenuSizeTab sizes={menu.otherSizes} active={menu.menuSize} />
      <NutrientInfo nutrientDetail={menu.nutrient} nutrientLevel={menu.level} />
    </div>
  );
};

export default MenuInfoContainer;
