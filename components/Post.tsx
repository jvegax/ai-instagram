import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react-native';
import Colors from '@/constants/colors';

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

      <View style={styles.postImageContainer}>
        <Image source={{ uri: post.image }} style={styles.postImage} />
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>ganaba</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Heart size={24} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
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
        <Text style={styles.likes}>{post.likes.toLocaleString()} likes</Text>
        <View style={styles.captionContainer}>
          <Text style={styles.captionUsername}>{post.user.username}</Text>
          <Text style={styles.captionText}> {post.description}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.comments}>View all {post.comments} comments</Text>
        </TouchableOpacity>
        <Text style={styles.timestamp}>{post.timestamp}</Text>
      </View>
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