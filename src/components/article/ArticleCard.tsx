'use client'
//NEXT && React
import React from 'react'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { formatDate } from '@/utils/article/date'


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

interface IArticleCardProps {
  article: IArticle;
}


const ArticleCard = React.forwardRef<HTMLDivElement, IArticleCardProps>(({ article }, ref) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/article/detail/${article.articleNo}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="w-full h-[96px] flex items-center cursor-pointer" ref={ref}>
      {article.images?.imgUrl1 && (
        <Image 
          src={article.images.imgUrl1} 
          alt={article.title} 
          width={56} 
          height={56} 
          className="object-cover rounded-lg w-[56px] h-[56px] mr-4" 
        />
      )}
      <div className='flex flex-col space-y-2'> 
        <h2 className="font-medium">{article.title}</h2>
        <p className="text-gray06 text-[12px] space-x-[10px]">
          <span>{formatDate(article.regDate)}</span>
          <span>조회수 <strong>{article.viewCnt}</strong></span>
          <span>추천해요 <strong>{article.likeCnt}</strong></span>
        </p>
      </div>
    </div>
  );
});

export default ArticleCard;