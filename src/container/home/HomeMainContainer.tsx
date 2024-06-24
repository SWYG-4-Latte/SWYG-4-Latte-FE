'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import HomeBanner from '@/components/home/banner/HomeBanner';
import DrinkHistoryContainer from './DrinkHistoryContainer';
import { UserCaffeineData } from '@/types/home/user';
import useModal from '@/hooks/useModal';
import apiInstance from '@/api/instance';

dayjs.extend(isBetween);

const HomeMainContainer = () => {
  const { openModal } = useModal('recommendation');

  const [userData, setUserData] = useState<UserCaffeineData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = typeof window === 'undefined' ? null : localStorage.getItem('accessToken');

  const getUserData = async () => {
    const { data } = await apiInstance.get('/drink');

    setUserData(data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setIsLoading(false);
      return;
    }

    getUserData();

    // 시간대별 모달 출력: 시연 영상 촬영하기 위해 잠시 주석 처리

    // 12시 30분부터 5시 사이에 음료 추천 모달 띄움
    // const modalVisible = dayjs().isBetween(
    //   dayjs().startOf('day').add(12, 'hour').add(30, 'minute'),
    //   dayjs().startOf('day').add(17, 'hour'),
    // );
    const hideModalTime = localStorage.getItem('hideModal');

    // if (!modalVisible) return;

    if (!hideModalTime || (hideModalTime && +hideModalTime < +dayjs())) {
      openModal();
    }
  }, [isLoggedIn, openModal]);

  return (
    <>
      <HomeBanner caffeineData={userData} isLoading={isLoading} />
      <DrinkHistoryContainer drinkHistory={isLoggedIn && userData ? userData.recent : []} isLoading={isLoading} />
    </>
  );
};

export default HomeMainContainer;
