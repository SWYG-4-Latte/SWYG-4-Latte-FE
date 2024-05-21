import axios from "axios";
import { create } from "zustand";

interface IArticle{
  articleNo: number;
  imageUrl: string | null;
  images: { imgUrl1: string; imgUrl2: string } | null;
  title: string;
  subTitle: string;
  content: string;
  writerNo: number;
  nickname: string;
  viewCnt: number;
  likeCnt: number;
  deleteYn: string;
  regDate: string;
  updateDate: string | null;
}

interface IArticleStoreState {
  articles: IArticle[];
  page: number;
  hasMore: boolean;
  sort: string;
  initialLoad: boolean; // 초기 로드 여부
  fetchArticles: (initial?: boolean) => Promise<void>;
  setSort: (sort: string) => void;
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
          sort
        }
      });

      const newArticles = response.data.data.content;
      console.log('Fetched articles:', newArticles);

      set({
        articles: initial ? newArticles : [...articles, ...newArticles],
        page: currentPage + 1,
        hasMore: !response.data.data.last,
        initialLoad: false, // 초기 로드 완료로 설정
      });

      console.log(`Updated state - Page: ${currentPage + 1}, HasMore: ${!response.data.data.last}`);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  },
  
  setSort: (sort) => {
    set({ sort, page: 0, hasMore: true, articles: [], initialLoad: true });
    get().fetchArticles(true);
  },
}));

export default useArticleStore;