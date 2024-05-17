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

  return (
    <div className="pb-24">
      {comments.map((comment) => (
        <CommentCard key={comment.commentNo} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;