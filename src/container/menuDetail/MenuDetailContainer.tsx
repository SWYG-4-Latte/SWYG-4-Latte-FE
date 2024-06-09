'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import MenuInfoContainer from './MenuInfoContainer';
import CaffeineComparisonContainer from './CaffeineComparisonContainer';
import LowerCaffeineMenuContainer from './LowerCaffeineMenuContainer';
import FooterGradientButton from '@/components/common/button/FooterGradientButton';
import useModal from '@/hooks/useModal';
import { useRecentlyViewedDrinksStore } from '@/store/recentlyViewedDrinksStore';
import { MenuDetail } from '@/types/menu/menu';
import apiInstance from '@/api/instance';
import useLocalStorage from '@/hooks/useLocalStorage';

const MenuDetailContainer = ({ ...menuDetail }: MenuDetail) => {
  const { addDrinkToRecentlyViewedStore } = useRecentlyViewedDrinksStore();

  const { openModal: openRecordModal } = useModal('record');
  const { openModal: openLoginModal } = useModal('login');

  const isLoggedIn = !!useLocalStorage('accessToken');

  const searchParams = useSearchParams();
  const size = searchParams.get('size');
  const [activeMenuDetail, setActiveMenuDetail] = useState(menuDetail);

  const { menuNo, lowCaffeineMenus, menuName, imageUrl } = activeMenuDetail;

  const handleRecord = async () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    const recordDrinkData = {
      menuNo: menuNo,
      menuName: menuName,
      menuImg: imageUrl,
    };

    openRecordModal(recordDrinkData);
  };

  const getMenuDetailBySize = useCallback(
    async (menuSize: string) => {
      const { data } = await apiInstance.get(`/menu/detail/${menuDetail.menuNo}`, {
        params: {
          menu_size: menuSize,
        },
      });
      setActiveMenuDetail(data);
    },
    [menuDetail.menuNo],
  );

  useEffect(() => {
    if (!size) return;

    getMenuDetailBySize(size);
  }, [size, getMenuDetailBySize]);

  useEffect(() => {
    addDrinkToRecentlyViewedStore(menuNo);
    // 사이즈에 상관없이 처음 클릭한 메뉴(사이즈)만 저장
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addDrinkToRecentlyViewedStore]);

  return (
    <div>
      <div className="pb-24 pt-14">
        <MenuInfoContainer menu={activeMenuDetail} />
        <CaffeineComparisonContainer menu={activeMenuDetail} onOpenLoginModal={openLoginModal} />
        <LowerCaffeineMenuContainer menus={lowCaffeineMenus} />
        <FooterGradientButton onClick={handleRecord}>오늘 마신 카페인으로 기록하기</FooterGradientButton>
      </div>
    </div>
  );
};

export default MenuDetailContainer;
