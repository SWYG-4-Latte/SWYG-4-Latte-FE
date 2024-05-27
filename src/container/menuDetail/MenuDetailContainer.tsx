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
