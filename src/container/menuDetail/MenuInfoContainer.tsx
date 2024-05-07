import Image from 'next/image';

import NutrientInfo from '@/components/menuDetail/NutrientInfoList';
import { MenuDetail } from '@/types/home/menu';
import MenuSizeTab from '@/components/menuDetail/MenuSizeTab';
import MenuDetails from '@/components/menuDetail/MenuDetails';

interface MenuInfoContainerProps {
  menu: MenuDetail;
}

const MenuInfoContainer = ({ menu }: MenuInfoContainerProps) => {
  return (
    <div>
      <div className="flex h-[360px] items-center justify-center overflow-hidden bg-primaryBeige">
        <Image
          src={menu.imageUrl}
          priority
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
          quality={100}
          alt={menu.menuName}
        />
      </div>
      <MenuDetails menu={menu} />
      <MenuSizeTab sizes={menu.otherSizes} active={menu.menuSize} />
      <NutrientInfo nutrientDetail={menu.nutrient} nutrientLevel={menu.level} />
    </div>
  );
};

export default MenuInfoContainer;
