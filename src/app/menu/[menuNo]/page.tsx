'use client';

import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import FooterGradientButton from '@/components/common/button/FooterGradientButton';
import NavigationHeader from '@/components/common/header/NavigationHeader';
import RecordCompleteModal from '@/components/common/modal/RecordCompleteModal';
import CaffeineComparisonContainer from '@/container/menuDetail/CaffeineComparisonContainer';
import LowerCaffeineMenuContainer from '@/container/menuDetail/LowerCaffeineMenuContainer';
import MenuInfoContainer from '@/container/menuDetail/MenuInfoContainer';
import useModal from '@/hooks/useModal';
import { useRecentlyViewedDrinksStore } from '@/store/recentlyViewedDrinksStore';

const SAMPLE_MENU = {
  menuNo: 312,
  brand: '빽다방',
  menuName: '토피넛라떼(ICED)',
  caffeine: '카페인 51mg',
  price: 3500,
  nutrient: {
    kcal: '469kcal',
    sugar: '16g',
    salt: '197mg',
    protein: '8g',
    satFat: '14g',
  },
  imageUrl: 'https://paikdabang.com/wp-content/uploads/2018/06/ICED-토피넛라떼-450x588.png',
  lowCaffeineMenus: [
    {
      menuNo: 34,
      menuName: 'ICE 쿠키초코라떼',
      imageUrl: 'https://composecoffee.com/files/thumbnails/730/038/384x530.crop.jpg?t=1705464297',
    },
    {
      menuNo: 49,
      menuName: '팥절미 밀크쉐이크',
      imageUrl: 'https://composecoffee.com/files/thumbnails/325/384x530.crop.jpg?t=1705466468',
    },
    {
      menuNo: 216,
      menuName: '골드키위주스',
      imageUrl: 'https://www.ediya.com/files/menu/IMG_1647324243707.png',
    },
    {
      menuNo: 342,
      menuName: '레모네이드(ICED)',
      imageUrl: 'https://paikdabang.com/wp-content/uploads/2018/06/레모네이드-450x588.png',
    },
  ],
};

export default function MenuDetailPage({ params }: { params: { menuNo: string } }) {
  const menuNo = Number(params.menuNo);
  const menu = SAMPLE_MENU;

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
    <main>
      <NavigationHeader />
      <RecordCompleteModal isOpen={isOpen} onClose={closeModal} menuImg={menu.imageUrl} menuName={menu.menuName} />
      <div className="pb-24 pt-14">
        <MenuInfoContainer menu={menu} />
        <CaffeineComparisonContainer menu={menu} />
        <LowerCaffeineMenuContainer menus={menu.lowCaffeineMenus} />
        <FooterGradientButton onClick={handleRecord}>오늘 마신 카페인으로 기록하기</FooterGradientButton>
      </div>
    </main>
  );
}
