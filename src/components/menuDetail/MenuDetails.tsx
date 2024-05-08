import { MenuDetail } from '@/types/home/menu';
import { ellipsisText } from '@/utils/string';

const MenuDetails = ({ menu }: { menu: MenuDetail }) => {
  const isLoggedIn = true; // 로그인 여부

  return (
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
  );
};

export default MenuDetails;
