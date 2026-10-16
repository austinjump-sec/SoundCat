import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,

  TextInput,
  TouchableOpacity,
  Alert,
  Linking,
  ScrollView,
} from 'react-native';

import {
  saveTokens,
  clearTokens,
  getAccessToken,
} from '../services/tokenStore.js';

import stylesH from './styles.js';

export default function SettingsScreen() {
  const [userSession, setUserSession] = useState(null);
const [customToken, setCustomToken] = useState('');
const [tokenConfigured, setTokenConfigured] = useState(false);
<<<<<<< HEAD

  useEffect(() => {
=======
const [sessionState, setSessionState] = useState('Ghost')
  useEffect(() => {
  setSessionState("Ghost")
>>>>>>> 0152e14 (bug fixes)
  let mounted = true;

  getAccessToken()
    .then(token => {
      if (mounted) setTokenConfigured(Boolean(token));
    })
    .catch(() => {
      if (mounted) setTokenConfigured(false);
<<<<<<< HEAD
=======

>>>>>>> 0152e14 (bug fixes)
    });

  return () => {
    mounted = false;
<<<<<<< HEAD
=======
    
>>>>>>> 0152e14 (bug fixes)
  };
}, []);

const CLIENT_ID = 'YOUR_SOUNDCLOUD_CLIENT_ID';
const REDIRECT_URI = 'soundcat://oauth'; // Custom deep link schema configured for your app
const OAUTH_URL = `https://soundcloud.com{CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=non-expiring`;

  // Account session state management

const handleSaveToken = async () => {
  const token = customToken.trim();

  if (!token) {
    Alert.alert('Missing token', 'Enter a token first.');
    return;
  }

  try {
    await saveTokens({ accessToken: token });
    setCustomToken('');
    setTokenConfigured(true);
<<<<<<< HEAD
=======
    setSessionState("Connected")
>>>>>>> 0152e14 (bug fixes)
    Alert.alert('Saved', 'Your token was stored securely on this device.');
  } catch {
    Alert.alert('Error', 'Could not securely save the token.');
  }
};

const handleRemoveToken = async () => {
  try {
    await clearTokens();
    setCustomToken('');
    setTokenConfigured(false);
<<<<<<< HEAD
    Alert.alert('Removed', 'Saved credentials were deleted.');
=======
    setSessionState('Ghost')
    Alert.alert('Removed', 'Saved credentials were deleted.');

>>>>>>> 0152e14 (bug fixes)
  } catch {
    Alert.alert('Error', 'Could not remove saved credentials.');
  }
};

  // Path 1: Initialize Guest Credentials Local Session
  const handleCreateGuestAccount = () => {
    const guestPayload = {
      username: `SoundCat_Guest_${Math.floor(1000 + Math.random() * 9000)}`,
<<<<<<< HEAD
      type: 'Guest Session',
      status: 'Offline Mode Only',
      avatar: require("../assets/bsod.png")
=======
      type: 'Ghost Session',
      status: 'Offline Mode',
>>>>>>> 0152e14 (bug fixes)
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
<<<<<<< HEAD
=======
        setSessionState("Connected")
>>>>>>> 0152e14 (bug fixes)
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
    handleDisconnectSoundCloud()
  };
  const handleDisconnectSoundCloud = async () => {
  try {
    await clearTokens();
    setTokenConfigured(false);
    setCustomToken('');
    setUserSession(null);

    Alert.alert('Disconnected', 'Saved credentials were removed.');
  } catch {
    Alert.alert('Error', 'Could not remove saved credentials.');
  }
};

  return (        
    <ScrollView>
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
<<<<<<< HEAD
              <Text style={localStyles.iconSpacer}>👤</Text>
              <Text style={localStyles.guestBtnText}>Continue as Guest</Text>
=======
              <Text style={localStyles.iconSpacer}> 👻</Text>
              <Text style={localStyles.guestBtnText}>Continue as Ghost</Text>
>>>>>>> 0152e14 (bug fixes)
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
  <View style={localStyles.tokenSection}>
  <Text style={localStyles.tokenTitle}>
    Advanced API Credentials
  </Text>

  <Text style={localStyles.tokenDescription}>
    Store a supported SoundCloud access token securely on this device.
    Never share your token with anyone.
  </Text>

  <TextInput
    style={localStyles.tokenInput}
    value={customToken}
    onChangeText={setCustomToken}
    placeholder="Paste access token"
    placeholderTextColor="#777777"
    secureTextEntry
    autoCapitalize="none"
    autoCorrect={false}
    spellCheck={false}
  />

  <TouchableOpacity
    style={localStyles.saveTokenButton}
    onPress={handleSaveToken}
  >
    <Text style={localStyles.saveTokenText}>Save Token Securely</Text>
  </TouchableOpacity>

  {tokenConfigured && (
    <TouchableOpacity
      style={localStyles.removeTokenButton}
      onPress={handleRemoveToken}
    >
      <Text style={localStyles.removeTokenText}>
        Remove Saved Token
      </Text>
    </TouchableOpacity>
  )}
</View>
    
</View>
</View>
</ScrollView>
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
    marginTop: 25,
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
  tokenSection: {
  marginTop: 24,
  padding: 18,
  backgroundColor: '#1a1a1a',
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#292929',
},
tokenTitle: {
  color: '#ffffff',
  fontSize: 17,
  fontWeight: '700',
  marginBottom: 8,
},
tokenDescription: {
  color: '#aaaaaa',
  fontSize: 13,
  lineHeight: 19,
  marginBottom: 16,
},
tokenInput: {
  backgroundColor: '#121212',
  borderWidth: 1,
  borderColor: '#333333',
  borderRadius: 8,
  padding: 12,
  color: '#ffffff',
  marginBottom: 12,
},
saveTokenButton: {
  backgroundColor: '#39FF14',
  borderRadius: 8,
  padding: 13,
  alignItems: 'center',
},
saveTokenText: {
  color: '#121212',
  fontWeight: '700',
},
removeTokenButton: {
  marginTop: 12,
  padding: 12,
  alignItems: 'center',
},
removeTokenText: {
  color: '#ff6666',
  fontWeight: '600',
},
<<<<<<< HEAD
});
=======
});
>>>>>>> 0152e14 (bug fixes)
