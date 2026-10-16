<<<<<<< HEAD
import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { AudioContext } from '../AudioContext.js'; // Imports your global shared audio state engine

export default function PlaylistTracksWidget({ playlistId, onClose }) {
  // Extract global playlists data and player control sequences from your context brain
  const { playlists, playTrackDirectly } = useContext(AudioContext);

  // Locate the target playlist using the passed prop configuration identifier
  const activePlaylist = playlists.find(pl => pl.id === playlistId);

  // Safeguard view block if the playlist object doesn't exist or is empty
  if (!activePlaylist) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.infoText}>Playlist selection not resolved.</Text>
      </View>
    );
  }

  // Functional Callback: Handles the playlist press action by starting track playback
  const handleTrackPress = async (track) => {
    try {
      await playTrackDirectly(track);
      alert(`Now playing: ${track.title}`);
    } catch (error) {
      alert('Unable to load audio resource engine.');
    }
  };

=======
// Add imports
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, Modal, Pressable } from 'react-native';
import { AudioContext } from '../services/AudioContext.js';

export default function PlaylistTracksWidget({ playlistId, onClose }) {
  const { playlists, playTrackDirectly, removeTrackFromPlaylist, moveTrackBetweenPlaylists } = useContext(AudioContext);
  const [moveModalVisible, setMoveModalVisible] = useState(false);
  const [trackToMove, setTrackToMove] = useState(null);

  const activePlaylist = playlists.find(pl => pl.id === playlistId);
  if (!activePlaylist) return <View><Text>Playlist selection not resolved.</Text></View>;

  const handleTrackActions = (item) => {
    Alert.alert(
      item.title,
      undefined,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Move to Playlist',
          onPress: () => {
            setTrackToMove(item);
            setMoveModalVisible(true);
          },
        },
        {
          text: 'Delete from Playlist',
          style: 'destructive',
          onPress: () => {
            removeTrackFromPlaylist(playlistId, item.id);
          },
        },
      ],
      { cancelable: true }
    );
  };


>>>>>>> 0152e14 (bug fixes)
  // Iterator Item Component renderer block
  const renderTrackRow = ({ item, index }) => (
    <TouchableOpacity 
      style={styles.trackRow} 
      onPress={() => handleTrackPress(item)}
<<<<<<< HEAD
=======

      onLongPress={() => handleTrackActions(item)}
>>>>>>> 0152e14 (bug fixes)
      activeOpacity={0.7}
    >
      {/* Index Tracker counter column */}
      <Text style={styles.trackIndex}>{index + 1}</Text>
      
      <Image 
        source={{ uri: item.artwork || 'https://placeholder.com🎵' }} 
        style={styles.trackArtwork} 
      />

      <View style={styles.trackMetadata}>
        <Text style={styles.trackTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.trackArtist} numberOfLines={1}>{item.artist || 'Unknown Artist'}</Text>
      </View>

      <Text style={styles.playIcon}>▶</Text>
    </TouchableOpacity>
  );
<<<<<<< HEAD

=======
  const handleMoveTo = (targetPlaylistId) => {
    if (targetPlaylistId === playlistId) {
      setMoveModalVisible(false);
      setTrackToMove(null);
      return;
    }
    moveTrackBetweenPlaylists(playlistId, targetPlaylistId, trackToMove.id);
    setMoveModalVisible(false);
    setTrackToMove(null);
  };
>>>>>>> 0152e14 (bug fixes)
  return (
    <View style={styles.widgetContainer}>
      {/* WIDGET HEADER METADATA PANEL */}
      <View style={styles.widgetHeader}>
        <View>
          <Text style={styles.widgetTitle}>{activePlaylist.title}</Text>
          <Text style={styles.widgetSub}>{activePlaylist.tracks.length} Tracks Stored</Text>
        </View>
        {onClose && (
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* REACT NATIVE OPTIMIZED AUTOMATED TRACK LOOP ITERATOR */}
      <FlatList
        data={activePlaylist.tracks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTrackRow}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyView}>
            <Text style={styles.emptyText}>This playlist has no tracks yet.</Text>
            <Text style={styles.emptySubText}>Use manual file import or SoundCloud search to build a collection.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  widgetContainer: {
    flex: 1,
    backgroundColor: '#161616', // Dark ambient backdrop tinting
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#262626',
    overflow: 'hidden',
<<<<<<< HEAD
=======
    marginTop:70,
>>>>>>> 0152e14 (bug fixes)
  },
  widgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#262626',
  },
  widgetTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  widgetSub: {
    color: '#666666',
    fontSize: 12,
    marginTop: 2,
  },
  closeButton: {
    backgroundColor: '#262626',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  closeButtonText: {
    color: '#aaaaaa',
    fontSize: 12,
    fontWeight: '600',
  },
  listContainer: {
    padding: 12,
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  trackIndex: {
    color: '#444444',
    fontSize: 14,
    fontWeight: '700',
    width: 24,
    textAlign: 'center',
  },
  trackArtwork: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginLeft: 8,
    backgroundColor: '#1a1a1a',
  },
  trackMetadata: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  trackTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  trackArtist: {
    color: '#888888',
    fontSize: 12,
    marginTop: 1,
  },
  playIcon: {
    color: '#39FF14', // Neon highlight matching signature theme guidelines
    fontSize: 14,
    paddingHorizontal: 8,
  },
<<<<<<< HEAD
  errorContainer: {
    padding: 24,
    alignItems: 'center',
  },
  infoText: {
    color: '#666666',
  },
=======
>>>>>>> 0152e14 (bug fixes)
  emptyView: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    color: '#888888',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptySubText: {
    color: '#444444',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 16,
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> 0152e14 (bug fixes)
