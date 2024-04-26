import { Menu } from '@/types/home/menu';
import DrinkItem from '@/components/common/drink/DrinkItem';

const LowerCaffeineMenuContainer = ({ menus }: { menus: Menu[] }) => {
  return (
    <div className="bg-gray02 px-5 py-4">
      <div className="font-medium text-gray10">낮은 카페인 함량의 음료를 찾고 있다면?</div>
      <div className="mt-3 flex justify-between">
        {menus.map((menu) => (
          <DrinkItem key={menu.menuNo} menuName={menu.menuName} imageUrl={menu.imageUrl} />
        ))}
      </div>
    </div>
  );
};

export default LowerCaffeineMenuContainer;
