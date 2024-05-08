'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import HomeBanner from '@/components/home/banner/HomeBanner';
import DrinkHistoryContainer from './DrinkHistoryContainer';
import { UserCaffeineData } from '@/types/home/user';

const HomeMainContainer = () => {
  const [userData, setUserData] = useState<UserCaffeineData | null>(null);
  const isLoggedIn = true;

  useEffect(() => {
    const getUserData = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/drink`);

      setUserData(response.data.data);
    };

    getUserData();
  }, []);

  return (
    <>
      <HomeBanner caffeineData={isLoggedIn ? userData : null} />
      <DrinkHistoryContainer drinkHistory={isLoggedIn && userData ? userData.recent : []} />
    </>
  );
};

export default HomeMainContainer;
