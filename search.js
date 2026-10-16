import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Keyboard
} from 'react-native';

// NOTE: Official SoundCloud application registration requires an active 
// SoundCloud Artist Pro account. Replace this placeholder with your authenticated token.
const SOUNDCLOUD_ACCESS_TOKEN = 'YOUR_SOUNDCLOUD_ACCESS_TOKEN';

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const searchSoundCloud = async () => {
    if (!searchQuery.trim()) return;
    
    Keyboard.dismiss();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      // Endpoint syntax follows the SoundCloud Public OpenAPI Specification
      const response = await fetch(
        `https://soundcloud.com{encodeURIComponent(searchQuery)}&limit=20`,
        {
          method: 'GET',
          headers: {
            'Authorization': `OAuth ${SOUNDCLOUD_ACCESS_TOKEN}`, // Required Header
            'Accept': 'application/json; charset=utf-8',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: Status ${response.status}`);
      }

      const data = await response.json();
      
      // SoundCloud returns a track collection list or a linked_partitioned object
      const results = data.collection ? data.collection : data;
      setTracks(results);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to fetch tracks. Check your token or network connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderTrackItem = ({ item }) => (
    <View style={styles.trackCard}>
      <Image
        style={styles.artwork}
        source={
          item.artwork_url
            ? { uri: item.artwork_url.replace('-large', '-t500x500') } // Grabs higher resolution artwork
            : { uri: 'https://placeholder.com🎵' }
        }
      />
      <View style={styles.trackDetails}>
        <Text style={styles.trackTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.trackArtist} numberOfLines={1}>
          {item.user?.username || 'Unknown Artist'}
        </Text>
        <Text style={styles.trackDuration}>
          {Math.floor(item.duration / 60000)}m {Math.floor((item.duration % 60000) / 1000)}s
        </Text>
      </View>
    </View>
  );

  return (

    <View style={styles.container}>
    
       <View style={styles.header}>
        <Image 
          source={require("../assets/emblem.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>SoundCat</Text>
      </View>
      {/* SEARCH BAR CONTAINER */}

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search tracks, artists, podcasts..."
          placeholderTextColor="#666666"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={searchSoundCloud}
          returnKeyType="search"
        />
        
        <TouchableOpacity style={styles.searchButton} onPress={searchSoundCloud}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* FEEDBACK & RESULTS LAYOUTS */}
      {isLoading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#39FF14" />
        </View>
      )}

      {errorMsg && (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      )}

      {!isLoading && !errorMsg && tracks.length === 0 && (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>Discover online tracks via SoundCloud.</Text>
        </View>
      )}

      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTrackItem}
        contentContainerStyle={styles.listContainer}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Pure deep black matching your theme
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
  },
  searchInput: {
    flex: 1,
    height: 45,
    backgroundColor: '#181818',
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#ffffff',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#333333',
  },
  searchButton: {
    backgroundColor: '#39FF14', // Vibrant neon green
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 10,
  },
  searchButtonText: {
    color: '#121212',
    fontWeight: '700',
    fontSize: 14,
  },
  listContainer: {
    padding: 16,
  },
  trackCard: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: '#39FF14',
  },
  artwork: {
    width: 60,
    height: 60,
    borderRadius: 6,
    backgroundColor: '#141414',
  },
  trackDetails: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  trackTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  trackArtist: {
    color: '#aaaaaa',
    fontSize: 13,
    marginBottom: 4,
  },
  trackDuration: {
    color: '#666666',
    fontSize: 11,
  },
  centered: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    color: '#666666',
    fontSize: 14,
    textAlign: 'center',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    textAlign: 'center',
  },
    header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
    backgroundColor: '#1a1a1a',
  },
  logo: {
    width: 44,
    height: 44,
    marginRight: 14,
  },
  headerTitle: {
    color: '#39FF14', // Vibrant neon green matching the accent highlights
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
