import Image from 'next/image';

import { useRecentSearchStore } from '@/store/recentSearchStore';

const RecentSearchItem = ({ word }: { word: string }) => {
  const deleteRecentSearchWord = useRecentSearchStore((state) => state.deleteSearchWord);

  return (
    <li className="flex justify-between border-b border-gray04 px-5 py-4 last:border-none">
      <div className="text-sm text-gray08">{word}</div>
      <button onClick={() => deleteRecentSearchWord(word)}>
        <Image src="/svgs/delete-recent-search.svg" width={16} height={16} alt="최근 검색어 삭제" />
      </button>
    </li>
  );
};

export default RecentSearchItem;
