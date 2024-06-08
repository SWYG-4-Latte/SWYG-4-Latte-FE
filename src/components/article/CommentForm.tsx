'use client';
import React, { useState, useEffect } from 'react';
import useCommentStore from '@/store/commentStore';

interface CommentFormProps {
  articleNo: number;
}

const CommentForm: React.FC<CommentFormProps> = ({ articleNo }) => {
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null; // 서버 사이드 렌더링 방지
  const [content, setContent] = useState('');
  const { addComment } = useCommentStore();
  // const nickname = useSignupStore((state) => state.nickname)
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname');
    setNickname(storedNickname);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && nickname) {
      await addComment(articleNo, content, accessToken, nickname);
      setContent('');
    } else {
      console.error('Nickname is missing or content is empty');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 h-[56px] w-full min-w-[360px] max-w-[500px] bg-primaryIvory shadow-nav"
    >
      <div className="flex items-center space-x-2 px-5 py-[11px]">
        <input
          placeholder="댓글을 입력해 보세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="grow rounded-md border border-gray04 bg-gray03 px-4 py-2 text-sm text-gray06 focus-visible:outline-none"
        />
        <button
          type="submit"
          disabled={content === ''}
          className={`h-[34px] w-[60px] rounded-md px-4 py-2 text-[14px] text-white ${content === '' ? 'bg-orange02' : 'bg-primaryOrange'}`}
        >
          등록
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
