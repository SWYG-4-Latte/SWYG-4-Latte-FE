'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

import RecordCompleteModal from '@/components/common/modal/RecordCompleteModal';
import MenuInfoContainer from './MenuInfoContainer';
import CaffeineComparisonContainer from './CaffeineComparisonContainer';
import LowerCaffeineMenuContainer from './LowerCaffeineMenuContainer';
import FooterGradientButton from '@/components/common/button/FooterGradientButton';
import useModal from '@/hooks/useModal';
import { useRecentlyViewedDrinksStore } from '@/store/recentlyViewedDrinksStore';
import { MenuDetail } from '@/types/menu/menu';

const MenuDetailContainer = ({ ...menuDetail }: MenuDetail) => {
  const { addDrinkToRecentlyViewedStore } = useRecentlyViewedDrinksStore();
  const { isOpen, openModal, closeModal } = useModal();

  const searchParams = useSearchParams();
  const size = searchParams.get('size');
  const [activeMenuDetail, setActiveMenuDetail] = useState(menuDetail);

  const { menuNo, lowCaffeineMenus } = activeMenuDetail;

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
    const getMenuDetailBySize = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu/detail/${menuNo}`, {
        params: {
          menu_size: size,
        },
      });
      setActiveMenuDetail(response.data.data);
    };
    if (size) {
      getMenuDetailBySize();
    }
  }, [size]);

  useEffect(() => {
    addDrinkToRecentlyViewedStore(menuNo);
  }, []);

  return (
    <div>
      <RecordCompleteModal
        isOpen={isOpen}
        onClose={closeModal}
        menuImg={activeMenuDetail.imageUrl}
        menuName={activeMenuDetail.menuName}
      />
      <div className="pb-24 pt-14">
        <MenuInfoContainer menu={activeMenuDetail} />
        <CaffeineComparisonContainer menu={activeMenuDetail} />
        <LowerCaffeineMenuContainer menus={lowCaffeineMenus} />
        <FooterGradientButton onClick={handleRecord}>오늘 마신 카페인으로 기록하기</FooterGradientButton>
      </div>
    </div>
  );
};

export default MenuDetailContainer;
