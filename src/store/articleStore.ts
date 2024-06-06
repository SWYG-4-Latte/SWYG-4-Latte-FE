import axios from 'axios';
import { create } from 'zustand';

import { IArticle } from '@/types/article/article';

interface IArticleStoreState {
  articles: IArticle[];
  page: number;
  hasMore: boolean;
  sort: string;
  initialLoad: boolean; // 초기 로드 여부
  fetchArticles: (initial?: boolean) => Promise<void>;
  likeArticle: (articleNo: number, liked: boolean, accessToken: string | null) => Promise<void>;
  setSort: (sort: string) => void;
  resetArticles: () => void; // 상태 초기화 메서드 추가
  setArticle: (article: IArticle) => void;
}

const useArticleStore = create<IArticleStoreState>((set, get) => ({
  articles: [],
  page: 0,
  hasMore: true,
  sort: 'recent',
  initialLoad: true, // 초기 로드 여부 설정
  fetchArticles: async (initial = false) => {
    const { page, sort, articles } = get();
    const currentPage = initial ? 0 : page;

    console.log(`Fetching articles - Page: ${currentPage}, Sort: ${sort}, Initial: ${initial}`);

    try {
      const response = await axios.get('https://latte-server.site/article/list', {
        params: {
          page: currentPage,
          size: 4,
          sort,
        },
      });

      const newArticles = response.data.data.content;
      console.log('Fetched articles:', newArticles);

      set({
        articles: initial ? newArticles : [...articles, ...newArticles],
        page: currentPage + 1,
        hasMore: !response.data.data.last,
        initialLoad: false,
      });

      console.log(`Updated state - Page: ${currentPage + 1}, HasMore: ${!response.data.data.last}`);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  },

  likeArticle: async (articleNo, liked, accessToken) => {
    try {
      const response = await axios.post(
        `https://latte-server.site/article/like/${articleNo}`,
        { like: !liked },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log('likeArticle response:', response.data);

      if (response.data.success) {
        set((state) => {
          const updatedArticles = state.articles.map((article) =>
            article.articleNo === articleNo ? { ...article, likeCnt: response.data.data.likeCnt } : article,
          );
          console.log('Updated articles:', updatedArticles);
          return { articles: updatedArticles };
        });
      } else {
        console.error('Failed to like article:', response.data.message);
      }
    } catch (error) {
      console.error('Failed to like article:', error);
    }
  },
  setSort: (sort) => {
    set({ sort, page: 0, hasMore: true, articles: [], initialLoad: true });
    get().fetchArticles(true);
  },
  resetArticles: () => {
    set({ articles: [], page: 0, hasMore: true, sort: 'recent', initialLoad: true });
  },
  setArticle: (article: IArticle) => {
    set((state) => ({
      articles: [article, ...state.articles.filter((a) => a.articleNo !== article.articleNo)],
    }));
  },
}));

export default useArticleStore;
