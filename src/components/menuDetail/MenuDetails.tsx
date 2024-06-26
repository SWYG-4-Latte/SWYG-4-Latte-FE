import Link from 'next/link';

import useLocalStorage from '@/hooks/useLocalStorage';
import { MenuDetail } from '@/types/menu/menu';

const MenuDetails = ({ menu }: { menu: MenuDetail }) => {
  const isLoggedIn = !!useLocalStorage('accessToken');

  return (
    <div className="flex flex-col gap-2 bg-primaryIvory px-5 py-4">
      <span className="text-xs text-primaryOrange">{menu.brand}</span>
      <span className="line-clamp-1 text-[22px] font-semibold leading-[30px] text-gray10">{menu.menuName}</span>
      <div className="flex items-center font-medium text-gray08">
        <span>카페인 {menu.caffeine}</span>
        <span className="mx-2 h-3 w-px bg-[#D9D9D9]" />
        <span>{menu.price.toLocaleString('ko-KR')}원</span>
      </div>
      <div className="flex items-center text-sm leading-6 text-gray08">
        {menu.percent ? (
          <>
            하루 적정 카페인 섭취량의
            <div className="mx-[5px] flex h-[22px] w-fit items-center justify-center rounded bg-primaryBeige px-2 py-1 leading-normal text-orange09">
              {menu.percent}
            </div>
            를 차지해요.
          </>
        ) : (
          <Link href={isLoggedIn ? '/mypage/my-profile' : '/auth/login'}>
            {isLoggedIn ? '맞춤 정보를 입력' : '로그인'}하고 하루 적정 카페인 섭취량을 확인해보세요.
          </Link>
        )}
      </div>
    </div>
  );
};

export default MenuDetails;
