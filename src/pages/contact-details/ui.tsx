import { contactModel } from 'entities/contact';
import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import {
  Appbar,
  Avatar,
  Button,
  Dialog,
  Divider,
  List,
  Portal,
  Text,
} from 'react-native-paper';
import {
  isValidURL,
  Loading,
  ScreenProps,
  Space,
  useAppDispatch,
  useAppSelector,
} from 'shared';

type ContactDetailsProps = {} & ScreenProps<'ContactDetails'>;

export const ContactDetails = ({ navigation, route }: ContactDetailsProps) => {
  const dispatch = useAppDispatch();
  const contact = contactModel.selectors.getSelectedContact();
  const status = contactModel.selectors.getStatusDetail();
  const statusDelete = contactModel.selectors.getStatusDelete();
  const errorDelete = useAppSelector(state => state.contact.errorDelete);

  const data = route.params.data;

  const validUrl = isValidURL(contact.photo);
  const [errorImage, setErrorImage] = React.useState(false);

  const [isOpen, setIsOpen] = React.useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const Name = React.useCallback(
    () => <Text>{`${contact.firstName} ${contact.lastName}`}</Text>,
    [contact.firstName, contact.lastName],
  );

  const Age = React.useCallback(
    () => <Text>{`${contact.age} years`}</Text>,
    [contact.age],
  );

  React.useEffect(() => {
    dispatch(contactModel.getContactById(data.id!!));
  }, [data.id, dispatch]);

  React.useEffect(() => {
    if (statusDelete === 'succeeded') {
      Alert.alert('eContact', 'Delete success', [
        {
          text: 'OK',
          onPress: async () => {
            await dispatch(contactModel.getAllContact());
            navigation.goBack();
          },
        },
      ]);
    }
    if (statusDelete === 'failed') {
      Alert.alert('eContact', errorDelete || '', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
    }
    return () => {
      dispatch(contactModel.actions.resetDeleteStatus());
    };
  }, [statusDelete, errorDelete, dispatch, navigation, data.id]);

  return (
    <>
      <Appbar.Header elevated>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Contact Details" />
        <Appbar.Action
          icon="account-edit"
          iconColor="lightskyblue"
          onPress={() => navigation.navigate('EditContact')}
        />
        <Appbar.Action
          icon="delete"
          iconColor="lightcoral"
          onPress={openDialog}
        />
      </Appbar.Header>

      {status === 'pending' ? (
        <Loading />
      ) : (
        <>
          <Space size="md" />
          {!validUrl || errorImage ? (
            <Avatar.Icon
              size={80}
              icon="account"
              color="black"
              style={styles.avatar}
            />
          ) : (
            <Avatar.Image
              size={80}
              source={{ uri: contact.photo }}
              style={styles.avatar}
              onError={() => setErrorImage(true)}
            />
          )}
          <Space size="md" />
          <List.Section>
            <Divider />
            <List.Item onPress={() => {}} title="Name" right={Name} />
            <Divider />
            <List.Item onPress={() => {}} title="Age" right={Age} />
            <Divider />
          </List.Section>
        </>
      )}

      <Portal>
        <Dialog visible={isOpen} onDismiss={closeDialog}>
          <Dialog.Icon icon="alert" color="lightcoral" />
          <Dialog.Title style={styles.titleDialog}>
            Delete {contact.firstName}
          </Dialog.Title>
          <Dialog.Content>
            <Text>
              Are you sure delete {contact.firstName}'s account? You must be
              careful about this action!
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog}>Disagree</Button>
            <Button
              onPress={() =>
                dispatch(contactModel.deleteContact(contact.id!!))
              }>
              Agree
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  avatar: { alignSelf: 'center' },
  titleDialog: { textAlign: 'center' },
});
