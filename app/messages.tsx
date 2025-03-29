import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput,
  FlatList,
  Image,
  StatusBar
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { ArrowLeft, ChevronDown, Edit, Search, Camera } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { notes } from '@/mocks/notes';
import { conversations } from '@/mocks/conversations';

export default function MessagesScreen() {
  const router = useRouter();

  const renderNoteItem = ({ item }) => (
    <TouchableOpacity style={styles.noteItem}>
      <View style={styles.noteImageContainer}>
        <Image source={{ uri: item.image }} style={styles.noteImage} />
      </View>
      <Text style={styles.noteTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.noteUsername}>{item.username}</Text>
    </TouchableOpacity>
  );

  const renderConversationItem = ({ item }) => (
    <TouchableOpacity style={styles.conversationItem}>
      <View style={styles.conversationLeft}>
        <View style={styles.conversationImageContainer}>
          {item.hasStory ? (
            <View style={styles.storyRing}>
              <View style={styles.storyImageBorder}>
                <Image source={{ uri: item.image }} style={styles.conversationImage} />
              </View>
            </View>
          ) : (
            <Image source={{ uri: item.image }} style={styles.conversationImage} />
          )}
        </View>
        <View style={styles.conversationInfo}>
          <Text style={styles.conversationName}>{item.name}</Text>
          <View style={styles.messagePreviewContainer}>
            <Text style={styles.messagePreview} numberOfLines={1}>
              {item.lastMessage}
            </Text>
            <Text style={styles.messageTime}> · {item.time}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.cameraButton}>
        <Camera size={24} color={Colors.darkGray} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <Stack.Screen 
        options={{
          headerShown: false,
        }}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.text} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.usernameContainer}>
          <Text style={styles.username}>jorgeveega</Text>
          <View style={styles.usernameIconsContainer}>
            <ChevronDown size={20} color={Colors.text} />
            <View style={styles.redDot} />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.editButton}>
          <Edit size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={16} color={Colors.darkGray} style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Buscar"
            placeholderTextColor={Colors.darkGray}
          />
        </View>
      </View>
      
      {/* Notes Carousel */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={renderNoteItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.notesContainer}
      />
      
      {/* Messages Header */}
      <View style={styles.messagesHeader}>
        <Text style={styles.messagesTitle}>Mensajes</Text>
        <TouchableOpacity>
          <Text style={styles.requestsButton}>Solicitudes</Text>
        </TouchableOpacity>
      </View>
      
      {/* Conversations List */}
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={renderConversationItem}
        showsVerticalScrollIndicator={false}
      />
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
  backButton: {
    padding: 4,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 4,
  },
  usernameIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.red,
    marginLeft: 4,
  },
  editButton: {
    padding: 4,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  notesContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  noteItem: {
    width: 80,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  noteImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  noteImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  noteTitle: {
    fontSize: 12,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 2,
    height: 32,
  },
  noteUsername: {
    fontSize: 12,
    color: Colors.text,
    textAlign: 'center',
  },
  messagesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightGray,
  },
  messagesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  requestsButton: {
    fontSize: 16,
    color: Colors.blue,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  conversationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  conversationImageContainer: {
    marginRight: 12,
  },
  storyRing: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#DE0046',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyImageBorder: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conversationImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  conversationInfo: {
    flex: 1,
  },
  conversationName: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  messagePreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messagePreview: {
    fontSize: 14,
    color: Colors.darkGray,
    flex: 1,
  },
  messageTime: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  cameraButton: {
    padding: 8,
  },
});