import { contactModel } from 'entities/contact';
import { FormAddContact } from 'features/form-add-contact';
import React from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  Dialog,
  Portal,
  Text,
} from 'react-native-paper';
import { ScreenProps, useAppDispatch, useAppSelector } from 'shared';

type AddContactProps = {} & ScreenProps<'AddContact'>;

export const AddContact = ({ navigation }: AddContactProps) => {
  const dispatch = useAppDispatch();
  const status = contactModel.selectors.getStatusAdd();
  const error = useAppSelector(state => state.contact.errorAdd);

  React.useEffect(() => {
    if (status === 'succeeded') {
      Alert.alert('eContact', 'Registration success', [
        {
          text: 'OK',
          onPress: async () => {
            await dispatch(contactModel.getAllContact());
            navigation.goBack();
          },
        },
      ]);
    }
    if (status === 'failed') {
      Alert.alert('eContact', error || '', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
    }
    return () => {
      dispatch(contactModel.actions.resetAddStatus());
    };
  }, [status, error, dispatch, navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Appbar.Header elevated>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Contact" />
      </Appbar.Header>

      <FormAddContact
        onSubmit={data => {
          data.age = parseInt(`${data.age}`, 10);
          delete data.id;
          dispatch(contactModel.saveContact(data));
        }}
      />

      <Portal>
        <Dialog visible={status === 'pending'} dismissable>
          <Dialog.Title>Add Contact</Dialog.Title>
          <Dialog.Content>
            <View style={styles.flexing}>
              <ActivityIndicator size="large" style={styles.marginRight} />
              <Text>Loading.....</Text>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flexing: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: 16,
  },
});
