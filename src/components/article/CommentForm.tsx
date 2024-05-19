'use client'
import React, { useState } from "react"
import useCommentStore from "@/store/commentStore"

interface CommentFormProps {
  articleNo: number;
  accessToken: string | null;
}

const CommentForm: React.FC<CommentFormProps> = ({ articleNo, accessToken }) => {
  const [content, setContent] = useState('')
  const { addComment } = useCommentStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      await addComment(articleNo, content, accessToken);
      setContent("");
    }
  };
return(
  <form onSubmit={handleSubmit} className="fixed bottom-0 min-w-[360px] max-w-[500px] w-full h-[56px] bg-white border-t border-gray-200">
      <div className="flex items-center space-x-2 px-5 py-[11px]">
        <textarea
          placeholder="댓글을 입력해 보세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-w-[252px] w-full h-[34px] border rounded-md p-2 bg-gray01"
        />
        <button type="submit" className="w-[60px] h-[34px] bg-primaryOrange text-white p-2 rounded text-[14px]">
          등록
        </button>
      </div>
    </form>
)
}

export default CommentForm;