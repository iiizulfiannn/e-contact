import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { Routes } from './routes';
import { store } from './store';
import { CombinedDarkTheme } from 'shared';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

export const App = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={CombinedDarkTheme}>
        <SafeAreaView style={styles.safeAreaView}>
          <NavigationContainer theme={CombinedDarkTheme}>
            <StatusBar barStyle="light-content" />
            <Routes />
          </NavigationContainer>
        </SafeAreaView>
      </PaperProvider>
    </ReduxProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: { flex: 1 },
});
