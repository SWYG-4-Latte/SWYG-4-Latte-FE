import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

import { useRecentSearchStore } from '@/store/recentSearchStore';

const RecentSearchItem = ({ word }: { word: string }) => {
  const router = useRouter();

  const deleteRecentSearchWord = useRecentSearchStore((state) => state.deleteSearchWord);

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set('query', word);
    router.replace(`/search?${params.toString()}`, { scroll: false });
  };

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    deleteRecentSearchWord(word);
  };

  return (
    <li
      onClick={handleSearch}
      className="flex h-[50px] cursor-pointer justify-between border-b border-gray04 px-5 py-4 last:border-none"
    >
      <div className="text-sm text-gray08">{word}</div>
      <button onClick={handleDelete}>
        <Image src="/svgs/delete-recent-search.svg" width={16} height={16} alt="최근 검색어 삭제" />
      </button>
    </li>
  );
};

export default RecentSearchItem;
