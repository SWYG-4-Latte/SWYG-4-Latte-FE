import Image from 'next/image';

import NutrientInfo from '@/components/menuDetail/NutrientInfo';

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

const MenuInfoContainer = ({ menuNo }: { menuNo: number }) => {
  // TODO: meunNo으로 상세 정보 조회하기
  const menuData = SAMPLE_MENU;

  return (
    <div>
      <div className="flex h-[260px] items-center justify-center overflow-hidden">
        <Image
          src={menuData.imageUrl}
          priority
          width={0}
          height={0}
          sizes="100vw"
          className="h-full w-[360px]"
          alt={menuData.menuName}
        />
      </div>
      <div className="flex-col bg-primaryIvory px-5 py-4">
        <div className="text-xs text-primaryOrange">{menuData.brand}</div>
        <div className="my-2">
          <div className="text-[22px] font-semibold leading-[30px] text-gray10">{menuData.menuName}</div>
          <div className="my-2">
            <div className="flex items-center font-medium text-gray08">
              <div>{menuData.caffeine}</div>
              <div className="mx-2 h-3 w-px bg-[#D9D9D9]" />
              <div>{menuData.price}</div>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray08">
            하루 적정 카페인 섭취량의
            <div className="mx-[5px] flex w-fit items-center justify-center rounded bg-primaryBeige px-2 py-1 text-orange09">
              20%
            </div>
            를 차지해요
          </div>
        </div>
      </div>
      <NutrientInfo nutrient={menuData.nutrient} />
    </div>
  );
};

export default MenuInfoContainer;
