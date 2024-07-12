import { useNavigation } from '@react-navigation/native';
import { ContactCard, contactModel } from 'entities/contact';
import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Loading, NavProps, useAppDispatch } from 'shared';

export const ContactFilter = () => {
  const { navigate } = useNavigation<NavProps<'ContactList'>>();
  const dispatch = useAppDispatch();
  const listContact = contactModel.selectors.getListContact();
  const status = contactModel.selectors.getStatusList();

  React.useEffect(() => {
    dispatch(contactModel.getAllContact());
  }, [dispatch]);

  if (status === 'pending') {
    return <Loading />;
  }

  return (
    <FlatList
      data={listContact}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => dispatch(contactModel.getAllContact())}
        />
      }
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <ContactCard
          data={item}
          onPress={data => navigate('ContactDetails', { data })}
        />
      )}
    />
  );
};
