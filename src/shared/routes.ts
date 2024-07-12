import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import type { Contact } from 'shared';

export type RootStackParamList = {
  Splash: undefined;
  ContactList: undefined;
  ContactDetails: { data: Contact };
  AddContact: undefined;
  EditContact: undefined;
};

export type ScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type NavProps<Screen extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, Screen>;
