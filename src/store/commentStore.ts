import axios from "axios";
import { create } from "zustand";


interface IComment {
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
}

interface ICommentState {
  comments: IComment[];
  fetchComments: (articleNo: number) => Promise<void>;
  addComment: (articleNo: number, content: string) => Promise<void>;
  deleteComment: (commentNo: number) => Promise<void>;
  reportComment: (commentNo: number) => Promise<void>;
  likeComment: (commentNo: number) => Promise<void>;
}

const useCommentStore = create<ICommentState>((set)=>({
  comments: [],
  fetchComments: async (articleNo) => {
    try {
      const response = await axios.get(`https://latte-server.site/comment/list/${articleNo}`);
      set({ comments: response.data.data })
    } catch (error) {
      console.error('Failed to fetch comments:', error)
    }
    
  },
  addComment: async (articleNo, content) => {
    try {
      const response = await axios.post(`https//latte-server.site/comment/write/${articleNo}`, { articleNo, content })
      set((state) => ({ comments: [...state.comments, response.data.data.commentInfo] }))
    } catch (error) {
      console.error('Failed to add comment:', error)
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
