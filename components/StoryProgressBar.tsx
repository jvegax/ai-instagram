import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Colors from '@/constants/colors';

interface StoryProgressBarProps {
  index: number;
  currentIndex: number;
  duration: number;
  isActive: boolean;
  onComplete: () => void;
  isPaused: boolean;
}

export default function StoryProgressBar({
  index,
  currentIndex,
  duration,
  isActive,
  onComplete,
  isPaused
}: StoryProgressBarProps) {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const animation = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      // Start or resume animation
      animation.current = Animated.timing(progressAnim, {
        toValue: 1,
        duration: duration,
        useNativeDriver: false,
      });
      animation.current.start(({ finished }) => {
        if (finished) {
          onComplete();
        }
      });
    } else if (isPaused && animation.current) {
      // Pause animation
      animation.current.stop();
    }

    return () => {
      if (animation.current) {
        animation.current.stop();
      }
    };
  }, [isActive, isPaused, duration]);

  useEffect(() => {
    // Reset progress when not active
    if (index < currentIndex) {
      progressAnim.setValue(1); // Completed
    } else if (index > currentIndex) {
      progressAnim.setValue(0); // Not started
    }
  }, [currentIndex, index]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.progress,
          {
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1,
    overflow: 'hidden',
    marginHorizontal: 2,
  },
  progress: {
    height: '100%',
    backgroundColor: Colors.background,
  },
});