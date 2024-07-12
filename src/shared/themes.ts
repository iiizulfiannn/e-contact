import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import merge from 'deepmerge';
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  configureFonts,
} from 'react-native-paper';
import { MD3Typescale } from 'react-native-paper/lib/typescript/types';
import { EUCLID_MEDIUM, EUCLID_REGULAR } from './fonts';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const fontsConfig: MD3Typescale = {
  // Display
  displaySmall: {
    fontFamily: EUCLID_REGULAR,
    fontSize: 36,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 44,
  },
  displayMedium: {
    fontFamily: EUCLID_REGULAR,
    fontSize: 45,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 52,
  },
  displayLarge: {
    fontFamily: EUCLID_REGULAR,
    fontSize: 57,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 64,
  },

  // Headline
  headlineSmall: {
    fontFamily: EUCLID_REGULAR,
    fontSize: 24,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 32,
  },
  headlineMedium: {
    fontFamily: EUCLID_REGULAR,
    fontSize: 28,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 36,
  },
  headlineLarge: {
    fontFamily: EUCLID_REGULAR,
    fontSize: 32,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 40,
  },

  // Title
  titleSmall: {
    fontFamily: EUCLID_MEDIUM,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  titleMedium: {
    fontFamily: EUCLID_MEDIUM,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  titleLarge: {
    fontFamily: EUCLID_REGULAR,
    fontSize: 22,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 28,
  },

  // Label
  labelSmall: {
    fontFamily: EUCLID_MEDIUM,
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelMedium: {
    fontFamily: EUCLID_MEDIUM,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelLarge: {
    fontFamily: EUCLID_MEDIUM,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
    lineHeight: 20,
  },

  // Body
  bodySmall: {
    fontFamily: EUCLID_REGULAR,
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.4,
    lineHeight: 16,
  },
  bodyMedium: {
    fontFamily: EUCLID_REGULAR,
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.25,
    lineHeight: 20,
  },
  bodyLarge: {
    fontFamily: EUCLID_REGULAR,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.15,
    lineHeight: 24,
  },

  default: {
    fontFamily: EUCLID_REGULAR,
    fontWeight: '400',
    letterSpacing: 0,
  },
};

export const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
export const CombinedDarkTheme = merge(
  {
    ...MD3DarkTheme,
    fonts: configureFonts({
      config: fontsConfig,
    }),
  },
  DarkTheme,
);
