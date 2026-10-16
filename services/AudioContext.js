
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import TrackPlayer, { Capability } from 'react-native-track-player';

export const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const [playlists, setPlaylists] = useState([
    { id: '1', title: 'All Imported Songs', tracks: [] },
  ]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [activePlaylistId, setActivePlaylistId] = useState('1');

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
      } catch (error) {
        console.log('TrackPlayer setup:', error.message);
      }
    }

    setupPlayer();
  }, []);

  const createPlaylist = useCallback((title) => {
    const cleanTitle = title.trim();

    if (!cleanTitle) {
      throw new Error('Playlist name cannot be empty.');
    }

    const playlist = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: cleanTitle,
      tracks: [],
    };

    setPlaylists((current) => [...current, playlist]);
    return playlist;
  }, []);

  const deletePlaylist = useCallback((playlistId) => {
    if (playlistId === '1') {
      throw new Error('The All Imported Songs playlist cannot be deleted.');
    }

    setPlaylists((current) =>
      current.filter((playlist) => playlist.id !== playlistId)
    );

    setActivePlaylistId((current) =>
      current === playlistId ? '1' : current
    );
  }, []);

  
// update addTracksToPlaylist to normalize incoming tracks (safe)
const addTracksToPlaylist = useCallback((playlistId, newTracks) => {
  const tracksToAdd = (Array.isArray(newTracks) ? newTracks : [newTracks])
    .map((t) => normalizeTrack(t, t.source || (t.id && String(t.id).startsWith('sc:') ? 'soundcloud' : 'local')));

  setPlaylists((current) =>
    current.map((playlist) => {
      if (playlist.id !== playlistId) return playlist;

      const existingTracks = Array.isArray(playlist.tracks) ? playlist.tracks : [];

      const knownIds = new Set(existingTracks.map((track) => String(track.id)));

      return {
        ...playlist,
        tracks: [
          ...existingTracks,
          ...tracksToAdd.filter((track) => !knownIds.has(String(track.id))),
        ],
      };
    })
  );
}, []);

// Remove a track from a playlist
const removeTrackFromPlaylist = useCallback((playlistId, trackId) => {
  setPlaylists((current) =>
    current.map((playlist) => {
      if (playlist.id !== playlistId) return playlist;
      return {
        ...playlist,
        tracks: (playlist.tracks || []).filter((t) => String(t.id) !== String(trackId)),
      };
    })
  );
}, []);

// Move track between playlists (atomic)
const moveTrackBetweenPlaylists = useCallback((fromPlaylistId, toPlaylistId, trackId) => {
  setPlaylists((current) => {
    let trackToMove = null;

    // First, remove from source and capture the track object
    const removed = current.map((pl) => {
      if (pl.id === fromPlaylistId) {
        const remaining = (pl.tracks || []).filter((t) => {
          if (String(t.id) === String(trackId)) {
            trackToMove = t;
            return false;
          }
          return true;
        });
        return { ...pl, tracks: remaining };
      }
      return pl;
    });

    // If not found, return unchanged
    if (!trackToMove) return current;

    // Then, add to target (if not duplicate)
    return removed.map((pl) => {
      if (pl.id === toPlaylistId) {
        const known = new Set((pl.tracks || []).map((t) => String(t.id)));
        if (known.has(String(trackId))) return pl;
        return { ...pl, tracks: [...(pl.tracks || []), trackToMove] };
      }
      return pl;
    });
  });
}, []);
  const addTrackToPlaylist = useCallback((playlistId, track) => {
    addTracksToPlaylist(playlistId, [track]);
  }, [addTracksToPlaylist]);
  // Compatibility with the original singular method name.
  const playTrackDirectly = async (track) => {
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: String(track.id),
        url: track.url,
        title: track.title || track.name || 'Unknown Track',
        artist: track.artist || 'Unknown Artist',
        ...(track.artwork ? { artwork: track.artwork } : {}),
      });
      await TrackPlayer.play();
      setCurrentTrack(track);
    } catch (error) {
      console.error('Playback engine error:', error);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        playlists,
        setPlaylists,
        currentTrack,
        activePlaylistId,
        setActivePlaylistId,
        createPlaylist,
        deletePlaylist,
        addTracksToPlaylist,
        addTrackToPlaylist,
        playTrackDirectly,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}