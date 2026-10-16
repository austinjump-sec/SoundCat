import React, { useState } from 'react';
import { 
  View, 
  Image, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Linking, 
  Alert 
} from 'react-native'; 
import stylesH from './styles.js'; // Imports your globally created core app styling

// OAuth Configurations matching SoundCloud API specifications
const CLIENT_ID = 'YOUR_SOUNDCLOUD_CLIENT_ID';
const REDIRECT_URI = 'soundcat://oauth'; // Custom deep link schema configured for your app
const OAUTH_URL = `https://soundcloud.com{CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=non-expiring`;

export default function SettingsScreen() {
  // Account session state management
  const [userSession, setUserSession] = useState(null);

  // Path 1: Initialize Guest Credentials Local Session
  const handleCreateGuestAccount = () => {
    const guestPayload = {
      username: `SoundCat_Guest_${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'Guest Session',
      status: 'Offline Mode Only',
      avatar: require("../assets/bsod.png")
    };
    setUserSession(guestPayload);
    Alert.alert('Session Initialized', `Signed in locally as ${guestPayload.username}`);
  };

  // Path 2: Launch External Secure OAuth Browser Routine
  const handleSoundCloudOAuth = async () => {
    if (CLIENT_ID === 'YOUR_SOUNDCLOUD_CLIENT_ID') {
      Alert.alert('Configuration Required', 'Please supply an authenticated Client ID registry token inside SettingsScreen.js first.');
      return;
    }

    try {
      const supported = await Linking.canOpenURL(OAUTH_URL);
      if (supported) {
        await Linking.openURL(OAUTH_URL);
      } else {
        Alert.alert('Error', 'Unable to resolve browser launch path to SoundCloud auth servers.');
      }
    } catch (error) {
      console.error('OAuth Link Failure:', error);
    }
  };

  // Path 3: Purge Profile Session State
  const handleSignOut = () => {
    setUserSession(null);
  };

  return (        
    <View style={localStyles.container}>
      {/* HEADER ROW BAR WITH BRAND EMBLEM */}
      <View style={stylesH.header}>
        <Image 
          source={require("../assets/emblem.png")}
          style={stylesH.logo}
          resizeMode="contain"
        />
        <Text style={stylesH.headerTitle}>SoundCat</Text>
      </View>

      {/* CORE CONTROL CONTAINER BODY */}
      <View style={localStyles.content}>
        {!userSession ? (
          // USER DISCONNECTED VIEW STATE
          <View style={localStyles.authBox}>
            <Text style={localStyles.titleText}>Account Profile</Text>
            <Text style={localStyles.subText}>
              Connect with your SoundCloud account to sync online tracks, or initialize an offline guest profile session.
            </Text>

            {/* OAUTH CONNECT INTERACTIVE ACTION BUTTON */}
            <TouchableOpacity 
              style={[localStyles.actionButton, localStyles.soundcloudBtn]} 
              onPress={handleSoundCloudOAuth}
            >
              <Text style={localStyles.iconSpacer}>🧡</Text>
              <Text style={localStyles.oauthBtnText}>Connect SoundCloud</Text>
            </TouchableOpacity>

            {/* GUEST ACCESS INTERACTIVE ACTION BUTTON */}
            <TouchableOpacity 
              style={[localStyles.actionButton, localStyles.guestBtn]} 
              onPress={handleCreateGuestAccount}
            >
              <Text style={localStyles.iconSpacer}>👤</Text>
              <Text style={localStyles.guestBtnText}>Continue as Guest</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // USER ACTIVE SESSION PREVIEW CARD
          <View style={localStyles.profileCard}>
            <Image source={{ uri: userSession.avatar }} style={localStyles.avatarImg} />
            <View style={localStyles.profileInfo}>
              <Text style={localStyles.profileName}>{userSession.username}</Text>
              <Text style={localStyles.profileBadge}>{userSession.type}</Text>
              <Text style={localStyles.profileStatus}>{userSession.status}</Text>
            </View>
            <TouchableOpacity style={localStyles.signOutBtn} onPress={handleSignOut}>
              <Text style={localStyles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

// Local UI Styling Sheet Extensions matching your existing Theme palette
const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Matches global dark mode
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  authBox: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#222222',
    alignItems: 'center',
  },
  titleText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  subText: {
    color: '#aaaaaa',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  soundcloudBtn: {
    backgroundColor: '#FF5500', // Iconic SoundCloud Brand Orange
  },
  guestBtn: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#39FF14', // Vibrant Neon Accent color matching layout highlight tokens
  },
  oauthBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
  guestBtnText: {
    color: '#39FF14',
    fontWeight: '700',
    fontSize: 15,
  },
  iconSpacer: {
    fontSize: 18,
    marginRight: 10,
  },
  profileCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#39FF14',
  },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#121212',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  profileBadge: {
    color: '#39FF14',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  profileStatus: {
    color: '#666666',
    fontSize: 11,
    marginTop: 2,
  },
  signOutBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#262626',
  },
  signOutText: {
    color: '#ff4444',
    fontSize: 12,
    fontWeight: '600',
  },
});
