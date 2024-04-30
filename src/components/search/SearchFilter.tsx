import { MouseEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import BadgeButton from '../home/drinkRanking/BadgeButton';
import DownArrowIcon from '../common/icons/DownArrowIcon';

/**
 * 선택한 필터
 * 선택안함: null
 * 카페인 포함(함량 많은 순: DESC, 적은 순: ASC)
 * 카페인 미포함: NONE
 */
type FilterOption = 'DESC' | 'ASC' | 'NONE' | null;

const FILTER_QUERY_KEY = {
  DESC: 'caffeine-decs',
  ASC: 'caffeine-asc',
  NONE: 'caffeine-none',
};

const SearchFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filterOption, setFilterOption] = useState<FilterOption>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClickDropdownFilter = () => {
    setIsDropdownOpen((prev) => !prev);
    setFilterOption(null);
  };

  const handleClickNonCaffeineFilter = () => {
    setIsDropdownOpen(false);
    setFilterOption((prev) => (prev === 'NONE' ? null : 'NONE'));
  };

  const handleClickDropdownOption = (event: MouseEvent, option: FilterOption) => {
    event.stopPropagation();
    setFilterOption(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (!filterOption) {
      params.delete('filter');
    } else {
      params.set('filter', FILTER_QUERY_KEY[filterOption]);
    }

    router.replace(`/search?${params.toString()}`, { scroll: false });
  }, [filterOption]);

  const isDropdownSelected = isDropdownOpen || (filterOption !== null && filterOption !== 'NONE');

  return (
    <div className="flex gap-2">
      <BadgeButton
        className={isDropdownOpen ? 'relative rounded-b-none border-b-0' : ''}
        selected={isDropdownSelected}
        onClick={handleClickDropdownFilter}
      >
        <div className="flex items-center gap-1">
          {!filterOption || filterOption === 'NONE'
            ? '카페인 포함'
            : filterOption === 'DESC'
              ? '함량 많은 순'
              : '함량 적은 순'}
          <DownArrowIcon
            className={`transition-transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'} ${isDropdownSelected ? 'text-primaryOrange' : 'text-gray08'}`}
          />
        </div>
        {isDropdownOpen && (
          <div className="absolute left-[-1px] right-[-1px] top-full overflow-hidden text-xs text-gray08">
            <div className="animate-dropdown w-full rounded-b-md border-x border-b border-primaryOrange bg-primaryIvory">
              <div
                className="flex h-[30px] items-center justify-center border-t border-primaryBeige px-4 py-2"
                onClick={(e) => handleClickDropdownOption(e, 'DESC')}
              >
                함량 많은 순
              </div>
              <div
                className="flex h-[30px] items-center justify-center rounded-b-md border-t border-primaryBeige px-4 py-2"
                onClick={(e) => handleClickDropdownOption(e, 'ASC')}
              >
                함량 적은 순
              </div>
            </div>
          </div>
        )}
      </BadgeButton>
      <BadgeButton selected={filterOption === 'NONE'} onClick={handleClickNonCaffeineFilter}>
        카페인 미포함
      </BadgeButton>
    </div>
  );
};

export default SearchFilter;
