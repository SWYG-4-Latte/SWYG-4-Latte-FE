'use client';

import { MouseEvent, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import BadgeButton from '../home/drinkRanking/BadgeButton';
import DownArrowIcon from '../common/icons/DownArrowIcon';

/**
 * 선택한 필터
 * 선택안함: null
 * 카페인 포함(함량 많은 순: desc, 적은 순: asc)
 * 카페인 미포함: none
 */
type FilterOption = 'desc' | 'asc' | 'none' | null;

// 검색 결과 화면과 카테고리(menu) 페이지에서 사용
const SearchFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [filterOption, setFilterOption] = useState<FilterOption>(searchParams.get('filter') as FilterOption);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClickDropdownFilter = () => {
    setIsDropdownOpen((prev) => !prev);
    // setFilterOption(null);
  };

  const handleClickNonCaffeineFilter = () => {
    setIsDropdownOpen(false);
    setFilterOption((prev) => (prev === 'none' ? null : 'none'));
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
      params.set('filter', filterOption);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [filterOption]);

  const isDropdownSelected = isDropdownOpen || (filterOption !== null && filterOption !== 'none');

  return (
    <div className="flex gap-2 px-5 py-3">
      <BadgeButton
        className={isDropdownOpen ? 'relative rounded-b-none border-b-0' : ''}
        selected={isDropdownSelected}
        onClick={handleClickDropdownFilter}
      >
        <div className="flex items-center gap-1">
          {!filterOption || filterOption === 'none'
            ? '카페인 포함'
            : filterOption === 'desc'
              ? '함량 많은 순'
              : '함량 적은 순'}
          <DownArrowIcon
            className={`transition-transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'} ${isDropdownSelected ? 'text-primaryOrange' : 'text-gray08'}`}
          />
        </div>
        {isDropdownOpen && (
          <div className="absolute left-[-1px] right-[-1px] top-full z-10 overflow-hidden text-xs text-gray08">
            <div className="w-full animate-dropdown rounded-b-md border-x border-b border-primaryOrange bg-primaryIvory">
              <div
                className="flex h-[30px] items-center justify-center border-t border-primaryBeige px-4 py-2"
                onClick={(e) => handleClickDropdownOption(e, 'desc')}
              >
                함량 많은 순
              </div>
              <div
                className="flex h-[30px] items-center justify-center rounded-b-md border-t border-primaryBeige px-4 py-2"
                onClick={(e) => handleClickDropdownOption(e, 'asc')}
              >
                함량 적은 순
              </div>
            </div>
          </div>
        )}
      </BadgeButton>
      <BadgeButton selected={filterOption === 'none'} onClick={handleClickNonCaffeineFilter}>
        카페인 미포함
      </BadgeButton>
    </div>
  );
};

export default SearchFilter;
