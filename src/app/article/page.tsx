import { Metadata } from 'next';

import ArticleContainer from '@/container/article/ArticleContainer';
import BottomNavigation from '@/components/common/bottomNavigation/BottomNavigation';

export const metadata: Metadata = {
  title: '아티클',
  description:
    '사람들이 잘 모르는 카페인 관련한 정보를 아티클로 읽을 수 있습니다. 아티클 내 댓글을 달며 소통할 수 있습니다.',
  keywords: '아티클, 카페인, 댓글, 좋아요, 추천',
};

export default function ArticlePage() {
  return (
    <div>
      <ArticleContainer />
      <BottomNavigation />
    </div>
  );
}
