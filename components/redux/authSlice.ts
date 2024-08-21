import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { AppDispatch } from './store';

type AuthState = {
  session: string | null;
  isLoading: boolean;
};

const initialState: AuthState = {
  session: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<string | null>) {
      state.session = action.payload;
      state.isLoading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    clearSession(state) {
      state.session = null;
      state.isLoading = false;
    },
  },
});

export const { setSession, setLoading, clearSession } = authSlice.actions;

export const signIn = (token: string) => async (dispatch: AppDispatch) => {
  await SecureStore.setItemAsync('authToken', token);
  dispatch(setSession(token));
};

export const signOut = () => async (dispatch: AppDispatch) => {
  await SecureStore.deleteItemAsync('authToken');
  dispatch(clearSession());
};

export default authSlice.reducer;
