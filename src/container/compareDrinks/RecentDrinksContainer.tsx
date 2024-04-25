import DrinkItem from '@/components/common/drink/DrinkItem';

const recentDrinks = [
  {
    menuNo: 154,
    menuName: '(EX) ICED 흑당 라떼',
    imageUrl: 'https://www.ediya.com/files/menu/IMG_1647322029671.png',
  },
  {
    menuNo: 276,
    menuName: '콜드브루라떼(흑당)(HOT)',
    imageUrl: 'https://paikdabang.com/wp-content/uploads/2023/02/콜드브루흑당라떼HOT-450x588.png',
  },
  {
    menuNo: 332,
    menuName: '레몬얼그레이티(HOT)',
    imageUrl: 'https://paikdabang.com/wp-content/uploads/2018/06/HOT-레몬얼그레이티-450x588.png',
  },
  {
    menuNo: 401,
    menuName: '에스프레소 콘 파나',
    imageUrl: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[30]_20210415144252244.jpg',
  },
];

const RecentDrinksContainer = () => {
  return (
    <div className="bg-gray02 px-5 pb-[30px] pt-4">
      <div className="flex items-center justify-between">
        <div className="font-medium text-gray10">최근 확인한 음료</div>
        <button className="flex h-[30px] items-center whitespace-nowrap rounded-md border border-gray05 px-4 py-2 text-xs text-gray08">
          다른 음료 더보기
        </button>
      </div>

      <div className="mt-3 flex justify-between">
        {recentDrinks.map((menu) => (
          <DrinkItem key={menu.menuNo} menuName={menu.menuName} imageUrl={menu.imageUrl} />
        ))}
      </div>
    </div>
  );
};

export default RecentDrinksContainer;
