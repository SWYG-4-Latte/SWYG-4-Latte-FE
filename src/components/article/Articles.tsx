//NEXT, React
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useCallback, useState } from 'react';
//Library && Hook
import useArticleStore from '@/store/articleStore';
import { useIntersect } from '@/hooks/useIntersect';
//Component
import ArticleCard from './ArticleCard';

interface IArticle {
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

export default function Article() {
  const { articles, fetchArticles, hasMore, setSort } = useArticleStore();
  const [activeSort, setActiveSort] = useState('recent');
  const [articleHero, setArticleHero] = useState<IArticle | null>(null);

  useEffect(() => {
    fetchArticles(true);
  }, []);

  console.log(articles);

  useEffect(() => {
    const articleHero = articles.find((article) => article.articleNo === 7);
    if (articleHero) {
      setArticleHero(articleHero);
    }
  }, [articles]);

  const onIntersect = useCallback(() => {
    if (hasMore) {
      console.log('Intersected and fetching more articles...');
      fetchArticles();
    }
  }, [hasMore, fetchArticles]);

  const observeTargetRef = useIntersect(onIntersect);

  const handleClickSort = (sortType: string) => {
    setActiveSort(sortType);
    setSort(sortType);
  };

  return (
    <>
      <section className="min-h-[255px] px-5 py-4 text-gray10">
        <Image
          src={'/svgs/svg_article-hero.svg'}
          alt="article-hero"
          width={360}
          height={175}
          priority
          className="w-full rounded-lg"
        />
        <div className="mt-3 flex flex-col">
          <h1 className="font-medium">라떼 핏을 소개합니다.</h1>
          <p className="mt-2 space-x-2.5 text-[12px] text-gray06">
            <span>
              조회수 <strong>1320</strong>
            </span>
            <span className="borde-gray06 mx-2.5 h-2 w-[1px] border-l" />
            <span>
              추천해요 <strong>1000</strong>
            </span>
          </p>
        </div>
      </section>
      <div className="h-2 w-full bg-gray03 px-5" />
      {/* 무한스크롤 */}
      <section className="min-h-[375px] px-5 text-gray10">
        {/* Filter Btns */}
        <div className="itmes-center mt-4 flex space-x-2">
          <button
            onClick={() => handleClickSort('recent')}
            className={`flex-all-center h-[30px] w-[63px] whitespace-nowrap rounded-md border px-4 py-2 text-[12px]
              ${activeSort === 'recent' ? 'border-primaryOrange text-primaryOrange' : 'border-gray05'}`}
          >
            최신순
          </button>
          <button
            onClick={() => handleClickSort('viewCnt')}
            className={`flex-all-center h-[30px] w-[63px] whitespace-nowrap rounded-md border px-4 py-2 text-[12px]
          ${activeSort === 'viewCnt' ? ' border-primaryOrange text-primaryOrange' : 'border-gray05'}`}
          >
            조회순
          </button>
          <button
            onClick={() => handleClickSort('likeCnt')}
            className={`flex-all-center h-[30px] w-[63px] whitespace-nowrap rounded-md border px-4 py-2 text-[12px]
          ${activeSort === 'likeCnt' ? ' border-primaryOrange text-primaryOrange' : 'border-gray05'}`}
          >
            추천순
          </button>
        </div>
        {/* ITEMS - Data Fetching  */}
        <div className="mt-4 w-full">
          {articles.map((article, index) => (
            <ArticleCard
              key={article.articleNo}
              ref={index === articles.length - 1 ? observeTargetRef : null}
              article={article}
            />
          ))}
        </div>
      </section>
    </>
  );
}
