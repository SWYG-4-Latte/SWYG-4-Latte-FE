import type { Metadata } from 'next';
import { Suspense } from 'react';

import SearchMainContainer from '@/container/search/SearchMainContainer';

export async function generateMetadata({ searchParams }: { searchParams: { query?: string } }): Promise<Metadata> {
  const searchWord = searchParams.query;

  return {
    title: {
      absolute: searchWord ? `${searchWord} - 라떼 핏 아티클 검색` : '아티클 검색 | 라떼 핏',
    },
    description: '관심 있는 주제에 관련한 아티클 검색 결과를 보여줍니다.',
    keywords: '검색, 아티클, 검색어',
  };
}

export default function ArticleSearchPage() {
  return (
    <Suspense>
      <SearchMainContainer />
    </Suspense>
  );
}
