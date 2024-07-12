import React from 'react';
import { Avatar, List } from 'react-native-paper';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';
import { isValidURL, type Contact } from 'shared';

type ContactCardProps = {
  data: Contact;
  onPress: (data: Contact) => void;
};

export const ContactCard = ({ data, onPress }: ContactCardProps) => {
  const validUrl = isValidURL(data.photo);
  const [errorImage, setErrorImage] = React.useState(false);

  const AvatarImage = React.useCallback(
    (props: { color: string; style: Style }) =>
      !validUrl || errorImage ? (
        <Avatar.Icon {...props} size={36} icon="account" color="black" />
      ) : (
        <Avatar.Image
          {...props}
          size={36}
          source={{ uri: data.photo }}
          onError={() => setErrorImage(true)}
        />
      ),
    [data.photo, errorImage, validUrl],
  );

  return (
    <List.Item
      testID="contactCard"
      onPress={() => onPress(data)}
      title={`${data.firstName} ${data.lastName}`}
      description={`${data.age} years`}
      left={AvatarImage}
    />
  );
};
