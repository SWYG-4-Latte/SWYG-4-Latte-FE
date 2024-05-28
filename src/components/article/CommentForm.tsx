'use client'
import React, { useState, useEffect } from "react"
import useCommentStore from "@/store/commentStore"
// import useSignupStore from "@/store/signupStore"

interface CommentFormProps {
  articleNo: number;
}

const CommentForm: React.FC<CommentFormProps> = ({ articleNo }) => {
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null; // 서버 사이드 렌더링 방지
  const [content, setContent] = useState('')
  const { addComment } = useCommentStore()
  // const nickname = useSignupStore((state) => state.nickname)
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname');
    setNickname(storedNickname);
  }, []);

  console.log('nickname:', nickname);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && nickname) {
      await addComment(articleNo, content, accessToken, nickname);
      setContent("");
    } else {
      console.error('Nickname is missing or content is empty');
    }
  };

return(
  <form onSubmit={handleSubmit} className="fixed bottom-0 min-w-[360px] max-w-[500px] w-full h-[56px] bg-white border-t border-gray-200">
      <div className="flex items-center space-x-2 px-5 py-[11px]">
        <input
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