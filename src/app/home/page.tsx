'use client'

import HomeMainContainer from '@/container/home/HomeMainContainer';
import RankingContainer from '@/container/home/RankingContainer';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

import useLoginStore from '@/store/loginStore';

export default function HomePage() {
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

  return (
    <div className="pt-14">
      <HomeMainContainer />
      <RankingContainer />
    </div>
  );
}
