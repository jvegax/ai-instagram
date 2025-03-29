import React, { useEffect, useRef, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  Animated, 
  Dimensions, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { ChevronDown, Heart, Send } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useLikeStore } from '@/store/likeStore';
import { useCommentStore } from '@/store/commentStore';
import { useUserStore } from '@/store/userStore';
import * as Haptics from 'expo-haptics';

interface CommentsModalProps {
  visible: boolean;
  onClose: () => void;
  postId: string;
}

const { height } = Dimensions.get('window');

export default function CommentsModal({ visible, onClose, postId }: CommentsModalProps) {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const [commentText, setCommentText] = useState('');
  const inputRef = useRef<TextInput>(null);
  const { isCommentLiked, toggleCommentLike } = useLikeStore();
  const { getCommentsForPost, addComment } = useCommentStore();
  const { currentUser } = useUserStore();
  const [comments, setComments] = useState([]);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (visible) {
      setComments(getCommentsForPost(postId));
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setCommentText('');
      Keyboard.dismiss();
    }
  }, [visible, postId]);

  // Update comments when they change in the store
  useEffect(() => {
    if (visible) {
      setComments(getCommentsForPost(postId));
    }
  }, [getCommentsForPost, postId, visible]);

  const handleClose = () => {
    Keyboard.dismiss();
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const handleLikeComment = (commentId) => {
    toggleCommentLike(commentId);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleSubmitComment = () => {
    if (commentText.trim() === '') return;
    
    const newComment = addComment({
      postId,
      user: currentUser,
      text: commentText.trim(),
    });
    
    setCommentText('');
    Keyboard.dismiss();
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    // Scroll to top to see the new comment
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      }
    }, 100);
  };

  const handleAddEmoji = (emoji) => {
    setCommentText(prev => prev + emoji);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    inputRef.current?.focus();
  };

  const renderComment = ({ item }) => {
    const isLiked = isCommentLiked(item.id);
    
    return (
      <View style={styles.commentContainer}>
        <Image source={{ uri: item.user.profileImage }} style={styles.commentAvatar} />
        <View style={styles.commentContent}>
          <View style={styles.commentHeader}>
            <Text style={styles.commentUsername}>{item.user.username} <Text style={styles.commentTime}>{item.timestamp}</Text></Text>
          </View>
          <Text style={styles.commentText}>{item.text}</Text>
          <TouchableOpacity style={styles.replyButton}>
            <Text style={styles.replyText}>Responder</Text>
          </TouchableOpacity>
          {item.replies > 0 && (
            <TouchableOpacity style={styles.viewRepliesButton}>
              <View style={styles.replyLine} />
              <Text style={styles.viewRepliesText}>
                Ver {item.replies} {item.replies === 1 ? 'respuesta' : 'respuestas'} más
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity 
          style={styles.likeButton} 
          onPress={() => handleLikeComment(item.id)}
        >
          <Heart 
            size={16} 
            color={isLiked ? Colors.red : Colors.text} 
            fill={isLiked ? Colors.red : 'transparent'} 
          />
          {(isLiked ? (item.likes > 0 ? item.likes + 1 : 1) : item.likes) > 0 && (
            <Text style={styles.likeCount}>
              {isLiked ? (item.likes > 0 ? item.likes + 1 : 1) : item.likes}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const emojis = ['❤️', '🙌', '🔥', '👏', '😊', '😍', '😮', '😂'];

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View 
              style={[
                styles.modalContainer,
                { transform: [{ translateY: slideAnim }] }
              ]}
            >
              <View style={styles.handle} />
              
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Comentarios</Text>
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.filterContainer}>
                <Text style={styles.filterText}>Para ti</Text>
                <ChevronDown size={20} color={Colors.text} />
              </View>
              
              <FlatList
                ref={flatListRef}
                data={comments}
                keyExtractor={(item) => item.id}
                renderItem={renderComment}
                contentContainerStyle={styles.commentsList}
                showsVerticalScrollIndicator={false}
              />
              
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}
                style={styles.inputContainer}
              >
                <View style={styles.emojiContainer}>
                  {emojis.map((emoji, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={styles.emojiButton}
                      onPress={() => handleAddEmoji(emoji)}
                    >
                      <Text style={styles.emoji}>{emoji}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                
                <View style={styles.commentInputContainer}>
                  <Image 
                    source={{ uri: currentUser.profileImage }} 
                    style={styles.userAvatar} 
                  />
                  <TextInput
                    ref={inputRef}
                    style={styles.commentInput}
                    placeholder="Inicia una conversación..."
                    placeholderTextColor={Colors.darkGray}
                    value={commentText}
                    onChangeText={setCommentText}
                    multiline
                    returnKeyType="send"
                    onSubmitEditing={handleSubmitComment}
                  />
                  <TouchableOpacity 
                    style={[
                      styles.sendButton,
                      commentText.trim() === '' && styles.sendButtonDisabled
                    ]}
                    onPress={handleSubmitComment}
                    disabled={commentText.trim() === ''}
                  >
                    <Send 
                      size={24} 
                      color={commentText.trim() === '' ? Colors.darkGray : Colors.blue} 
                    />
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%',
    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.mediumGray,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightGray,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4,
    color: Colors.text,
  },
  commentsList: {
    paddingHorizontal: 16,
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  commentUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  commentTime: {
    fontSize: 14,
    color: Colors.darkGray,
    fontWeight: 'normal',
  },
  commentText: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
  },
  replyButton: {
    marginTop: 2,
  },
  replyText: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  viewRepliesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  replyLine: {
    width: 20,
    height: 1,
    backgroundColor: Colors.darkGray,
    marginRight: 8,
  },
  viewRepliesText: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  likeButton: {
    alignItems: 'center',
    marginLeft: 10,
  },
  likeCount: {
    fontSize: 12,
    color: Colors.text,
    marginTop: 2,
  },
  inputContainer: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.lightGray,
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightGray,
  },
  emojiButton: {
    padding: 5,
  },
  emoji: {
    fontSize: 24,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  commentInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 10,
    padding: 5,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});