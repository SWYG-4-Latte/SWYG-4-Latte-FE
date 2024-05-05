import { useEffect, useState } from 'react';
import axios from 'axios';

import RankingListItem from './RankingListItem';
import { BRAND_NAME } from '@/constants/home/brandName';
import { Menu } from '@/types/home/menu';
import RankingListSkeleton from '@/components/common/skeleton/RankingListSkeleton';

const RankingList = ({ selectedBrand }: { selectedBrand: string }) => {
  const [rankingData, setRankingData] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRankingData = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu/ranking/${BRAND_NAME[selectedBrand]}`);

      setRankingData(response.data.data);
      setIsLoading(false);
    };

    getRankingData();
  }, [selectedBrand]);

  return (
    <ul>
      {isLoading && <RankingListSkeleton />}
      {!isLoading && rankingData.map((menu, idx) => <RankingListItem key={menu.menuNo} ranking={idx + 1} {...menu} />)}
    </ul>
  );
};

export default RankingList;
