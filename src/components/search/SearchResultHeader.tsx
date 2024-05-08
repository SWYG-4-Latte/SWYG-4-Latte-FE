import { useState } from 'react';

import SearchFilter from './SearchFilter';
import Tooltip from '../common/Tooltip';

const SearchResultHeader = ({ totalResults }: { totalResults: number }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 px-5 pb-3 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-end gap-2">
          <div className="font-semibold leading-[22px] text-gray10">검색 결과</div>
          <div className="text-xs text-primaryOrange">{totalResults}건</div>
        </div>
        <div className="relative">
          <button onClick={() => setIsTooltipOpen(true)} className="text-gray06">
            ⓘ
          </button>
          {isTooltipOpen && (
            <Tooltip onClose={() => setIsTooltipOpen(false)}>
              사이즈별 카페인 함량은
              <br />
              음료를 선택하면 확인 가능해요.
            </Tooltip>
          )}
        </div>
      </div>
      <SearchFilter />
    </div>
  );
};

export default SearchResultHeader;
