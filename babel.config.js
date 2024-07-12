module.exports = {
  presets: [
    'module:@react-native/babel-preset',
    // ['@babel/preset-env', { targets: { node: 'current' } }],
    // '@babel/preset-react',
    // '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src/'],
        alias: {
          app: './src/app',
          entities: './src/entities',
          features: './src/features',
          pages: './src/pages',
          shared: './src/shared',
          widgets: './src/widgets',
        },
      },
    ],
  ],
};
