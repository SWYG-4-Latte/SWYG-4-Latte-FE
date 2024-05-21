import axios from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";

interface IComment {
  commentNo: number;
  articleNo: number;
  content: string;
  nickname: string;
  likeCnt: number;
  writerNo: number;
  writeId: string | null;
  deleteYn: string;
  reportCount: number;
  regDate: string;
  updateDate: string | null;
}

interface ICommentState {
  comments: IComment[];
  fetchComments: (articleNo: number) => Promise<void>;
  addComment: (articleNo: number, content: string, accessToken: string | null, nickname: string) => Promise<void>;
  deleteComment: (commentNo: number, accessToken: string | null) => Promise<void>;
  reportComment: (commentNo: number) => Promise<void>;
  likeComment: (commentNo: number, liked: boolean, accessToken: string | null) => Promise<void>;
}

const useCommentStore = create<ICommentState>((set) => ({
  comments: [],
  fetchComments: async (articleNo) => {
    try {
      const response = await axios.get(`https://latte-server.site/comment/list/${articleNo}`);
      // console.log('fetchComments is working..', response.data.data); // 성공
      set({ comments: response.data.data });
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  },
  addComment: async (articleNo, content, accessToken, nickname) => {
    const newComment: IComment = {
      commentNo: Date.now(), // 임시 ID
      articleNo,
      content,
      nickname,
      likeCnt: 0,
      writerNo: 0, // 사용자 ID (예시)
      writeId: null,
      deleteYn: "N",
      reportCount: 0,
      regDate: new Date().toISOString(),
      updateDate: null,
    };

    // 클라이언트 상태 업데이트
    set((state) => ({ comments: [...state.comments, newComment] }));

    try {
      const response = await axios.post(
        `https://latte-server.site/comment/write/${articleNo}`,
        { content, nickname },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        }
      );
      const addedComment = response.data.data.commentInfo;
      if (addedComment && response.data.resultYn) {
        console.log('New comment added:', addedComment);
        set((state) => ({
          comments: state.comments.map(comment =>
            comment.commentNo === newComment.commentNo ? addedComment : comment
          )
        }));
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
      // 요청 실패 시 롤백
      set((state) => ({
        comments: state.comments.filter(comment => comment.commentNo !== newComment.commentNo)
      }));
    }
  },
  deleteComment: async (commentNo, accessToken) => {
    try {
      await axios.delete(`https://latte-server.site/comment/delete/${commentNo}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set((state) => ({ comments: state.comments.filter(comment => comment.commentNo !== commentNo) }));
      toast('댓글을 삭제했어요', {
        toastId: 'comment-delete'
      });
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  },
  reportComment: async (commentNo) => {
    try {
      await axios.post(`https://latte-server.site/comment/report/${commentNo}`);
      console.log(`Reported comment with ID: ${commentNo}`);
      toast('댓글을 신고했어요', {
        toastId: 'comment-report'
      });
    } catch (error) {
      console.error("Failed to report comment:", error);
    }
  },
  likeComment: async (commentNo, liked, accessToken) => {
    try {
      const response = await axios.post(
        `https://latte-server.site/comment/like/${commentNo}`,
        { like: !liked },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        }
      );
      console.log('likeComment response:', response.data); // 콘솔 로그 추가
      set((state) => {
        const updatedComments = state.comments.map(comment =>
          comment.commentNo === commentNo ? { ...comment, likeCnt: response.data.data.likeCnt } : comment
        );
        console.log('Updated comments:', updatedComments); // 콘솔 로그 추가
        return { comments: updatedComments };
      });
    } catch (error) {
      console.error("Failed to like comment:", error);
    }
  },
}));

export default useCommentStore;
