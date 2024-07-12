import { DimensionValue, Image, ImageProps, ImageStyle } from 'react-native';
import React from 'react';
import icons from '../icons';

type BrandProps = {
  width?: DimensionValue;
  height?: DimensionValue;
  style?: ImageStyle;
  imageProps?: ImageProps;
};

export const Brand = ({
  width = 100,
  height = 100,
  style,
  imageProps,
}: BrandProps) => {
  return (
    <Image
      source={icons.app}
      style={{ width, height, ...style }}
      {...imageProps}
    />
  );
};
