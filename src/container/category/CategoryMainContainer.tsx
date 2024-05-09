import axios from 'axios';

import MenuListContainer from './MenuListContainer';

interface CategoryMainContainerProps {
  brand: string;
  filter: string;
}

const CategoryMainContainer = async ({ brand, filter }: CategoryMainContainerProps) => {
  // const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu/${brand}`, {
  //   params: {
  //     page: 0,
  //     size: 12,
  //     sortBy: filter && filter !== 'none' ? 'caffeine-' + filter : null,
  //     cond: filter && filter === 'none' ? 'caffeine-' + filter : null,
  //   },
  // });

  return <div>{/* <MenuListContainer brand={brand} filter={filter} initialData={data.data} /> */}</div>;
};

export default CategoryMainContainer;
