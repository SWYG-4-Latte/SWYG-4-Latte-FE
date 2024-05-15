import type { Viewport } from 'next';

import SearchMainContainer from '@/container/search/SearchMainContainer';

export const viewport: Viewport = {
  userScalable: false,
};

export default function ArticleSearchPage() {
  return (
    <>
      <SearchMainContainer />
    </>
  );
}
