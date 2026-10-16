import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Pressable,
  TextInput,
  Modal,
  SafeAreaView
} from 'react-native';
import stylesH from './styles.js'; // Imports your global header/logo style tokens

export default function PlaylistScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState('')
  const [playlists, setPlaylists] = useState([
    { id: '1', title: 'Liked Songs', trackCount: 0 },
  ]);

  const handlePlaylistPress = (playlistTitle) => {
    alert(`Opening playlist: ${playlistTitle}`);
  };
  const updatePlaylistName = (newPlaylist) => {
    title=newPlaylist
  }
  // Safe handler to append a new automated playlist to the state
  const createNewPlaylist = () => {
    const trimmed = playlistTitle.trim()
    if (!trimmed){
    alert("Please enter a valid playlist title")
    return 
    }
    const newId = (playlists.length + 1).toString();
    const newPlaylist = {
      id: newId,
      title: `${trimmed}`,
      trackCount: 0
    };
    setPlaylists([...playlists, newPlaylist]);
    setModalVisible(false); // Cleanly closes modal sheet window
  };

  const renderPlaylistItem = ({ item }) => (
    <TouchableOpacity 
      style={localStyles.playlistCard} 
      onPress={() => handlePlaylistPress(item.title)}
      activeOpacity={0.7}
    >
      <View style={localStyles.playlistInfo}>
        <Text style={localStyles.playlistTitle}>{item.title}</Text>
        <Text style={localStyles.trackCount}>{item.trackCount} Tracks</Text>
      </View>
      <Text style={localStyles.arrow}>></Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={localStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      {/* HEADER SECTION WITH CAT LOGO */}
      <View style={stylesH.header}>
        <Image 
          source={require("../assets/emblem.png")}
          style={stylesH.logo}
          resizeMode="contain"
        />
        <Text style={stylesH.headerTitle}>SoundCat</Text>
      </View>

      {/* PLAYLIST LIST INTERFACE */}
      <View style={localStyles.body}>
        <View style={localStyles.titleRow}>
          <Text style={localStyles.sectionTitle}>Your Playlists</Text> 
          {/* FIX 1: Passed a clean arrow callback parameter invocation */}
          <Pressable style={localStyles.pressable} onPress={() => setModalVisible(true)}>  
            <Text style={localStyles.pressableText}>+</Text> 
          </Pressable>
        </View>
        
        <FlatList
          data={playlists}
          keyExtractor={(item) => item.id}
          renderItem={renderPlaylistItem}
          contentContainerStyle={localStyles.listPadding}
          ListEmptyComponent={
            <View style={localStyles.emptyContainer}>
              <Text style={localStyles.emptyText}>No playlists found. Use Folder Sweep to automatically generate one!</Text>
            </View>
          }
        />
      </View>

      {/* FIX 3: Fully configured, visible conditional Modal popup structure */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={localStyles.modalOverlay}>
          <View style={localStyles.modalContent}>
            <Text style={localStyles.modalTitle}>Create New Playlist</Text>

              <TextInput style={localStyles.textInput} onChangeText={(newPlaylist) => setPlaylistTitle(newPlaylist)}/>
            
            <TouchableOpacity style={localStyles.modalAddBtn} onPress={createNewPlaylist}>
              <Text style={localStyles.modalAddText}>Generate Playlist</Text>
            </TouchableOpacity>

            <TouchableOpacity style={localStyles.modalCancelBtn} onPress={() => setModalVisible(false)}>
              <Text style={localStyles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  textInput: {
      width: '100%',
    height: 48,
    backgroundColor: '#121212',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
    paddingHorizontal: 16,
    color: '#ffffff',
    fontSize: 15,
    marginTop: 12,
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'between',
    alignItems: 'center',
    marginBottom: 16,
  },
  // FIX 2: Stripped CSS "px" strings out. Used straight number literals.
  pressable: {
    backgroundColor: '#1c1c1c',
    borderRadius: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressableText: {
    color: '#39FF14', // Neon highlight matching signature theme guidelines
    fontSize: 24,
    fontWeight: '600',
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
    flex: 1,
  },
  listPadding: {
    paddingBottom: 20,
  },
  playlistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#222222',
  },
  playlistInfo: {
    flex: 1,
    marginLeft: 14,
  },
  playlistTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  trackCount: {
    color: '#666666',
    fontSize: 12,
    marginTop: 2,
  },
  arrow: {
    color: '#39FF14',
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 45,
  },
  emptyText: {
    color: '#666666',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  // Structural Styles for the newly setup functional Modal overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#222222',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  modalAddBtn: {
    backgroundColor: '#39FF14',
    width: '100%',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalAddText: {
    color: '#121212',
    fontWeight: '700',
    fontSize: 15,
  },
  modalCancelBtn: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#666666',
    fontWeight: '600',
    fontSize: 14,
  },
});
