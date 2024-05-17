'use client'
import React, { useState } from "react"
import useCommentStore from "@/store/commentStore"

interface CommentFormProps {
  articleNo: number;
}

const CommentForm: React.FC<CommentFormProps> = ({ articleNo }) => {
  const [content, setContent] = useState('')
  const { addComment } = useCommentStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addComment(articleNo, content)
    setContent('')
  };

return(
  <form onSubmit={handleSubmit} className="fixed bottom-0 min-w-[360px] max-w-[500px] w-full p-4 bg-white border-t border-gray-200">
      <div className="flex space-x-2">
        <textarea
          placeholder="댓글을 입력하세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded p-2"
        />
        <button type="submit" className="bg-primaryOrange text-white p-2 rounded">
          작성
        </button>
      </div>
    </form>
)
}

export default CommentForm;