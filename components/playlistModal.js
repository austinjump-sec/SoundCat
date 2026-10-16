
import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

export default function PlaylistPickerModal({
  visible,
  playlists,
  selectedPlaylist,
  setSelectedPlaylist,
  onAdd,
  onCancel,
}) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Add To Playlist
          </Text>

          <FlatList
            data={playlists}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => {
              const selected = selectedPlaylist.some(
                id => String(id) === String(item.id)
              );

              return (
                <Pressable
                  onPress={() => {
                    setSelectedPlaylist(prev =>
                      prev.some(
                        id => String(id) === String(item.id)
                      )
                        ? prev.filter(
                            id => String(id) !== String(item.id)
                          )
                        : [...prev, item.id]
                    );
                  }}
                  style={{
                    padding: 16,
                    backgroundColor: selected
                      ? '#263626'
                      : '#1a1a1a',
                    borderWidth: 1,
                    borderColor: selected
                      ? '#39FF14'
                      : '#333333',
                    borderRadius: 8,
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: '#fff' }}>
                    {selected ? '✓  ' : ''}
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

          <TouchableOpacity
            style={styles.modalAddBtn}
            onPress={onAdd}
          >
            <Text style={styles.modalAddText}>
              Add to Playlist
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modalCancelBtn}
            onPress={onCancel}
          >
            <Text style={styles.modalCancelText}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
