
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'soundcat.soundcloud.access_token';
const REFRESH_KEY = 'soundcat.soundcloud.refresh_token';

export async function saveTokens({ accessToken, refreshToken }) {
  if (!accessToken || typeof accessToken !== 'string') {
    throw new Error('A valid access token is required.');
  }

  await SecureStore.setItemAsync(TOKEN_KEY, accessToken);

  if (refreshToken) {
    await SecureStore.setItemAsync(REFRESH_KEY, refreshToken);
  }
}

export async function getAccessToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function getRefreshToken() {
  return SecureStore.getItemAsync(REFRESH_KEY);
}

export async function clearTokens() {
  await Promise.all([
    SecureStore.deleteItemAsync(TOKEN_KEY),
    SecureStore.deleteItemAsync(REFRESH_KEY),
  ]);
}
