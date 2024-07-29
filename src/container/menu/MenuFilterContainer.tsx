import BrandListContainer from './BrandListContainer';

import apiInstance from '@/api/instance';
import CategoryFilter from '@/components/menu/CategoryFilter';
import CaffeineFilter from '@/components/search/CaffeineFilter';

const MenuFilterContainer = async () => {
  const {
    data: { data: brandList },
  } = await apiInstance.get('/menu/brand');

  return (
    <section className="pt-14">
      <BrandListContainer brandList={brandList} />
      <div className="border-b-[1px] border-b-gray04 bg-gray03">
        <CategoryFilter />
        <CaffeineFilter />
      </div>
    </section>
  );
};

export default MenuFilterContainer;
