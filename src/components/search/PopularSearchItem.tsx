import { useRouter } from 'next/navigation';

import { PopularSearchWord } from '@/container/search/PopularSearchContainer';

const PopularSearchItem = ({ rank, word }: PopularSearchWord) => {
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set('query', word);
    router.replace(`/search?${params.toString()}`, { scroll: false });
  };

  return (
    <div
      className="flex h-[50px] cursor-pointer items-center gap-4 border-b border-gray04 px-5 py-4 last:border-none"
      onClick={handleSearch}
    >
      <div className="font-semibold text-gray10">{rank}</div>
      <div className="text-sm text-gray08">{word}</div>
    </div>
  );
};

export default PopularSearchItem;
