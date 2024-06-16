import { Metadata } from 'next';

import FindPasswordContainer from '@/container/auth/FindPasswordContainer';

export const metadata: Metadata = {
  title: '비밀번호 찾기',
};

export default function FindPasswordPage() {
  return <FindPasswordContainer></FindPasswordContainer>;
}
