/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'jest-preset-angular',
  globalSetup: 'jest-preset-angular/global-setup',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['**/?(*.)+(jest).ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@shared/(.*)': '<rootDir>/src/app/shared/$1',
    '^@core/(.*)': '<rootDir>/src/app/core/$1',
    '^@modules/(.*)': '<rootDir>/src/app/modules/$1',
  },
};
