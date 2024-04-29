import { useEffect, useState } from 'react';

import PopularSearchItem from '@/components/search/PopularSearchItem';

const PopularSearchContainer = () => {
  const today = new Date();
  const [popularSearchList, setPopularSearchList] = useState([
    {
      rank: 1,
      word: '아메리카노',
    },
    {
      rank: 2,
      word: '바나나',
    },
    {
      rank: 3,
      word: '녹차',
    },
    {
      rank: 4,
      word: '커피',
    },
    {
      rank: 5,
      word: '라떼',
    },
  ]);

  useEffect(() => {
    const getPopularSearchList = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/menu/ranking/word');
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    // getPopularSearchList();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 py-4 pl-5">
        <div className="font-semibold leading-[22px] text-gray10">인기 검색어</div>
        <div className="text-xs text-primaryOrange">
          {today.getFullYear()}년 {today.getMonth() + 1}월 {today.getDate()}일 기준
        </div>
      </div>
      {popularSearchList.map((popularSearch) => (
        <PopularSearchItem key={popularSearch.rank} rank={popularSearch.rank} word={popularSearch.word} />
      ))}
    </>
  );
};

export default PopularSearchContainer;
