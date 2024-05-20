'use client'
// NEXT && React
import Image from "next/image"
import React, { useState, useEffect } from "react"
//Commponent, Library
import Modal, { ModalProps } from "../common/modal/Modal"
import CommentModal from "../common/modal/CommentModal"
import useModal from "@/hooks/useModal"
// Zustand && Hook
import useSignupStore from "@/store/signupStore"
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
  const [likeCount, setLikeCount] = useState(comment.likeCnt)

  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    const isLiked = localStorage.getItem(`liked_${comment.commentNo}`);
    setLiked(isLiked === 'true');
  }, [comment.commentNo]);
  const handleLikeClick = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      await likeComment(comment.commentNo, liked, accessToken)
      setLiked(!liked)
      const newLikeCount = likeCount + (liked ? -1 : 1);
      setLikeCount(newLikeCount)
      localStorage.setItem(`liked_${comment.commentNo}`, (!liked).toString());
      console.log(`Like button clicked: liked=${liked}, likeCount=${newLikeCount}`); // 콘솔 로그 추가
    } else {
      console.error('Access token is missing');
    }
  }
  
  const handleCommentModalOpen = () => {
    openModal()
  }
  const handleDeleteClick = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      await deleteComment(comment.commentNo, accessToken);
      closeModal();
    } else {
      console.error('Access token is missing');
    }
  }

  const handleReportClick = async () => {
    await reportComment(comment.commentNo)
    closeModal()
  }


  // localStorage에서 nickname을 가져옴
  const currentUserNickname = localStorage.getItem('nickname');

  const renderedCommentModal = (
    <CommentModal isOpen={isOpen} onClose={closeModal}>
      <div className="w-full text-center">
        {comment.nickname === currentUserNickname ? (
          <>
            <div className="flex items-center justify-start px-5 border-b border-b-gray04 py-4">
              <button
                className="w-[280px] h-[18px] flex items-center justify-start"
                onClick={handleDeleteClick}
                >
                댓글삭제
            </button>
            </div>
          </>
        ) : (
          <>
          <div className="flex items-center justify-start px-5 border-b border-b-gray04 py-4">
            <button
              className="w-[280px] h-[18px] flex items-center justify-start"
              onClick={handleReportClick}
              >
              댓글신고
            </button>
          </div>
          </>
        )}
        <div className="flex items-center justify-start px-5 py-4">
          <button
            className="w-[280px] h-[18px] flex items-center justify-start"
            onClick={closeModal}
            >
            취소
          </button>
        </div>
      </div>
    </CommentModal>
  )

  console.log('comment.nickname:', comment.nickname, 'currentUserNickname:', currentUserNickname)


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
                onClick={handleCommentModalOpen}
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
        {isOpen && renderedCommentModal}
      </div>
    </>
  )
}

export default CommentCard
