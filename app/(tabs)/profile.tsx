import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import Colors from '@/constants/colors';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileHighlights from '@/components/ProfileHighlights';
import ProfileTabs from '@/components/ProfileTabs';
import { profile } from '@/mocks/profile';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader 
          username={profile.username}
          displayName={profile.displayName}
          bio={profile.bio}
          profileImage={profile.profileImage}
          stats={profile.stats}
        />
        
        <ProfileHighlights highlights={profile.highlights} />
        
        <View style={styles.tabsContainer}>
          <ProfileTabs posts={profile.posts} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabsContainer: {
    flex: 1,
  },
});