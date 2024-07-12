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

type EditContactProps = {} & ScreenProps<'EditContact'>;

export const EditContact = ({ navigation }: EditContactProps) => {
  const dispatch = useAppDispatch();
  const contact = contactModel.selectors.getSelectedContact();
  const status = contactModel.selectors.getStatusUpdate();
  const error = useAppSelector(state => state.contact.errorUpdate);

  React.useEffect(() => {
    if (status === 'succeeded') {
      Alert.alert('eContact', 'Update success', [
        {
          text: 'OK',
          onPress: async () => {
            await dispatch(contactModel.getContactById(contact.id!!));
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
      dispatch(contactModel.actions.resetUpdateStatus());
    };
  }, [status, error, dispatch, contact.id, navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Appbar.Header elevated>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Edit Contact" />
      </Appbar.Header>

      <FormAddContact
        initialState={contact}
        onSubmit={item => {
          item.age = parseInt(`${item.age}`, 10);
          delete item.id;
          dispatch(contactModel.editContact({ id: contact.id!!, body: item }));
        }}
      />

      <Portal>
        <Dialog visible={status === 'pending'} dismissable>
          <Dialog.Title>Update Contact</Dialog.Title>
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
