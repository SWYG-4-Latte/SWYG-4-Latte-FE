import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import useArticleStore from '@/store/articleStore';
import { useIntersect } from '@/hooks/useIntersect';

import {
  ArticleHeroSkeleton,
  ArticleListItemSkeleton,
  ArticleSearchListSkeleton,
} from '../common/skeleton/ArticleSkeleton';
import ArticleListItem from './ArticleListItem';
import { IArticle } from '@/types/article/article';

export default function Articles() {
  const { articles, fetchArticles, hasMore, setSort, initialLoad } = useArticleStore();
  const [activeSort, setActiveSort] = useState('recent');
  const [articleHero, setArticleHero] = useState<IArticle | null>(null);

  useEffect(() => {
    fetchArticles(true);
  }, [fetchArticles]);

  useEffect(() => {
    const articleHero = articles.find((article) => article.articleNo === 1);
    if (articleHero) {
      setArticleHero(articleHero);
    }
  }, [articles]);

  const onIntersect = () => {
    if (!initialLoad && hasMore) {
      // 초기 로드 완료 후에만 동작
      fetchArticles();
    }
  };

  const observeTargetRef = useIntersect(onIntersect);

  const handleClickSort = (sortType: string) => {
    setActiveSort(sortType);
    setSort(sortType);
    fetchArticles(true);
  };

  return (
    <>
      {articleHero ? (
        <Link href={`/article/detail/${articleHero.articleNo}`}>
          <section className="h-[255px] cursor-pointer px-5 py-4 text-gray10">
            <Image
              src={articleHero.images.imgUrl2}
              alt="article-hero"
              width={0}
              height={0}
              sizes="100%"
              priority
              className="h-40 w-full rounded-lg bg-gray04 object-cover"
            />
            <div className="mb-4 mt-3 flex flex-col">
              <h2 className="font-medium">{articleHero.title}</h2>
              <div className="mt-2 flex items-center text-gray08">
                <span className="flex gap-2.5">
                  조회수 <span>{articleHero.viewCnt}</span>
                </span>
                <div className="mx-2.5 h-3 w-[1px] bg-gray06" />
                <span className="flex gap-2.5">
                  추천해요 <span>{articleHero.likeCnt}</span>
                </span>
              </div>
            </div>
          </section>
        </Link>
      ) : (
        <ArticleHeroSkeleton />
      )}
      <div className="h-2 w-full bg-gray03" />
      {/* 무한스크롤 */}
      <section className="min-h-[375px] text-gray10">
        {/* Filter Btns */}
        <div className="mt-4 flex items-center space-x-2 px-5">
          <button
            onClick={() => handleClickSort('recent')}
            className={`flex-all-center h-[30px] w-[63px] whitespace-nowrap rounded-md border px-4 py-2 text-[12px]
              ${activeSort === 'recent' ? 'border-primaryOrange bg-orange01 text-primaryOrange' : 'border-gray05 bg-gray01 text-gray08'}`}
          >
            최신순
          </button>
          <button
            onClick={() => handleClickSort('viewCnt')}
            className={`flex-all-center h-[30px] w-[63px] whitespace-nowrap rounded-md border px-4 py-2 text-[12px]
          ${activeSort === 'viewCnt' ? ' border-primaryOrange bg-orange01 text-primaryOrange' : 'border-gray05 bg-gray01 text-gray08'}`}
          >
            조회순
          </button>
          <button
            onClick={() => handleClickSort('likeCnt')}
            className={`flex-all-center h-[30px] w-[63px] whitespace-nowrap rounded-md border px-4 py-2 text-[12px]
          ${activeSort === 'likeCnt' ? ' border-primaryOrange bg-orange01 text-primaryOrange' : 'border-gray05 bg-gray01 text-gray08'}`}
          >
            추천순
          </button>
        </div>
        {/* ITEMS - Data Fetching  */}
        <div className="mb-20 mt-4 w-full">
          {initialLoad && <ArticleSearchListSkeleton />}
          {articles.map((article, index) => (
            <ArticleListItem key={article.articleNo} article={article} />
          ))}
          <div ref={observeTargetRef}>{hasMore && <ArticleListItemSkeleton />}</div>
        </div>
      </section>
    </>
  );
}
