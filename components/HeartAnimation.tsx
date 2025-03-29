import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Platform } from 'react-native';
import { Heart } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface HeartAnimationProps {
  visible: boolean;
  onAnimationComplete: () => void;
}

export default function HeartAnimation({ visible, onAnimationComplete }: HeartAnimationProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Reset animations
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);

      // Run animation sequence
      Animated.sequence([
        // Grow and fade in
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            easing: Easing.out(Easing.back(1.7)),
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: Platform.OS !== 'web',
          }),
        ]),
        
        // Small pulse effect
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 100,
          easing: Easing.bounce,
          useNativeDriver: Platform.OS !== 'web',
        }),
        
        // Return to normal size
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: Platform.OS !== 'web',
        }),
        
        // Hold for a moment
        Animated.delay(300),
        
        // Fade out
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start(() => {
        onAnimationComplete();
      });
    }
  }, [visible, scaleAnim, opacityAnim, onAnimationComplete]);

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.heartContainer,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <Heart size={80} fill={Colors.red} color={Colors.red} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  heartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});