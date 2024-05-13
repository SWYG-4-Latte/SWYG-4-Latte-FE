'use client'
import axios from 'axios';

import HomeMainContainer from '@/container/home/HomeMainContainer';
import RankingContainer from '@/container/home/RankingContainer';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

import useLoginStore from '@/store/loginStore';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { isLoggedIn }= useLoginStore()
  console.log(isLoggedIn)
  const accessToken = localStorage.getItem('accessToken')

  useEffect(()=>{
    if(accessToken) {
      toast('로그인 되었습니다.', {
        toastId: 'login-success'
      })
    }

    if(!accessToken) {
      toast('로그아웃 되었습니다.', {
        toastId: 'logout-success'
      })
    }
  },[accessToken])

  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu/brand`);
  const brandList = data.data;

  return (
    <div className="pt-14">
      <HomeMainContainer />
      <RankingContainer brandList={brandList} />
    </div>
  );
}
