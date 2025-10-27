module.exports = {
  preset: 'react-native',
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@testing-library)',
  ],
};
