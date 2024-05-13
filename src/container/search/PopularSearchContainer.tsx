'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

import PopularSearchItem from '@/components/search/PopularSearchItem';

export interface PopularSearchWord {
  rank: number;
  word: string;
}

const PopularSearchContainer = () => {
  const [popularSearchList, setPopularSearchList] = useState<PopularSearchWord[]>([]);

  useEffect(() => {
    const getPopularSearchList = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu/ranking/word`);

        setPopularSearchList(data.data);
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
        <div className="text-xs text-primaryOrange">{dayjs().format('YYYY년 MM월 DD일 A hh:mm')} 기준</div>
      </div>
      {popularSearchList.map((popularSearch) => (
        <PopularSearchItem key={popularSearch.rank} rank={popularSearch.rank} word={popularSearch.word} />
      ))}
    </>
  );
};

export default PopularSearchContainer;
