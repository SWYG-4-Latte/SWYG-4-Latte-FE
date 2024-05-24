'use client'
//NEXT && React
import Link from 'next/link';
import Image from 'next/image';
import React, {useEffect, useState} from 'react'
import { useParams } from 'next/navigation';
//utils
import { formatDate } from '@/utils/article/date';
//Zustand
import useArticleStore from '@/store/articleStore';
import CommentList from '@/components/article/CommentList';
import CommentForm from '@/components/article/CommentForm';


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


export default function ArticlesDetailPage() {
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null; // 서버 사이드 렌더링 방지

  const { articles, likeArticle } = useArticleStore();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [article, setArticle] = useState<IArticle | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  useEffect(() => {
    const articleDetail = articles.find(article => article.articleNo === parseInt(id, 10));
    if (articleDetail) {
      setArticle(articleDetail);
      setLikeCount(articleDetail.likeCnt); // likeCount의 초기값을 articleDetail.likeCnt로 설정
      if (typeof window !== 'undefined') {
        const isLiked = localStorage.getItem(`liked_${articleDetail.articleNo}`);
        setLiked(isLiked === 'true');
      }
    }
  }, [articles, id]);
  
  const handleLikeClick = async () => {
    if (article) {
      const newLikeState = !liked;
      const newLikeCount = Math.max(likeCount + (newLikeState ? 1 : -1), 0); // 0 아래로 감소하지 않도록 설정
  
      try {
        await likeArticle(article.articleNo, newLikeState, accessToken); // liked 대신 newLikeState를 전달합니다.
        setLiked(newLikeState);
        setLikeCount(newLikeCount);
        if (typeof window !== 'undefined') {
          localStorage.setItem(`liked_${article.articleNo}`, newLikeState.toString());
        }
        console.log(`Like button clicked: liked=${newLikeState}, likeCount=${newLikeCount}`); // 콘솔 로그 추가
      } catch (error) {
        console.error('Failed to like article:', error);
      }
    }
  };
  
  
  if (!article) {
    return <div>Loading...</div>;
  }

  console.log(article)

  return (
    <>
      <header className='px-5 flex items-center w-full h-[56px]'>
        <Link href="/article">
          <Image
            src="/svgs/svg_leftArrow.svg"
            alt="left-arrow"
            width={24}
            height={24}
            priority
            unoptimized
            />
        </Link>
      </header>
      <main className='text-gray10 relative'>
        <section className='flex flex-col justify-center px-5 pt-6'>
          <h1 className='text-[18px] font-bold mb-1'>{article.title}</h1>
          <h3 className='text-[16px] mb-3'>{article.subTitle}</h3>
          <p className='text-[14px] text-gray08'>{formatDate(article.regDate)}</p>
        </section>
        {
          article.images?.imgUrl2 &&
          <Image 
            src={article.images?.imgUrl2}
            alt="imageUrl01"
            width={360}
            height={200}
            priority
            className='h-[200px] object-cover mt-6 w-full'
          />
        }
        <section className='px-5 pt-[16px]'>
          <div dangerouslySetInnerHTML={{ __html: article.content }} className='leading-6 tracking-wide text-[14px]'></div>
        </section>
        <aside className='w-full min-h-[225px] bg-primaryBeige px-5 py-8 mt-4'>
          <div className='flex flex-col items-center justify-center'>
            <Image 
              src="/svgs/svg_article-smile.svg"
              alt="article-smile"
              width={40}
              height={40}
              priority
              className='mb-4'
            />
            <p className="mb-1 text-[18px] font-bold">
            {liked ? '더 유익한 정보를 위해 노력할게요.' : '이 아티클이 도움이 되었나요?'}
            </p>
            <p className='text-[16px] text-gray08 mb-4'>{likeCount}명이 도움을 받았어요</p>
            <button 
              onClick={handleLikeClick}
              className={`flex items-center text-gray00 text-[14px] font-medium  px-4 py-2 rounded-lg
              ${liked ? 'bg-orange03': 'bg-primaryOrange'}
              `}>
              <Image 
              src="/svgs/svg_article-thumb01.svg"
              alt="article-smile"
              width={16}
              height={16}
              priority
              className='mr-1'
              />
              {liked ? '이 아티클을 추천했어요': '이 아티클을 추천해요'}
            </button>
          </div>
        </aside>
        <section className="px-5 mt-8 pb-24">
          <CommentList articleNo={article.articleNo} />
        </section>
          <CommentForm articleNo={article.articleNo} accessToken={accessToken} />
      </main>
    </>
  )
}
