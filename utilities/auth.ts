// authUtils.ts

import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'authToken';



// Retrieve token
export const getToken = async (): Promise<string | null> => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error('Error retrieving token', error);
    return null;
  }
};

// Remove token
export const removeToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing token', error);
  }
};

// Check if user is authenticated
export const isUserAuthenticated = async (): Promise<boolean> => {
  try {
    const token = await getToken();
    // console.log(token,"token")
    return token !== null;
  } catch (error) {
    console.error('Error checking user authentication', error);
    return false;
  }
};

// Get Authorization header
export async function getAuthHeader() {
    const token = await SecureStore.getItemAsync('authToken');
    if (token) {
      return {
        Authorization: `${token}`, // or just return the token without "Bearer"
      };
    }
    return null;
  }
  
 
