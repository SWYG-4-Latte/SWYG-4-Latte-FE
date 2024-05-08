'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import PopularSearchItem from '@/components/search/PopularSearchItem';
import { formatPopularSearchStandardDate } from '@/utils/date';

export interface PopularSearchWord {
  rank: number;
  word: string;
}

const PopularSearchContainer = () => {
  const today = new Date();
  const [popularSearchList, setPopularSearchList] = useState<PopularSearchWord[]>([]);

  useEffect(() => {
    const getPopularSearchList = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu/ranking/word`);

        setPopularSearchList(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getPopularSearchList();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 py-4 pl-5">
        <div className="font-semibold leading-[22px] text-gray10">인기 검색어</div>
        <div className="text-xs text-primaryOrange">{formatPopularSearchStandardDate(today)} 기준</div>
      </div>
      {popularSearchList.map((popularSearch) => (
        <PopularSearchItem key={popularSearch.rank} rank={popularSearch.rank} word={popularSearch.word} />
      ))}
    </>
  );
};

export default PopularSearchContainer;
