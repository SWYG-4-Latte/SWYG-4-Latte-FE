'use client';

import { useState } from 'react';

import BrandSwiper from '@/components/home/BrandSwiper';
import BadgeButton from '@/components/home/drinkRanking/BadgeButton';
import { BADGE_TEXT } from '@/constants/home/filterBadge';
import RankingList from '@/components/home/drinkRanking/RankingList';

const brandList = [
  {
    brandName: '스타벅스',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png',
  },
  {
    brandName: '컴포즈',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvli9CjxHPgJxDR1IbUhk35awK3TOLEt5e1qTc-3ijCQ&s',
  },
  {
    brandName: '투썸',
    imageUrl: 'https://www.twosome.co.kr/resources/images/content/bi_img_logo_.svg',
  },
  {
    brandName: '빽다방',
    imageUrl:
      'https://scontent-gmp1-1.xx.fbcdn.net/v/t39.30808-1/327294194_929628688477291_6295134427025366399_n.png?stp=dst-png_p200x200&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=FQWfDu-IezcAb4WWJNr&_nc_oc=Adig29tvYscarzzP3LQS2iC9Vtl77Ou03VRUeSynceYUrYtFs9PdjBPU19-GaymrjtU&_nc_ht=scontent-gmp1-1.xx&oh=00_AfDZ8tNL14th8svkRKFOobFJaPKbFQjEAbeJGms-LP2GOg&oe=662C2B81',
  },
  {
    brandName: ' 이디야',
    imageUrl: 'https://ediyastore.com/web/upload/goodymall/kr/main/logo01.png',
  },
];

const rankingData = [
  {
    menuNo: 390,
    menuName: '오트 콜드 브루',
    brand: '스타벅스',
    caffeine: '65mg',
    imageUrl: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000003285]_20210416154437069.jpg',
  },
  {
    menuNo: 400,
    menuName: '아이스 슈크림 라떼',
    brand: '스타벅스',
    caffeine: '75mg',
    imageUrl: 'https://image.istarbucks.co.kr/upload/store/skuimg/2024/03/[9200000000418]_20240327144723352.jpg',
  },
  {
    menuNo: 399,
    menuName: '슈크림 라떼',
    brand: '스타벅스',
    caffeine: '75mg',
    imageUrl: 'https://image.istarbucks.co.kr/upload/store/skuimg/2024/03/[9200000000415]_20240327144033044.jpg',
  },
];

const RankingContainer = () => {
  const [selectedButtonIdx, setSelectedButtonIdx] = useState<number>(0);

  const handleClick = (idx: number) => {
    /** 필터링 기능 추가 */
    setSelectedButtonIdx(idx);
  };

  return (
    <div className="flex flex-col">
      <div className="my-4 pl-5 font-semibold text-gray10">카페 브랜드별 랭킹</div>
      <BrandSwiper slideData={brandList} />
      <div className="my-4 inline-flex gap-2 pl-5">
        {BADGE_TEXT.map((filterName, idx) => (
          <BadgeButton key={filterName} selected={selectedButtonIdx === idx} onClick={() => handleClick(idx)}>
            {filterName}
          </BadgeButton>
        ))}
      </div>
      <RankingList rankingData={rankingData} />
    </div>
  );
};

export default RankingContainer;
