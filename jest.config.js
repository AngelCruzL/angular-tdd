/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transform: {
    '^.+\\.(ts|js|html)$': 'babel-jest',
  },
  testMatch: ['**/?(*.)+(jest).ts'],
  testEnvironment: 'jsdom',
};
