import FindIdContainer from '@/container/auth/FindIdContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '아이디 찾기',
};

export default function FindIdPage() {
  return <FindIdContainer />;
}
