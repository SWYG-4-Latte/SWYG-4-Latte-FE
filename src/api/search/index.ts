import { MENU_PER_PAGE } from '@/constants/menu/menuList';
import apiInstance from '../instance';

export const getDrinkSearchResult = async (query: string, filter: string | null | undefined, page: number) => {
  const { data } = await apiInstance.get('/menu/list', {
    params: {
      page,
      word: query,
      size: MENU_PER_PAGE,
      sortBy: filter && filter !== 'none' ? 'caffeine-' + filter : null,
      cond: filter && filter === 'none' ? 'caffeine-' + filter : null,
    },
  });

  return data.data;
};

export const getArticleSearchResult = async (query: string | null, page: number, size = 4) => {
  const { data } = await apiInstance.get('/article/list', {
    params: {
      page,
      size,
      keyword: query,
    },
  });

  return data.data;
};
