import type { Metadata } from 'next';

import SearchMainContainer from '@/container/search/SearchMainContainer';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: { searchParams: { query?: string } }): Promise<Metadata> {
  const searchWord = searchParams.query;

  return {
    title: {
      absolute: searchWord ? `${searchWord} - 라떼 핏 음료 검색` : '검색 | 라떼 핏',
    },
    description:
      '찾고 싶은 음료 명을 검색할 수 있고, 검색어를 포함한 검색 결과를 카페인 함량 정도에 따라 정렬할 수 있습니다.',
    keywords: '검색, 검색어, 음료 명, 카페인 많은 순, 카페인 적은 순',
  };
}

export default function SearchPage() {
  return (
    <>
      <SearchMainContainer />
    </>
  );
}
