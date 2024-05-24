'use client'
import React, { useState, useEffect} from "react"
import Image from "next/image"
import useCommentStore from "@/store/commentStore"
import { formatDate } from "@/utils/article/date"

export default function MyReplyContent() {
  const { comments, fetchUserComments } = useCommentStore()
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

  console.log('comments:', comments)

  const renderCommentList = () => (
    <section className="px-5">
      <p className="mt-4 text-gray08 text-[12px]">총 {comments.length}개의 작성한 댓글이 있습니다.</p>
      <div className="flex justify-between items-center">
      <div className="itmes-center mt-2 flex space-x-2">
      <button
          onClick={() => handleClickSort('recent')}
          className={`flex-all-center h-[30px] w-[63px] whitespace-nowrap rounded-md border px-4 py-2 text-[12px]
            ${sort === 'recent' ? 'border-primaryOrange text-primaryOrange' : 'border-gray05'}`}
        >
          최신순
        </button>
        <button
          onClick={() => handleClickSort('viewCnt')}
          className={`flex-all-center h-[30px] w-[63px] whitespace-nowrap rounded-md border px-4 py-2 text-[12px]
            ${sort === 'viewCnt' ? 'border-primaryOrange text-primaryOrange' : 'border-gray05'}`}
        >
          조회순
        </button>
        </div>
        </div>
      <div>
        {comments.map((comment, index) => (
          <div key={index} className="border-b border-gray04 py-4">
            <p className="text-gray10 mb-2">{comment.content}</p>
            <div className="flex items-center space-x-2">
              <p className="text-[12px] text-gray08">{formatDate(comment.regDate)}</p>
              <p className="text-[12px] text-gray08">{comment.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderNoComments = () => (
    <section className="flex flex-col items-center justify-center mt-[160px]">
      <Image 
        src="/svgs/svg_my-noMsg.svg"
        alt="no-msg"
        width={72}
        height={76}
        priority
        unoptimized
      />
      <p className="text-center text-gray08 text-[16px] mb-2">내가 쓴 댓글이 없어요.</p>
      <p className="text-center text-gray08 text-[14px]">아티클을 읽고 의견을 남겨주세요.</p>
    </section>
  );
  

  return (
    <div className="pt-14">
    {comments.length > 0 ? renderCommentList() : renderNoComments()}
  </div>
  );
};
