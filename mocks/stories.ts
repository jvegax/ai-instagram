import { userStories } from './userStories';

// This file is kept for backward compatibility
// We're now using the more detailed userStories.ts for story data

export const stories = [
  {
    id: '1',
    username: 'Tu historia',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    hasStory: false,
    isUser: true,
  },
  ...userStories.map(user => ({
    id: user.userId,
    username: user.username,
    image: user.profileImage,
    hasStory: true,
  }))
];