import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddContact } from 'pages/contact-add';
import { ContactDetails } from 'pages/contact-details';
import { EditContact } from 'pages/contact-edit';
import { ContactList } from 'pages/contact-list';
import { Splash } from 'pages/splash';
import React from 'react';
import { RootStackParamList } from 'shared';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const Routes = () => {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <RootStack.Screen name="Splash" component={Splash} />
      <RootStack.Screen name="ContactList" component={ContactList} />
      <RootStack.Screen name="ContactDetails" component={ContactDetails} />
      <RootStack.Screen name="AddContact" component={AddContact} />
      <RootStack.Screen name="EditContact" component={EditContact} />
    </RootStack.Navigator>
  );
};
