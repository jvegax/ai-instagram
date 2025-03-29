import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LikeState {
  likedPosts: string[];
  likedComments: string[];
  likePost: (postId: string) => void;
  unlikePost: (postId: string) => void;
  isPostLiked: (postId: string) => boolean;
  toggleLike: (postId: string) => boolean;
  likeComment: (commentId: string) => void;
  unlikeComment: (commentId: string) => void;
  isCommentLiked: (commentId: string) => boolean;
  toggleCommentLike: (commentId: string) => boolean;
}

export const useLikeStore = create<LikeState>()(
  persist(
    (set, get) => ({
      likedPosts: [],
      likedComments: [],
      
      likePost: (postId: string) => {
        set((state) => ({
          likedPosts: state.likedPosts.includes(postId) 
            ? state.likedPosts 
            : [...state.likedPosts, postId]
        }));
      },
      
      unlikePost: (postId: string) => {
        set((state) => ({
          likedPosts: state.likedPosts.filter(id => id !== postId)
        }));
      },
      
      isPostLiked: (postId: string) => {
        return get().likedPosts.includes(postId);
      },
      
      toggleLike: (postId: string) => {
        const isLiked = get().isPostLiked(postId);
        if (isLiked) {
          get().unlikePost(postId);
        } else {
          get().likePost(postId);
        }
        return !isLiked;
      },

      likeComment: (commentId: string) => {
        set((state) => ({
          likedComments: state.likedComments.includes(commentId) 
            ? state.likedComments 
            : [...state.likedComments, commentId]
        }));
      },
      
      unlikeComment: (commentId: string) => {
        set((state) => ({
          likedComments: state.likedComments.filter(id => id !== commentId)
        }));
      },
      
      isCommentLiked: (commentId: string) => {
        return get().likedComments.includes(commentId);
      },
      
      toggleCommentLike: (commentId: string) => {
        const isLiked = get().isCommentLiked(commentId);
        if (isLiked) {
          get().unlikeComment(commentId);
        } else {
          get().likeComment(commentId);
        }
        return !isLiked;
      }
    }),
    {
      name: 'like-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);