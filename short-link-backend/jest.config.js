module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/e2e/*.test.ts',
    '<rootDir>/src/**/*.test.ts',
  ],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.json',
    }],
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  clearMocks: true,
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/e2e/setup.ts'],
};
