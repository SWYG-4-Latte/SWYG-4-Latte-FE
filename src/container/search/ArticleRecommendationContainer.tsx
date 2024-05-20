import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { getArticleSearchResult } from '@/api/search';
import { RecommendedArticleItemSkeleton } from '@/components/common/skeleton/ArticleSkeleton';
import { Article } from '@/types/article/article';

const ArticleRecommendationContainer = () => {
  const router = useRouter();

  const [recommendedArticle, setRecommendedArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getArticleList = async () => {
    setIsLoading(true);
    const { content } = await getArticleSearchResult(null, 0, 8);

    const randomNum = Math.floor(Math.random() * content.length);
    setRecommendedArticle(content[randomNum]);
    setIsLoading(false);
  };

  useEffect(() => {
    getArticleList();
  }, []);

  return (
    <div className="px-5 py-4">
      <h1 className="pt-4 font-semibold text-gray10">이런 아티클은 어때요?</h1>
      {isLoading && <RecommendedArticleItemSkeleton />}
      {recommendedArticle && (
        <div
          key={recommendedArticle.articleNo}
          className="my-4 flex cursor-pointer flex-col gap-3"
          onClick={() => router.push(`/article/detail/${recommendedArticle.articleNo}`)}
        >
          <Image
            priority
            quality={100}
            src={recommendedArticle.images.imgUrl2}
            alt={recommendedArticle.title}
            width={0}
            height={0}
            sizes="100vw"
            className="h-40 w-full rounded-lg object-cover"
          />
          <div className="flex flex-col gap-2">
            <span className="line-clamp-1 font-medium text-gray10">{recommendedArticle.title}</span>
            <div className="flex items-center text-sm text-gray08">
              <span>조회수</span>
              <span className="ml-[10px]">{recommendedArticle.viewCnt}</span>
              <div className="mx-[10px] h-3 w-px bg-gray06" />
              <span>추천해요</span>
              <span className="ml-[10px]">{recommendedArticle.likeCnt}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleRecommendationContainer;
