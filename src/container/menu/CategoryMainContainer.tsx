import MenuListContainer from './MenuListContainer';
import { getMenuList } from '@/api/drinks';

interface CategoryMainContainerProps {
  brand: string;
  filter: string;
  category: string;
}

const CategoryMainContainer = async ({ brand, filter, category }: CategoryMainContainerProps) => {
  const data = await getMenuList(brand, category, filter, 0);

  return (
    <div className="pb-20">
      <MenuListContainer brand={brand} category={category} filter={filter} initialData={data} />
    </div>
  );
};

export default CategoryMainContainer;
