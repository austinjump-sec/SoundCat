import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { AudioContext } from './AudioContext';
import PlaylistTracksWidget from './components/playlistTracking';
export default function PlayerScreen() {
  const [activePlaylistId, setActivePlaylistId] = useState(null)
  const handlePlaylistPress = (id) => {
    setActivePlaylistId(id)
  }
  // Pull active status and control parameters directly from Context 
  const { currentTrack } = useContext(AudioContext);

  const togglePlayback = async () => {
    const state = await TrackPlayer.getPlaybackState();
    if (state.state === 'playing') {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  if (!currentTrack) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No track selected for playback.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={localStyles.container}>
      <Image source={{ uri: currentTrack.artwork }} style={styles.albumArt} />
      <Text style={styles.title}>{currentTrack.title}</Text>
      <Text style={styles.artist}>{currentTrack.artist}</Text>

      <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
        <Text style={styles.playButtonText}>Play / Pause</Text>
      </TouchableOpacity>
  
     {activePlaylistId && (
        <View style={StyleSheet.absoluteFillObject}> 
          <PlaylistTracksWidget 
            playlistId={activePlaylistId} 
            onClose={() => setActivePlaylistId(null)} 
          />
        </View>
      )}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center', padding: 24 },
  albumArt: { width: 250, height: 250, borderRadius: 12, marginBottom: 24, backgroundColor: '#1a1a1a' },
  title: { color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 4 },
  artist: { color: '#aaa', fontSize: 16, marginBottom: 32 },
  playButton: { backgroundColor: '#39FF14', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 30 },
  playButtonText: { color: '#121212', fontWeight: '700', fontSize: 16 },
  emptyText: { color: '#666' }
});
