import BrandListContainer from './BrandListContainer';
import SearchFilter from '@/components/search/SearchFilter';
import apiInstance from '@/api/instance';

const MenuFilterContainer = async () => {
  const { data } = await apiInstance.get('/menu/brand');
  const brandList = data.data;

  return (
    <div className="pt-14">
      <BrandListContainer brandList={brandList} />
      <SearchFilter />
    </div>
  );
};

export default MenuFilterContainer;
