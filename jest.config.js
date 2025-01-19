module.exports = {
  globals:{
    "__DEV__": true,
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setupFilesAfterEnv.ts'],
};