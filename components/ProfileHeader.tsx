import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronDown, Plus, Menu } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface ProfileHeaderProps {
  username: string;
  displayName: string;
  bio: string;
  profileImage: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

export default function ProfileHeader({ username, displayName, bio, profileImage, stats }: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>{username}</Text>
          <ChevronDown size={20} color={Colors.text} />
          <View style={styles.dot} />
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.iconButton}>
            <Plus size={24} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Menu size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileInfo}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <View style={styles.addStoryButton}>
            <Plus size={14} color="#FFFFFF" />
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.posts}</Text>
            <Text style={styles.statLabel}>publicaciones</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.followers}</Text>
            <Text style={styles.statLabel}>seguidores</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.following}</Text>
            <Text style={styles.statLabel}>seguidos</Text>
          </View>
        </View>
      </View>

      <View style={styles.bioContainer}>
        <Text style={styles.displayName}>{displayName}</Text>
        <Text style={styles.bio}>{bio}</Text>
        <View style={styles.usernameRow}>
          <Text style={styles.bioUsername}>{username}</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.editButtonText}>Compartir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addPersonButton}>
          <Plus size={16} color={Colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.red,
    marginLeft: 8,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
  },
  addStoryButton: {
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
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.text,
  },
  bioContainer: {
    marginBottom: 16,
  },
  displayName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 2,
  },
  bio: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 2,
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bioUsername: {
    fontSize: 14,
    color: Colors.text,
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  editButton: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    paddingVertical: 7,
    alignItems: 'center',
    marginRight: 8,
  },
  shareButton: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    paddingVertical: 7,
    alignItems: 'center',
    marginRight: 8,
  },
  addPersonButton: {
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    fontWeight: '600',
    fontSize: 14,
    color: Colors.text,
  },
});