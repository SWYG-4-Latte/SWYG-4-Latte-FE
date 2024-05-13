import MenuListContainer from './MenuListContainer';
import { getMenuList } from '@/api/drinks';

interface CategoryMainContainerProps {
  brand: string;
  filter: string;
}

const CategoryMainContainer = async ({ brand, filter }: CategoryMainContainerProps) => {
  const data = await getMenuList(brand, filter, 0);

  return (
    <div className="pb-20">
      <MenuListContainer brand={brand} filter={filter} initialData={data} />
    </div>
  );
};

export default CategoryMainContainer;
