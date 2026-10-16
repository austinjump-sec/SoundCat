import React, { useState } from 'react';
import { AudioProvider } from './AudioContext.js'
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Styles and External Tabs
import styles from './components/styles.js';
import DiscoverScreen from './components/search.js';
import SettingsScreen from './components/account.js';
import PlaylistScreen from './components/playlists.js'
const Tab = createBottomTabNavigator();

// FIX 1: Extracted your local library interface layout into its own Screen component
function LibraryScreen() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFilePick = async () => {
    Alert.alert('Import File', 'File browser opened successfully.');
    setSelectedFile({ name: 'example_track.mp3', size: '4.2 MB' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

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
        <TouchableOpacity style={styles.importBox} onPress={handleFilePick}>
          <Text style={styles.iconPlaceholder}>📁</Text>
          <Text style={styles.importText}>Manual File Import</Text>
          <Text style={styles.subText}>Manually import songs into playlists</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.importBox} onPress={handleFilePick}>
          <Text style={styles.iconPlaceholder}>🤖</Text>
          <Text style={styles.importText}>Folder Sweep</Text>
          <Text style={styles.subText}>Automatically sort a folder of same audio format files into different playlists based on genre, artists, etc.</Text>
        </TouchableOpacity>

        {/* FILE PREVIEW INTERFACE STATUS */}
        {selectedFile && (
          <View style={styles.fileDetailsCard}>
            <Text style={styles.fileLabel}>Staged Audio Track:</Text>
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
  );
}
