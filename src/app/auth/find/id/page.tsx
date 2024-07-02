import { Metadata } from 'next';

import FindIdContainer from '@/container/auth/FindIdContainer';

export const metadata: Metadata = {
  title: '아이디 찾기',
};

export default function FindIdPage() {
  return <FindIdContainer />;
}
