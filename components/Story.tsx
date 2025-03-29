import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

interface StoryProps {
  id: string;
  username: string;
  image: string;
  hasStory?: boolean;
  isUser?: boolean;
}

export default function Story({ id, username, image, hasStory = false, isUser = false }: StoryProps) {
  const router = useRouter();

  const handleStoryPress = () => {
    if (hasStory) {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      router.push(`/stories?userId=${id}`);
    } else if (isUser) {
      // Handle user's own story creation
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      // In a real app, this would open the camera/story creation
      console.log('Create a story');
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleStoryPress}>
      <View style={styles.imageContainer}>
        {hasStory ? (
          <LinearGradient
            colors={Colors.storyGradient}
            start={{ x: 0.1, y: 1 }}
            end={{ x: 0.9, y: 0.1 }}
            style={styles.gradientBorder}
          >
            <View style={styles.imageBorder}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          </LinearGradient>
        ) : (
          <View style={styles.noBorder}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        )}
        {isUser && (
          <View style={styles.plusIconContainer}>
            <Plus size={14} color="#FFFFFF" />
          </View>
        )}
      </View>
      <Text style={styles.username} numberOfLines={1}>
        {username}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 75,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  gradientBorder: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBorder: {
    width: 71,
    height: 71,
    borderRadius: 35.5,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noBorder: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.mediumGray,
  },
  image: {
    width: 67,
    height: 67,
    borderRadius: 33.5,
  },
  username: {
    fontSize: 12,
    color: Colors.text,
    textAlign: 'center',
    marginTop: 2,
    width: 75,
  },
  plusIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.blue,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.background,
  },
});