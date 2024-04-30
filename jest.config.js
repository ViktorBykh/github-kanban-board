module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Change the test environment to jsdom
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
