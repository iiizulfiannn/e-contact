import { ContactFilter } from 'features/contact-filters';
import React from 'react';
import { Appbar } from 'react-native-paper';
import { ScreenProps } from 'shared';

type ContactsProps = {} & ScreenProps<'ContactList'>;

export const ContactList = ({ navigation }: ContactsProps) => {
  return (
    <>
      <Appbar.Header elevated>
        <Appbar.Content title="eContacts" />
        <Appbar.Action
          icon="plus"
          iconColor="lightgreen"
          onPress={() => navigation.navigate('AddContact')}
        />
      </Appbar.Header>

      <ContactFilter />
    </>
  );
};
