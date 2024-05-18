'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

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

  const { openModal: openCompleteModal } = useModal('recordComplete');
  const { openModal: openLoginModal } = useModal('login');

  const isLoggedIn = !!useLocalStorage('accessToken');

  const searchParams = useSearchParams();
  const size = searchParams.get('size');
  const [activeMenuDetail, setActiveMenuDetail] = useState(menuDetail);

  const { menuNo, lowCaffeineMenus } = activeMenuDetail;

  const handleRecord = async () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    try {
      await apiInstance.post('/drink/date/menu', {
        menuNo,
      });
      openCompleteModal({ menuImg: activeMenuDetail.imageUrl, menuName: activeMenuDetail.menuName });
    } catch (error) {
      toast('마신 메뉴 등록에 실패했습니다.');
    }
  };

  useEffect(() => {
    const getMenuDetailBySize = async (menuSize: string) => {
      const { data } = await apiInstance.get(`/menu/detail/${menuNo}`, {
        params: {
          menu_size: menuSize,
        },
      });
      setActiveMenuDetail(data);
    };

    getMenuDetailBySize(size ?? menuDetail.menuSize);
  }, [size]);

  useEffect(() => {
    addDrinkToRecentlyViewedStore(menuNo);
  }, []);

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
