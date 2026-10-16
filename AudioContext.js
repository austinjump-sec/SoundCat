import React, { createContext, useState, useEffect } from 'react';
import TrackPlayer, { Capability } from 'react-native-track-player';

export const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [playlists, setPlaylists] = useState([
    { id: '1', title: 'Liked Songs', tracks: [] },
  ]);
  const [currentTrack, setCurrentTrack] = useState(null);

  // Initialize playback system on app start
  useEffect(() => {
    async function setupPlayer() {
      try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
          ],
        });
      } catch (e) {
        console.log("Player already initialized or error encountered:", e);
      }
    }
    setupPlayer();
  }, []);

  // Action 1: Appends a sound file to a specific playlist array
  const addTrackToPlaylist = (playlistId, trackPayload) => {
    setPlaylists(prevPlaylists => 
      prevPlaylists.map(playlist => {
        if (playlist.id === playlistId) {
          // Track payload format: { id, title, artist, url, artwork }
          return { ...playlist, tracks: [...playlist.tracks, trackPayload] };
        }
        return playlist;
      })
    );
  };

  // Action 2: Clear audio engine pipeline and launch a selected track
  const playTrackDirectly = async (track) => {
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: track.id,
        url: track.url, // Supports local filepath or remote URLs (SoundCloud stream)
        title: track.title,
        artist: track.artist || 'Unknown Artist',
        artwork: track.artwork,
      });
      await TrackPlayer.play();
      setCurrentTrack(track);
    } catch (error) {
      console.error("Playback engine error:", error);
    }
  };

  return (
    <AudioContext.Provider value={{ playlists, setPlaylists, addTrackToPlaylist, playTrackDirectly, currentTrack }}>
      {children}
    </AudioContext.Provider>
  );
}
