const pkg = require('./package');

module.exports = {
  preset: '@shelf/jest-dynamodb',
  // preset: "jest-dynalite"
  name: pkg.name,
  displayName: pkg.name,
  testPathIgnorePatterns: ['/node_modules/', './dist', './scripts'],
  coverageReporters: ['lcov', 'html'],
  reporters: ['default', 'jest-junit'],
  transform: {
    '^.+\\.(js|ts|tsx)?$': 'babel-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.(j|t)sx?$',
  moduleFileExtensions: ['js', 'css', 'ts', 'tsx', 'json'],
  collectCoverageFrom: ['src/**/*.tsx'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleDirectories: ['node_modules', 'src'],
};
