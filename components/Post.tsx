import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Platform } from 'react-native';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react-native';
import Colors from '@/constants/colors';
import HeartAnimation from './HeartAnimation';
import { useLikeStore } from '@/store/likeStore';
import CommentsModal from './CommentsModal';
import * as Haptics from 'expo-haptics';

interface PostProps {
  post: {
    id: string;
    user: {
      id: string;
      username: string;
      profileImage: string;
    };
    caption: string;
    description: string;
    image: string;
    likes: number;
    comments: number;
    timestamp: string;
  };
}

const { width } = Dimensions.get('window');

export default function Post({ post }: PostProps) {
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const { isPostLiked, toggleLike, likePost } = useLikeStore();
  const isLiked = isPostLiked(post.id);

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    
    if (now - lastTap < DOUBLE_TAP_DELAY) {
      // Double tap detected
      if (!isLiked) {
        likePost(post.id);
        setShowHeartAnimation(true);
        if (Platform.OS !== 'web') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
      }
    }
    
    setLastTap(now);
  };

  const handleLikePress = () => {
    const newLikedState = toggleLike(post.id);
    if (newLikedState) {
      setShowHeartAnimation(true);
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  };

  const handleAnimationComplete = () => {
    setShowHeartAnimation(false);
  };

  const handleCommentsPress = () => {
    setShowComments(true);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.user.profileImage }} style={styles.profileImage} />
          <View>
            <Text style={styles.username}>{post.user.username}</Text>
            <Text style={styles.caption}>{post.caption}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <MoreHorizontal size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <TouchableWithoutFeedback onPress={handleDoubleTap}>
        <View style={styles.postImageContainer}>
          <Image source={{ uri: post.image }} style={styles.postImage} />
          <HeartAnimation 
            visible={showHeartAnimation} 
            onAnimationComplete={handleAnimationComplete} 
          />
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>ganaba</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLikePress}>
            <Heart 
              size={24} 
              color={isLiked ? Colors.red : Colors.text} 
              fill={isLiked ? Colors.red : 'transparent'} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleCommentsPress}>
            <MessageCircle size={24} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Send size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Bookmark size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.likes}>
          {(isLiked ? post.likes + 1 : post.likes).toLocaleString()} likes
        </Text>
        <View style={styles.captionContainer}>
          <Text style={styles.captionUsername}>{post.user.username}</Text>
          <Text style={styles.captionText}> {post.description}</Text>
        </View>
        <TouchableOpacity onPress={handleCommentsPress}>
          <Text style={styles.comments}>View all {post.comments} comments</Text>
        </TouchableOpacity>
        <Text style={styles.timestamp}>{post.timestamp}</Text>
      </View>

      <CommentsModal 
        visible={showComments} 
        onClose={() => setShowComments(false)} 
        postId={post.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  username: {
    fontWeight: '600',
    fontSize: 13,
    color: Colors.text,
  },
  caption: {
    fontSize: 12,
    color: Colors.darkGray,
  },
  postImageContainer: {
    width: width,
    height: width,
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  overlayText: {
    color: Colors.background,
    fontSize: 36,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 16,
  },
  footer: {
    paddingHorizontal: 12,
  },
  likes: {
    fontWeight: '600',
    marginBottom: 4,
    fontSize: 14,
    color: Colors.text,
  },
  captionContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  captionUsername: {
    fontWeight: '600',
    fontSize: 14,
    color: Colors.text,
  },
  captionText: {
    fontSize: 14,
    color: Colors.text,
  },
  comments: {
    color: Colors.darkGray,
    marginBottom: 4,
    fontSize: 14,
  },
  timestamp: {
    color: Colors.darkGray,
    fontSize: 12,
    marginBottom: 8,
  },
});