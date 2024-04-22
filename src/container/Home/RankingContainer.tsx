import BrandSwiper from '@/components/Brand/BrandSwiper';

const RankingContainer = () => {
  const brandList = [
    {
      name: '스타벅스',
      img: 'src',
    },
    {
      name: '투썸플레이스',
      img: 'src',
    },
    {
      name: '빽다방',
      img: 'src',
    },
    {
      name: '컴포즈커피',
      img: 'src',
    },
    {
      name: '이디야',
      img: 'src',
    },
  ];

  return (
    <div className="flex flex-col bg-gray02 pt-4">
      <div className="mb-4 pl-5 font-semibold text-gray10">카페 브랜드별 랭킹</div>
      <BrandSwiper slideData={brandList} />
    </div>
  );
};

export default RankingContainer;
