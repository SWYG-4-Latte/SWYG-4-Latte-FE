import SearchFilter from '@/components/search/SearchFilter';

const SearchResultContainer = () => {
  return (
    <div>
      <div className="flex flex-col gap-3 pb-3 pl-5 pt-4">
        <div className="flex items-end gap-2">
          <div className="font-semibold leading-[22px] text-gray10">검색 결과</div>
          <div className="text-xs text-primaryOrange">0건</div>
        </div>
        <SearchFilter />
      </div>
    </div>
  );
};

export default SearchResultContainer;
