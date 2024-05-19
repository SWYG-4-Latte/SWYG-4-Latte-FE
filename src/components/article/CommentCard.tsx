'use client'
// NEXT && React
import Image from "next/image"
import React, { useState } from "react"
// Zustand && Hook
import useCommentStore from "@/store/commentStore"
import { formatDate } from "@/utils/article/date"

interface CommentCardProps {
  comment: {
    commentNo: number;
    articleNo: number;
    content: string;
    nickname: string;
    likeCnt: number;
    writerNo: number;
    writeId: string | null;
    deleteYn: string;
    reportCount: number;
    regDate: string;
    updateDate: string | null;
  };
}


const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const { deleteComment, reportComment, likeComment } = useCommentStore()
  const [liked, setLiked] = useState(false)

  const handleLikeClick = async () => {
    await likeComment(comment.commentNo)
    setLiked(!liked)
  }
  

  return (
    <>
      <div className="py-3 flex">
        {/* IMG */}
        <Image
          src="/svgs/svg_profile.svg"
          alt="profile"
          width={40}
          height={40}
          priority
          unoptimized
          className="mr-4"
        />
        <div className="w-full flex flex-col items-start space-y-2">
          {/* NICKNAME, YY.MM.DD, menuDots */}
          <div className="w-full flex items-center justify-between">
            <p className="text-gray06 text-[12px] space-x-2">
              <span>{comment.nickname}</span>
              <span>{formatDate(comment.regDate)}</span>
            </p>
            <p>
              <Image
                src="/svgs/svg_ellipsis-vertical.svg"
                alt="profile"
                width={12}
                height={12}
                priority
                unoptimized
                className="mr-4"
                />
            </p>
          </div>
          {/* Comment */}
          <p className="text-[14px]">{comment.content}</p>
          {/* LikeBtn */}
          <button 
            onClick={handleLikeClick}
            className={`w-[33px] h-[20px] flex-all-center py-1 px-2 border rounded-sm bg-gray0
              ${liked ? 'border-primaryOrange text-primaryOrange' : 'border-gray05 text-gray05'}
            `}
          >
            <Image 
              src={liked ? '/svgs/svg_article-thumb03.svg' : '/svgs/svg_article-thumb02.svg' } 
              alt="thumb" width={12} height={12} priority unoptimized/>
            <span className="text-[10px]">{comment.likeCnt}</span>
          </button>
        </div>

      </div>
    </>
  )
}

export default CommentCard
