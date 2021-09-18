module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.svg$|\\.png$': '<rootDir>/src/__mocks__/imgMock.js',
    '^@src(.*)$': '<rootDir>/src$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@components(.*)$': '<rootDir>/src/components$1'
  }
};
