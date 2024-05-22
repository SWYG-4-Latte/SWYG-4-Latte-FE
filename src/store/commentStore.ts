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
      console.log('fetchComments is working..', response.data.data); // 성공
      set({ comments: response.data.data });
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  },
  addComment: async (articleNo, content, accessToken, nickname) => {
    const getNextCommentNo = (comments: IComment[]) => {
      const maxCommentNo = comments.reduce((max, comment) => Math.max(max, comment.commentNo), 0);
      return maxCommentNo + 1;
    };

    set((state) => {
      const tempComment: IComment = {
        commentNo: getNextCommentNo(state.comments), // 마지막 commentNo + 1
        articleNo,
        content,
        nickname,
        likeCnt: 0,
        writerNo: 0,
        writeId: null,
        deleteYn: "N",
        reportCount: 0,
        regDate: new Date().toISOString(),
        updateDate: null,
      };
      return { comments: [...state.comments, tempComment] };
    });

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
            comment.commentNo === addedComment.commentNo ? addedComment : comment
          )
        }));
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
      // 요청 실패 시 롤백
      set((state) => ({
        comments: state.comments.filter(comment => comment.commentNo !== state.comments[state.comments.length - 1].commentNo)
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
