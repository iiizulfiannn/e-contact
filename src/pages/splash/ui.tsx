import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Brand, Dimension, ScreenProps } from 'shared';

type SplashProps = {} & ScreenProps<'Splash'>;

const imageSize = Dimension.width * 0.5;

export const Splash = ({ navigation }: SplashProps) => {
  React.useEffect(() => {
    setTimeout(() => navigation.replace('ContactList'), 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Brand width={imageSize} height={imageSize} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
});
