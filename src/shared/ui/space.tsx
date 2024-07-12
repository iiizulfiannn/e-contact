import React from 'react';
import { View } from 'react-native';

type SpaceProps = {
  size: 'sm' | 'md' | 'lg' | 'xl';
};

export const Space = ({ size }: SpaceProps) => {
  let result = 0;

  switch (size) {
    case 'sm':
      result = 8;
      break;
    case 'md':
      result = 16;
      break;
    case 'lg':
      result = 24;
      break;
    case 'xl':
      result = 36;
      break;
    default:
      result = 8;
      break;
  }

  return <View style={{ width: result, height: result }} />;
};
