import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { isUserAuthenticated } from '@/utilities/auth';
import { Provider } from 'react-redux';
import { store } from '@/components/redux/store';
import Toast from 'react-native-toast-message';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await isUserAuthenticated();
      if (!isAuthenticated) {
        router.replace("login");
      }
    };
    checkAuth();
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    <Toast />
    </ThemeProvider>
    </QueryClientProvider>
    </Provider>
  );
}
