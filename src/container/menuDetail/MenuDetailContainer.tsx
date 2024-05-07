'use client';

import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import RecordCompleteModal from '@/components/common/modal/RecordCompleteModal';
import MenuInfoContainer from './MenuInfoContainer';
import CaffeineComparisonContainer from './CaffeineComparisonContainer';
import LowerCaffeineMenuContainer from './LowerCaffeineMenuContainer';
import FooterGradientButton from '@/components/common/button/FooterGradientButton';
import useModal from '@/hooks/useModal';
import { useRecentlyViewedDrinksStore } from '@/store/recentlyViewedDrinksStore';
import { MenuDetail } from '@/types/home/menu';

const MenuDetailContainer = ({ ...menuDetail }: MenuDetail) => {
  const { menuNo, lowCaffeineMenus } = menuDetail;

  const { addDrinkToRecentlyViewedStore } = useRecentlyViewedDrinksStore();
  const { isOpen, openModal, closeModal } = useModal();

  const handleRecord = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/drink/date/menu`, {
        menuNo,
      });
      openModal();
    } catch (error) {
      toast('마신 메뉴 등록에 실패했습니다.');
    }
  };

  useEffect(() => {
    addDrinkToRecentlyViewedStore(menuNo);
  }, []);

  return (
    <div>
      <RecordCompleteModal
        isOpen={isOpen}
        onClose={closeModal}
        menuImg={menuDetail.imageUrl}
        menuName={menuDetail.menuName}
      />
      <div className="pb-24 pt-14">
        <MenuInfoContainer menu={menuDetail} />
        <CaffeineComparisonContainer menu={menuDetail} />
        <LowerCaffeineMenuContainer menus={lowCaffeineMenus} />
        <FooterGradientButton onClick={handleRecord}>오늘 마신 카페인으로 기록하기</FooterGradientButton>
      </div>
    </div>
  );
};

export default MenuDetailContainer;
