const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  ...tsjPreset,
  preset: 'react-native',
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // moduleNameMapper: {
  //   '^app/(.*)$': '<rootDir>/src/app/$1',
  //   '^entities/(.*)$': '<rootDir>/src/entities/$1',
  //   '^features/(.*)$': '<rootDir>/src/features/$1',
  //   '^pages/(.*)$': '<rootDir>/src/pages/$1',
  //   '^shared/(.*)$': '<rootDir>/src/shared/$1',
  //   '^widgets/(.*)$': '<rootDir>/src/widgets/$1',
  // },
};
