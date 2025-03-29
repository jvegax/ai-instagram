import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  StatusBar,
  Pressable,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { getUserStories, StoryItem } from '@/mocks/userStories';
import StoryProgressBar from '@/components/StoryProgressBar';
import { Heart, Send, MoreVertical, X, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/colors';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');
const STORY_DURATION = 5000; // 5 seconds per story

export default function StoriesScreen() {
  const router = useRouter();
  const { userId } = useLocalSearchParams();
  const userStories = getUserStories(userId as string);
  
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [message, setMessage] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Handle case when no stories are found
  if (!userStories || userStories.stories.length === 0) {
    router.back();
    return null;
  }

  const currentStory = userStories.stories[currentStoryIndex];

  useEffect(() => {
    // Clear any existing timeout when component mounts or story changes
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentStoryIndex]);

  const handleNextStory = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    if (currentStoryIndex < userStories.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      // No more stories, go back
      router.back();
    }
  };

  const handlePreviousStory = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else {
      // First story, go back
      router.back();
    }
  };

  const handleStoryComplete = () => {
    handleNextStory();
  };

  const handlePressIn = () => {
    setIsPaused(true);
  };

  const handlePressOut = () => {
    setIsPaused(false);
  };

  const handleClose = () => {
    router.back();
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, you would send the message here
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      setMessage('');
      // For demo purposes, just close the story after sending
      setTimeout(() => {
        router.back();
      }, 500);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Stack.Screen options={{ headerShown: false, presentation: 'transparentModal' }} />
      
      {/* Progress bars */}
      <View style={styles.progressContainer}>
        {userStories.stories.map((story, index) => (
          <StoryProgressBar
            key={story.id}
            index={index}
            currentIndex={currentStoryIndex}
            duration={STORY_DURATION}
            isActive={index === currentStoryIndex}
            onComplete={handleStoryComplete}
            isPaused={isPaused}
          />
        ))}
      </View>
      
      {/* User info */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: userStories.profileImage }} style={styles.profileImage} />
          <View>
            <Text style={styles.username}>{userStories.username}</Text>
            <Text style={styles.timestamp}>{currentStory.timestamp}</Text>
          </View>
          {currentStory.caption && (
            <View style={styles.captionContainer}>
              <ChevronRight size={16} color="#fff" />
              <Text style={styles.caption}>{currentStory.caption}</Text>
            </View>
          )}
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <MoreVertical size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleClose}>
            <X size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Story content */}
      <View style={styles.storyContent}>
        <Image
          source={{ uri: currentStory.imageUrl }}
          style={styles.storyImage}
          resizeMode="cover"
        />
        
        {/* Touch areas for navigation */}
        <View style={styles.touchAreas}>
          <Pressable
            style={styles.prevArea}
            onPress={handlePreviousStory}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          />
          <Pressable
            style={styles.nextArea}
            onPress={handleNextStory}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          />
        </View>
      </View>
      
      {/* Footer with message input */}
      <View style={styles.footer}>
        <View style={styles.messageInputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="Enviar mensaje"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={message}
            onChangeText={setMessage}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          />
          {message.trim() ? (
            <TouchableOpacity onPress={handleSendMessage}>
              <Send size={20} color="#fff" />
            </TouchableOpacity>
          ) : (
            <View style={styles.footerActions}>
              <TouchableOpacity style={styles.footerButton}>
                <Heart size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerButton}>
                <Send size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 8,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    zIndex: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  timestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  caption: {
    color: '#fff',
    fontSize: 14,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 16,
  },
  storyContent: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  storyImage: {
    width: '100%',
    height: '100%',
  },
  touchAreas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  prevArea: {
    flex: 1,
  },
  nextArea: {
    flex: 1.5,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    paddingTop: 10,
    zIndex: 10,
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  messageInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  footerActions: {
    flexDirection: 'row',
  },
  footerButton: {
    marginLeft: 16,
  },
});