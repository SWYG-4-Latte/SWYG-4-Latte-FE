'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import CommentModal from '../common/modal/CommentModal';
import useCommentStore from '@/store/commentStore';

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
  const { deleteComment, reportComment, likeComment } = useCommentStore();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likeCnt);
  const [isOpen, setIsOpen] = useState(false); // 모달 상태 추가
  const [currentUserNickname, setCurrentUserNickname] = useState<string | null>(null);

  useEffect(() => {
    const isLiked = localStorage.getItem(`liked_${comment.commentNo}`);
    setLiked(isLiked === 'true');
  }, [comment.commentNo]);

  useEffect(() => {
    const nickname = localStorage.getItem('nickname');
    if (nickname) {
      setCurrentUserNickname(nickname);
    } else {
      console.error('Nickname is not found in localStorage');
    }
  }, []);

  const handleLikeClick = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        await likeComment(comment.commentNo, liked, accessToken);
        setLiked(!liked);
        const newLikeCount = likeCount + (liked ? -1 : 1);
        setLikeCount(newLikeCount);
        localStorage.setItem(`liked_${comment.commentNo}`, (!liked).toString());
      } catch (error) {
        console.error('Failed to like comment:', error);
      }
    } else {
      console.error('Access token is missing');
    }
  };

  const handleCommentModalOpen = () => {
    setIsOpen(true); // 모달 열기
  };

  const handlCommentModalClose = () => {
    setIsOpen(false); // 모달 닫기
  };

  const handleDeleteClick = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        await deleteComment(comment.commentNo, accessToken);

        setIsOpen(false); // 모달 닫기
      } catch (error) {
        console.error('Failed to delete comment:', error);
      }
    } else {
      console.error('Access token is missing');
    }
  };

  const handleReportClick = async () => {
    try {
      await reportComment(comment.commentNo);

      setIsOpen(false); // 모달 닫기
    } catch (error) {
      console.error('Failed to report comment:', error);
    }
  };

  const renderedCommentModal = (
    <CommentModal isOpen={isOpen} onClose={handlCommentModalClose}>
      <div className="w-full text-center">
        {comment.nickname === currentUserNickname || null ? (
          <>
            <div
              onClick={handleDeleteClick}
              className="flex items-center justify-start border-b border-b-gray04 px-5 py-4"
            >
              <button className="flex h-[18px] w-[280px] items-center justify-start text-gray08">댓글 삭제</button>
            </div>
          </>
        ) : (
          <>
            <div
              onClick={handleReportClick}
              className="flex items-center justify-start border-b border-b-gray04 px-5 py-4"
            >
              <button className="flex h-[18px] w-[280px] items-center justify-start text-gray08">댓글 신고</button>
            </div>
          </>
        )}
        <div onClick={handlCommentModalClose} className="flex items-center justify-start px-5 py-4">
          <button className="flex h-[18px] w-[280px] items-center justify-start text-gray08">취소</button>
        </div>
      </div>
    </CommentModal>
  );

  return (
    <>
      <div className="flex items-start py-3">
        {/* IMG */}
        <Image src="/svgs/svg_profile.svg" alt="profile" width={40} height={40} priority unoptimized className="mr-4" />
        <div className="flex w-full flex-col items-start space-y-2">
          {/* NICKNAME, YY.MM.DD, menuDots */}
          <div className="flex w-full items-center justify-between">
            <p className="space-x-2 text-[12px] text-gray06">
              <span className="text-gray08">{comment.nickname}</span>
              <span className="text-[10px] text-gray06">{dayjs(comment.regDate).format('YYYY.MM.DD')}</span>
            </p>
            <button onClick={handleCommentModalOpen} className="h-3 w-3">
              <Image
                src="/svgs/svg_ellipsis-vertical.svg"
                alt="더보기"
                width={12}
                height={12}
                priority
                unoptimized
                className="mr-4 cursor-pointer"
              />
            </button>
          </div>
          {/* Comment */}
          <p className="text-[14px] leading-5 text-gray10">{comment.content}</p>
          {/* LikeBtn */}
          <button
            onClick={handleLikeClick}
            className={`flex-all-center bg-gray0 h-[20px] w-[33px] rounded border px-2 py-1
              ${liked ? 'border-primaryOrange text-primaryOrange' : 'border-gray05 text-gray05'}
            `}
          >
            <Image
              src={liked ? '/svgs/svg_article-thumb03.svg' : '/svgs/svg_article-thumb02.svg'}
              alt="thumb"
              width={12}
              height={12}
              priority
              unoptimized
            />
            <span className="text-[10px]">{likeCount}</span>
          </button>
        </div>
        {isOpen && renderedCommentModal}
      </div>
    </>
  );
};

export default CommentCard;
