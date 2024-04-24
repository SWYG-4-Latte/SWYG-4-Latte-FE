import FooterGradientButton from '@/components/common/button/FooterGradientButton';
import CaffeineComparisonContainer from '@/container/menuDetail/CaffeineComparisonContainer';
import MenuInfoContainer from '@/container/menuDetail/MenuInfoContainer';
import { Menu } from '@/types/home/menu';

const SAMPLE_MENU = {
  menuNo: 312,
  brand: '빽다방',
  menuName: '토피넛라떼(ICED)',
  caffeine: '카페인 51mg',
  price: '3500원',
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
  const menuNo = params.menuNo;
  const menu = SAMPLE_MENU;

  return (
    <div className="pt-14">
      <MenuInfoContainer menu={menu} />
      <CaffeineComparisonContainer menu={menu} />
      <FooterGradientButton>오늘 마신 카페인으로 기록하기</FooterGradientButton>
    </div>
  );
}
