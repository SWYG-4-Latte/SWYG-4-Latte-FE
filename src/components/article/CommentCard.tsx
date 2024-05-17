'use client'
// NEXT && React
import React from "react"
// Zustand && Hook
import useCommentStore from "@/store/commentStore"
import { formatDate } from "@/utils/article/date"

interface CommentCardProps {
  comment: {
    commentNo: number;
    articleNo: number;
    content: string;
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

  return (
    <>
    
    </>
  )
}

export default CommentCard
