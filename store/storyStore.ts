import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StoryState {
  viewedStories: Record<string, string[]>; // userId -> storyIds[]
  markStoryAsViewed: (userId: string, storyId: string) => void;
  isStoryViewed: (userId: string, storyId: string) => boolean;
  getUnviewedStoriesCount: (userId: string, totalStories: string[]) => number;
}

export const useStoryStore = create<StoryState>()(
  persist(
    (set, get) => ({
      viewedStories: {},
      
      markStoryAsViewed: (userId: string, storyId: string) => {
        set((state) => {
          const userViewedStories = state.viewedStories[userId] || [];
          if (!userViewedStories.includes(storyId)) {
            return {
              viewedStories: {
                ...state.viewedStories,
                [userId]: [...userViewedStories, storyId]
              }
            };
          }
          return state;
        });
      },
      
      isStoryViewed: (userId: string, storyId: string) => {
        const state = get();
        const userViewedStories = state.viewedStories[userId] || [];
        return userViewedStories.includes(storyId);
      },
      
      getUnviewedStoriesCount: (userId: string, totalStories: string[]) => {
        const state = get();
        const userViewedStories = state.viewedStories[userId] || [];
        return totalStories.filter(storyId => !userViewedStories.includes(storyId)).length;
      }
    }),
    {
      name: 'story-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);