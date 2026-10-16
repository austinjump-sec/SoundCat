import React, { useState, useContext } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
  Pressable,
  Modal,
  Platform,
  FlatList,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DocumentPicker from 'expo-document-picker';
// Styles and External Tabs
<<<<<<< HEAD
import {AudioContext, AudioProvider} from './AudioContext'
=======
import PlaylistPickerModal from './components/playlistModal'
import {SessionProvider} from './services/context.js'
import {AudioContext, AudioProvider} from './services/AudioContext'
>>>>>>> 0152e14 (bug fixes)
import styles from './components/styles.js';
import DiscoverScreen from './components/search.js';
import SettingsScreen from './components/account.js';
import PlaylistScreen from './components/playlists.js'
const Tab = createBottomTabNavigator();

function LibraryScreen() {
  const [setModalVisible, isModalVisible] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null);
  const [isManualPick, isAutoPick] = useState(false)
<<<<<<< HEAD
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
=======
  const [selectedPlaylist, setSelectedPlaylist] = useState(['1'])
>>>>>>> 0152e14 (bug fixes)
const [playlistMode, setPlaylistMode] = useState(null);
const {
  playlists,
  addTracksToPlaylist,
} = useContext(AudioContext);

<<<<<<< HEAD
const addToPlaylist = () => {
  if (!selectedPlaylist) {
    if (Platform.OS === 'web') {
      window.alert('Please select a playlist.');
    } else {
      Alert.alert('Select a playlist', 'Please select a playlist.');
    }
    return;
  }

  if (!selectedFile) {
    return;
  }

  try {
    addTracksToPlaylist(selectedPlaylist, [selectedFile]);
    setModalVisible(false);
    setSelectedFile(null);
    setSelectedPlaylist(null);
    setPlaylistMode(null);
  } catch (error) {
    console.error('Could not add track:', error);
  }
};
  const handleFilePick = async (mode) => {
    try { 
      setPlaylistMode(mode)
    const result = await DocumentPicker.getDocumentAsync({
      type:'audio/*',
      copyToCacheDirectory:true
    })
    if (result.canceled|| !result.assets?.length) {
    return
      }
    const tracks = result.assets.map((file) => ({
      id: file.uri,
      name: file.name,
      title: file.name.replace(/\.[^.]+$/, ''),
      artist: 'Unknown Artist',
      url: file.uri,
      size: file.size
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : 'Unknown size',
      genre: null,
      artwork: null,
    }));
    setSelectedFile(tracks[0]);
    setSelectedPlaylist(null);
    setModalVisible(true);
  }catch(err) {
    Alert.alert('Could not add track:', error);
  }
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
       <Modal
=======
const renderModal = () => {
     <Modal
>>>>>>> 0152e14 (bug fixes)
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
          <View></View>
            <Text style={styles.modalTitle}>Add To Playlist</Text>
            <View>
     <FlatList
  data={playlists}
  keyExtractor={(item) => String(item.id)}
  renderItem={({ item }) => {
<<<<<<< HEAD
    const selected = String(item.id) === String(selectedPlaylist);

    return (
      <Pressable
        onPress={() =>
          setSelectedPlaylist(selected ? null : item.id)
        }
=======
  const playlistId = String(item.id);

  const selected = selectedPlaylist.some(
    id => String(id) === playlistId
  );

    return (
      <Pressable
             onPress={() => {
        setSelectedPlaylist(prev =>
          prev.some(id => String(id) === playlistId)
            ? prev.filter(id => String(id) !== playlistId)
            : [...prev, item.id]
        );
      }}
>>>>>>> 0152e14 (bug fixes)
        style={{
          padding: 16,
          backgroundColor: selected ? '#263626' : '#1a1a1a',
          borderWidth: 1,
          borderColor: selected ? '#39FF14' : '#333333',
          borderRadius: 8,
          marginBottom: 8,
        }}
      >
        <Text style={{ color: '#fff' }}>
          {item.title}
        </Text>

        <Text style={{ color: '#aaa', fontSize: 12 }}>
          {(item.tracks || []).length} tracks
        </Text>
      </Pressable>
    );
  }}
  ListEmptyComponent={
    <Text style={{ color: '#aaa', padding: 16 }}>
      No playlists yet. Create one in the Playlists tab first.
    </Text>
  }
/>
      
    </View>
            <TouchableOpacity style={styles.modalAddBtn} onPress={addToPlaylist}>
              <Text style={styles.modalAddText}>Add to Playlist</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
<<<<<<< HEAD
=======
}

    renderModal()
const addToPlaylist = () => {
  if (!selectedPlaylist) {
    if (Platform.OS === 'web') {
      window.alert('Please select a playlist.');
    } else {
      Alert.alert('Select a playlist', 'Please select a playlist.');
    }
    return;
  }

  if (!selectedFile) {
    setModalVisible(false)
    return;
  }

  try {
    selectedPlaylist.forEach(playlistId => {addTracksToPlaylist(playlistId, [selectedFile]);})
    setModalVisible(false);
    setSelectedFile(null);
    setPlaylistMode(null);
  } catch (error) {
    console.error('Could not add track:', error);
  }
};
  const handleFilePick = async (mode) => {
    try { 
      setPlaylistMode(mode)
    const result = await DocumentPicker.getDocumentAsync({
      type:'audio/*',
      copyToCacheDirectory:true
    })
    if (result.canceled|| !result.assets?.length) {
    return
      }
    const tracks = result.assets.map((file) => ({
      id: file.uri,
      name: file.name,
      title: file.name.replace(/\.[^.]+$/, ''),
      artist: 'Unknown Artist',
      url: file.uri,
      size: file.size
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : 'Unknown size',
      genre: null,
      artwork: null,
    }));
    setSelectedFile(tracks[0]);
    setSelectedPlaylist([]);
    setModalVisible(true);
    renderModal()
  }catch(err) {
    Alert.alert('Could not add track:', error);
  }
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
>>>>>>> 0152e14 (bug fixes)
      {/* HEADER SECTION WITH CAT LOGO */}
      <View style={styles.header}>
        <Image 
          source={require("./assets/emblem.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>SoundCat</Text>
      </View>

      {/* MAIN BODY SECTION */}
      <View style={styles.content}>
        <Text style={styles.instructions}>
         Select local files to play in app.
        </Text>

        {/* CONTAINER FOR ACTIVE FILE IMPORT ACTIONS */}
        <TouchableOpacity style={styles.importBox} onPress={()=>handleFilePick('man')}>
          <Text style={styles.iconPlaceholder}>📁</Text>
          <Text style={styles.importText}>Manual File Import</Text>
          <Text style={styles.subText}>Manually import songs into playlists</Text>
        </TouchableOpacity>
<<<<<<< HEAD
        {/*
            <TouchableOpacity style={styles.importBox} onPress={()=>handleFilePick('auto')}>
          <Text style={styles.iconPlaceholder}>🤖</Text>
          <Text style={styles.importText}>Folder Sweep</Text>
          <Text style={styles.subText}>Automatically sort a folder of same audio format files into different playlists based on genre, artists, etc.</Text>
        </TouchableOpacity>
        */}
=======
>>>>>>> 0152e14 (bug fixes)
 

        {/* FILE PREVIEW INTERFACE STATUS */}
        {selectedFile && (
          <View style={styles.fileDetailsCard}>
            <Text style={styles.fileLabel}>Selected Audio Track:</Text>
            <Text style={styles.fileName}>{selectedFile.name}</Text>
            <Text style={styles.fileSize}>Size: {selectedFile.size}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
<<<<<<< HEAD
=======
    <SessionProvider>
>>>>>>> 0152e14 (bug fixes)
    <AudioProvider>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,                  
          tabBarActiveTintColor: '#39FF14',     
          tabBarInactiveTintColor: '#aaaaaa',   
          tabBarStyle: {
            backgroundColor: '#1a1a1a',         
            borderTopColor: '#222222',
            height: 60,
            paddingBottom: 8,
          },
        }}
      >
        <Tab.Screen 
          name="Playlists" 
          component={PlaylistScreen} 
          options={{ title: 'My Music' }}
        />
        <Tab.Screen 
          name="Discover" 
          component={DiscoverScreen} 
          options={{ title: 'SoundCloud' }}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ title: 'Account' }}
        />
        
        <Tab.Screen 
          name="Library" 
          component={LibraryScreen} 
          options={{ title: 'Import Music' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    </AudioProvider>
<<<<<<< HEAD
  );
}
=======
</SessionProvider>
  );
}
>>>>>>> 0152e14 (bug fixes)
