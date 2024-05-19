import axios from "axios";
import { create } from "zustand";


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
  addComment: (articleNo: number, content: string, accessToken: string | null) => Promise<void>;
  deleteComment: (commentNo: number) => Promise<void>;
  reportComment: (commentNo: number) => Promise<void>;
  likeComment: (commentNo: number) => Promise<void>;
}

const useCommentStore = create<ICommentState>((set)=>({
  comments: [],
  fetchComments: async (articleNo) => {
    try {
      const response = await axios.get(`https://latte-server.site/comment/list/${articleNo}`);
      console.log('fecthComents is working..', response.data.data ) // 성공 
      set({ comments: response.data.data })
    } catch (error) {
      console.error('Failed to fetch comments:', error)
    }
    
  },
  addComment: async (articleNo, content, accessToken) => {
    try {
      const response = await axios.post(
        `https://latte-server.site/comment/write/${articleNo}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const newComment = response.data.data.commentInfo;
      if (newComment && response.data.resultYn) {
        console.log('New comment added:', newComment);
        set((state) => ({ comments: [...state.comments, newComment] }));
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  },
  deleteComment:  async (commentNo) => {
    try {
      await axios.delete(`https//latte-server.site/delete/${commentNo}`);
      set((state) => ({ comments: state.comments.filter(comment => comment.commentNo !== commentNo) })) 
    } catch (error) {
      console.error('Failed to delete comment:', error)
    }

  },
  reportComment: async (commentNo) => {
    try{
      await axios.post(`https://latte-server.site/comment/report/${commentNo}`);
      console.log(`Reported comment with ID: ${commentNo}`);
    } catch (error) {
      console.error("Failed to report comment:", error);
    }
  },
  likeComment: async (commentNo) => {
    try {
      const response = await axios.post(`https://latte-server.site/comment/like/${commentNo}`);
      set((state) => ({
        comments: state.comments.map(comment =>
          comment.commentNo === commentNo ? { ...comment, likeCnt: response.data.data.likeCnt } : comment
        ),
      }));
    } catch (error) {
      console.error("Failed to like comment:", error);
    }
  },
}))

export default useCommentStore;
