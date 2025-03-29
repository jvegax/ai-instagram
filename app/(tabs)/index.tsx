import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { ChevronDown, Heart, Send } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import Story from '@/components/Story';
import Post from '@/components/Post';
import { posts } from '@/mocks/posts';
import { userStories } from '@/mocks/userStories';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Para ti</Text>
          <ChevronDown size={20} color={Colors.text} />
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Heart size={24} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push('/messages')}
          >
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>4</Text>
            </View>
            <Send size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesContainer}
        >
          {/* User's own story */}
          <Story 
            id="current-user"
            username="Tu historia"
            image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
            hasStory={false}
            isUser={true}
          />
          
          {/* Other users' stories */}
          {userStories.map((user) => (
            <Story 
              key={user.userId}
              id={user.userId}
              username={user.username}
              image={user.profileImage}
              hasStory={true}
            />
          ))}
        </ScrollView>

        <View style={styles.divider} />

        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 24,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: Colors.red,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  notificationText: {
    color: Colors.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
  storiesContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  divider: {
    height: 0.5,
    backgroundColor: Colors.mediumGray,
    marginTop: 4,
  },
});