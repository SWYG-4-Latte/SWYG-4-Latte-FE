'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

import HomeBanner from '@/components/home/banner/HomeBanner';
import DrinkHistoryContainer from './DrinkHistoryContainer';
import { UserCaffeineData } from '@/types/home/user';
import useModal from '@/hooks/useModal';
import apiInstance from '@/api/instance';
import useLocalStorage from '@/hooks/useLocalStorage';

const HomeMainContainer = () => {
  const { openModal } = useModal('recommendation');

  const [userData, setUserData] = useState<UserCaffeineData | null>(null);

  const isLoggedIn = !!useLocalStorage('accessToken');

  const getUserData = async () => {
    const { data } = await apiInstance.get('/drink');

    setUserData(data);
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    getUserData();

    // 12시 30분부터 5시 사이에 음료 추천 모달 띄움
    const modalVisible = dayjs().isBetween(
      dayjs().startOf('day').add(12, 'hour').add(30, 'minute'),
      dayjs().startOf('day').add(17, 'hour'),
    );
    const hideModalTime = localStorage.getItem('hideModal');

    if (!modalVisible) return;

    if (!hideModalTime || (hideModalTime && +hideModalTime < +dayjs())) {
      openModal();
    }
  }, [isLoggedIn]);

  return (
    <>
      <HomeBanner caffeineData={isLoggedIn ? userData : null} />
      <DrinkHistoryContainer drinkHistory={isLoggedIn && userData ? userData.recent : []} />
    </>
  );
};

export default HomeMainContainer;
