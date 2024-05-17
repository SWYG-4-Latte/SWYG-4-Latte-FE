import type { Viewport } from 'next';
import { Suspense } from 'react';

import SearchMainContainer from '@/container/search/SearchMainContainer';

export const viewport: Viewport = {
  userScalable: false,
};

export default function ArticleSearchPage() {
  return (
    <Suspense>
      <SearchMainContainer />
    </Suspense>
  );
}
