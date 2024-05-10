import axios from 'axios';

import BrandListContainer from './BrandListContainer';
import SearchFilter from '@/components/search/SearchFilter';

const MenuFilterContainer = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu/brand`);
  const brandList = data.data;

  return (
    <div className="pt-14">
      <BrandListContainer brandList={brandList} />
      <SearchFilter />
    </div>
  );
};

export default MenuFilterContainer;
