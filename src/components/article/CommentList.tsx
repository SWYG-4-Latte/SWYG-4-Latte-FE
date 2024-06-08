'use client';
import React, { useEffect } from 'react';

import useCommentStore from '@/store/commentStore';
import CommentCard from './CommentCard';

interface CommentListProps {
  articleNo: number;
}

const CommentList: React.FC<CommentListProps> = ({ articleNo }) => {
  const { comments, fetchComments } = useCommentStore();

  useEffect(() => {
    fetchComments(articleNo);
  }, [articleNo]);

  return (
    <div className="px-5">
      <h3 className="text-sm text-gray10">댓글</h3>
      {comments.length === 0 && (
        <p className="flex h-[114px] items-center justify-center text-sm text-gray06">아직 댓글이 없어요.</p>
      )}
      {comments
        .filter((comment) => comment !== undefined) // undefined 항목 필터링
        .map((comment) => (
          <CommentCard key={comment.commentNo} comment={comment} />
        ))}
    </div>
  );
};

export default CommentList;
