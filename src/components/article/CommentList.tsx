'use client'
import React, { useEffect } from "react"
import useCommentStore from "@/store/commentStore"
import CommentCard from "./CommentCard"

interface CommentListProps {
  articleNo: number;
}

const CommentList: React.FC<CommentListProps> = ({ articleNo }) => {
  const { comments, fetchComments } = useCommentStore();

  useEffect(() => {
    fetchComments(articleNo);
  }, [articleNo]);

  // console.log('comments:', comments)

  return (
    <div className="pb-24">
      <h1>댓글</h1>
      {comments
        .filter((comment) => comment !== undefined) // undefined 항목 필터링
        .map((comment) => (
          <CommentCard key={comment.commentNo} comment={comment} />
        ))}
    </div>
  );
};

export default CommentList;