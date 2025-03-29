import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '@/constants/colors';

interface Highlight {
  id: string;
  title: string;
  image: string;
}

interface ProfileHighlightsProps {
  highlights: Highlight[];
}

export default function ProfileHighlights({ highlights }: ProfileHighlightsProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {highlights.map((highlight) => (
        <TouchableOpacity key={highlight.id} style={styles.highlightContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: highlight.image }} style={styles.image} />
          </View>
          <Text style={styles.title} numberOfLines={1}>
            {highlight.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  highlightContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 75,
  },
  imageContainer: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  image: {
    width: 67,
    height: 67,
    borderRadius: 33.5,
  },
  title: {
    fontSize: 12,
    color: Colors.text,
    textAlign: 'center',
  },
});