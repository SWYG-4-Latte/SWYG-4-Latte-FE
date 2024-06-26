'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import useCommentStore from '@/store/commentStore';
import { formatDate } from '@/utils/article/date';

export default function MyReplyContent() {
  const { comments, fetchUserComments } = useCommentStore();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [sort, setSort] = useState('recent');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      setAccessToken(token);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchUserComments(accessToken, sort);
    }
  }, [fetchUserComments, accessToken, sort]);

  const handleClickSort = (newSort: string) => {
    setSort(newSort);
  };

  const filteredComments = comments.slice(0, comments.length - 1);

  const renderNoComments = (
    <section className="mt-[160px] flex flex-col items-center justify-center">
      <Image src="/svgs/svg_my-noMsg.svg" alt="no-msg" width={72} height={76} priority unoptimized />
      <p className="mb-2 text-center text-[16px] text-gray08">내가 쓴 댓글이 없어요.</p>
      <p className="text-center text-[14px] text-gray08">아티클을 읽고 의견을 남겨주세요.</p>
    </section>
  );

  const renderCommentList = (
    <section className="px-5">
      <p className="mt-4 text-[12px] text-gray08">총 {filteredComments.length}개의 작성한 댓글이 있습니다.</p>
      <div className="flex items-center justify-between">
        <div className="itmes-center mt-2 flex space-x-2">
          <button
            onClick={() => handleClickSort('recent')}
            className={`flex-all-center h-[30px] w-[63px] whitespace-nowrap rounded-md border px-4 py-2 text-[12px]
            ${sort === 'recent' ? 'border-primaryOrange text-primaryOrange' : 'border-gray05'}`}
          >
            최신순
          </button>
          <button
            onClick={() => handleClickSort('likeCnt')}
            className={`flex-all-center h-[30px] w-[63px] whitespace-nowrap rounded-md border px-4 py-2 text-[12px]
            ${sort === 'likeCnt' ? 'border-primaryOrange text-primaryOrange' : 'border-gray05'}`}
          >
            추천순
          </button>
        </div>
      </div>
      <div>
        {filteredComments.length > 0
          ? filteredComments.map((comment, index) => (
              <div key={index} className="border-b border-gray04 py-4">
                <p className="mb-2 text-gray10">{comment.content}</p>
                <div className="flex items-center space-x-2">
                  <p className="text-[12px] text-gray08">{formatDate(comment.regDate)}</p>
                  <p className="text-[12px] text-gray08">{comment.title}</p>
                </div>
              </div>
            ))
          : renderNoComments}
      </div>
    </section>
  );

  return <div className="pt-14">{filteredComments.length > 0 ? renderCommentList : renderNoComments}</div>;
}
