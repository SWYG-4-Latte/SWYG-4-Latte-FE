'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

import HomeBanner from '@/components/home/banner/HomeBanner';
import DrinkHistoryContainer from './DrinkHistoryContainer';
import { UserCaffeineData } from '@/types/home/user';
import DrinkRecommendationModal from '@/components/common/modal/DrinkRecommendationModal';
import useModal from '@/hooks/useModal';

const HomeMainContainer = () => {
  const { isOpen, openModal, closeModal } = useModal();

  const [userData, setUserData] = useState<UserCaffeineData | null>(null);

  const isLoggedIn = true;

  const getUserData = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/drink`);

    setUserData(response.data.data);
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
      <DrinkRecommendationModal isRecommendationModal isOpen={isOpen} onClose={closeModal} />
      <HomeBanner caffeineData={isLoggedIn ? userData : null} />
      <DrinkHistoryContainer drinkHistory={isLoggedIn && userData ? userData.recent : []} />
    </>
  );
};

export default HomeMainContainer;
