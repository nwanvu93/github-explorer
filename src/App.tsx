import * as React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CacheManager } from '@georstat/react-native-image-cache';
import { Dirs } from 'react-native-file-access';

import { Provider } from 'inversify-react';
import { getContainer } from './di/container';

import HomePage from './features/main/presentation/pages/homePage';
import RepoDetailsPage from './features/main/presentation/pages/repoDetailsPage';

type RootStackParamList = {
  Home: undefined;
  Details: { repoId: string };
};

const RootStack = createNativeStackNavigator<RootStackParamList>({
  screens: {
    Home: HomePage,
    Details: {
      screen: RepoDetailsPage,
      options: { title: 'Repository Details' },
    }
  },
});

const Navigation = createStaticNavigation(RootStack);

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 15,
  cacheLimit: 0,
  maxRetries: 2,
  retryDelay: 3000,
  sourceAnimationDuration: 350,
  thumbnailAnimationDuration: 350,
};

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider container={getContainer}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Navigation />
      </SafeAreaProvider>
    </Provider>
  );
}