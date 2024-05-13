import type { Viewport } from 'next';

import SearchMainContainer from '@/container/search/SearchMainContainer';

export const dynamic = 'force-dynamic';

export const viewport: Viewport = {
  userScalable: false,
};

export default function SearchPage() {
  return (
    <>
      <SearchMainContainer />
    </>
  );
}
