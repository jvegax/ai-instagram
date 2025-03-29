import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { comments as initialComments } from '@/mocks/comments';

export interface Comment {
  id: string;
  postId: string;
  user: {
    id: string;
    username: string;
    profileImage: string;
  };
  text: string;
  timestamp: string;
  likes: number;
  replies: number;
}

interface CommentState {
  comments: Comment[];
  addComment: (comment: Omit<Comment, 'id' | 'timestamp' | 'likes' | 'replies'>) => void;
  getCommentsForPost: (postId: string) => Comment[];
}

export const useCommentStore = create<CommentState>()(
  persist(
    (set, get) => ({
      comments: [...initialComments],
      
      addComment: (commentData) => {
        const newComment: Comment = {
          id: Date.now().toString(),
          timestamp: 'ahora',
          likes: 0,
          replies: 0,
          ...commentData,
        };
        
        set((state) => ({
          comments: [newComment, ...state.comments],
        }));
        
        return newComment;
      },
      
      getCommentsForPost: (postId: string) => {
        return get().comments.filter(comment => comment.postId === postId);
      },
    }),
    {
      name: 'comment-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);