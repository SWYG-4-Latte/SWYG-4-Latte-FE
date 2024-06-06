// src/components/article/ArticleDetail.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { formatDate } from '@/utils/article/date';
import useArticleStore from '@/store/articleStore';
import { IArticle } from '@/types/article/article';

interface ArticleDetailProps {
  initialArticle: IArticle;
}

const ArticleDetail = ({ initialArticle }: ArticleDetailProps) => {
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const { articles, likeArticle, setArticle } = useArticleStore();

  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(initialArticle?.likeCnt || 0);
  const [article, setArticleState] = useState<IArticle | null>(initialArticle || null);

  useEffect(() => {
    if (typeof window !== 'undefined' && article) {
      const likedState = localStorage.getItem(`liked_${article.articleNo}`);
      setLiked(likedState === 'true');
    }
  }, [article]);

  const handleLikeClick = async () => {
    if (article) {
      const newLikeState = !liked;
      const newLikeCount = Math.max(likeCount + (newLikeState ? 1 : -1), 0);

      try {
        await likeArticle(article.articleNo, newLikeState, accessToken);
        setLiked(newLikeState);
        setLikeCount(newLikeCount);
        if (typeof window !== 'undefined') {
          localStorage.setItem(`liked_${article.articleNo}`, newLikeState.toString());
        }
      } catch (error) {
        console.error('Failed to like article:', error);
      }
    }
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className="flex h-[56px] w-full items-center px-5">
        <Link href="/article">
          <Image src="/svgs/svg_leftArrow.svg" alt="left-arrow" width={24} height={24} priority unoptimized />
        </Link>
      </header>
      <main className="relative text-gray10">
        <section className="flex flex-col justify-center px-5 pt-6">
          <h1 className="mb-1 text-[18px] font-bold">{article.title}</h1>
          <h3 className="mb-3 text-[16px]">{article.subTitle}</h3>
          <p className="text-[14px] text-gray08">{formatDate(article.regDate)}</p>
        </section>
        {article.images?.imgUrl2 && (
          <Image
            src={article.images?.imgUrl2}
            alt="imageUrl01"
            width={360}
            height={200}
            priority
            className="mt-6 h-[200px] w-full object-cover"
          />
        )}
        <section className="px-5 pt-[16px]">
          <div
            dangerouslySetInnerHTML={{ __html: article.content }}
            className="text-[14px] leading-6 tracking-wide"
          ></div>
        </section>
        <aside className="mt-4 min-h-[225px] w-full bg-primaryBeige px-5 py-8">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/svgs/svg_article-smile.svg"
              alt="article-smile"
              width={40}
              height={40}
              priority
              className="mb-4"
            />
            <p className="mb-1 text-[18px] font-bold">
              {liked ? '더 유익한 정보를 위해 노력할게요.' : '이 아티클이 도움이 되었나요?'}
            </p>
            <p className="mb-4 text-[16px] text-gray08">{likeCount}명이 도움을 받았어요</p>
            <button
              onClick={handleLikeClick}
              className={`flex items-center rounded-lg px-4 py-2  text-[14px] font-medium text-gray00
              ${liked ? 'bg-orange03' : 'bg-primaryOrange'}
              `}
            >
              <Image
                src="/svgs/svg_article-thumb01.svg"
                alt="article-smile"
                width={16}
                height={16}
                priority
                className="mr-1"
              />
              {liked ? '이 아티클을 추천했어요' : '이 아티클을 추천해요'}
            </button>
          </div>
        </aside>
      </main>
    </>
  );
};

export default ArticleDetail;
