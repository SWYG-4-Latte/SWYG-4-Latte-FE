'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import NavigationHeader from '@/components/common/header/NavigationHeader';
import TodayCaffeineContainer from '@/container/todayCaffeine/TodayCaffeineContainer';
import apiInstance from '@/api/instance';
import { Menu } from '@/types/menu/menu';
import useLocalStorage from '@/hooks/useLocalStorage';

export default function TodayCaffeinePage() {
  const isLoggedIn = !!useLocalStorage('accessToken');

  const [todayCaffeineData, setTodayCaffeineData] = useState<Menu[]>([]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const getTodayData = async () => {
      const { data } = await apiInstance.get('/drink/date/menu', {
        params: {
          datetime: dayjs().format('YYYY-MM-DDT00:00:00'),
        },
      });

      setTodayCaffeineData(data.data);
    };

    getTodayData();
  }, [isLoggedIn]);

  return (
    <>
      <NavigationHeader title="오늘 마신 카페인" />
      <TodayCaffeineContainer data={todayCaffeineData} />
    </>
  );
}
