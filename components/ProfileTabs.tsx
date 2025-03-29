import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Grid, Play, User } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface ProfileTabsProps {
  posts: Array<{ id: string; image: string }>;
}

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 3;

export default function ProfileTabs({ posts }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState('grid');

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'grid' && styles.activeTabButton]} 
          onPress={() => setActiveTab('grid')}
        >
          <Grid size={24} color={activeTab === 'grid' ? Colors.text : Colors.darkGray} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => setActiveTab('reels')}
        >
          <Play size={24} color={activeTab === 'reels' ? Colors.text : Colors.darkGray} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => setActiveTab('tagged')}
        >
          <User size={24} color={activeTab === 'tagged' ? Colors.text : Colors.darkGray} />
        </TouchableOpacity>
      </View>

      {activeTab === 'grid' && (
        <View style={styles.gridContainer}>
          {posts.map((post) => (
            <TouchableOpacity key={post.id} style={styles.gridItem}>
              <Image source={{ uri: post.image }} style={styles.gridImage} />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.mediumGray,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTabButton: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.text,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    padding: 1,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
});