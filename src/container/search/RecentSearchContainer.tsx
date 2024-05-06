import RecentSearchItem from '@/components/search/RecentSearchItem';
import { useRecentSearchStore } from '@/store/recentSearchStore';

const RecentSearchContainer = () => {
  const recentSearchList = useRecentSearchStore((state) => state.searchList);
  const deleteAllRecentSearch = useRecentSearchStore((state) => state.deleteAllSearchWord);

  return (
    <div className="py-4">
      <div className="mb-4 flex items-center justify-between px-5">
        <div className="font-semibold leading-[22px] text-gray10">최근 검색어</div>
        <button className="text-xs text-primaryOrange" onClick={() => deleteAllRecentSearch()}>
          전체 삭제
        </button>
      </div>
      {recentSearchList.length !== 0 ? (
        recentSearchList.map((word) => <RecentSearchItem key={word} word={word} />)
      ) : (
        <div className="flex h-[152px] items-center justify-center text-sm text-gray06">최근 검색어가 없습니다.</div>
      )}
    </div>
  );
};

export default RecentSearchContainer;
