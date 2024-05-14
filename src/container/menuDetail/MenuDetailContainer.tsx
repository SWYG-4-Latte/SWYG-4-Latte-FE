'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

import RecordCompleteModal from '@/components/common/modal/RecordCompleteModal';
import MenuInfoContainer from './MenuInfoContainer';
import CaffeineComparisonContainer from './CaffeineComparisonContainer';
import LowerCaffeineMenuContainer from './LowerCaffeineMenuContainer';
import FooterGradientButton from '@/components/common/button/FooterGradientButton';
import useModal from '@/hooks/useModal';
import { useRecentlyViewedDrinksStore } from '@/store/recentlyViewedDrinksStore';
import { MenuDetail } from '@/types/menu/menu';
import apiInstance from '@/api/instance';
import useLocalStorage from '@/hooks/useLocalStorage';
import LoginModal from '@/components/common/modal/LoginModal';

const MenuDetailContainer = ({ ...menuDetail }: MenuDetail) => {
  const { addDrinkToRecentlyViewedStore } = useRecentlyViewedDrinksStore();

  const { isOpen: isCompleteModalOpen, openModal: openCompleteModal, closeModal: closeCompleteModal } = useModal();
  const { isOpen: isLoginModalOpen, openModal: openLoginModal, closeModal: closeLoginModal } = useModal();

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
      openCompleteModal();
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
      <RecordCompleteModal
        isOpen={isCompleteModalOpen}
        onClose={closeCompleteModal}
        menuImg={activeMenuDetail.imageUrl}
        menuName={activeMenuDetail.menuName}
      />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
};

export default MenuDetailContainer;
