module.exports = {
  clearMocks: true,
  collectCoverage: true,
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ],
  // A list of reporter names that Jest uses when writing coverage reports
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/distWeb/', '/distLambda/', '.d.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.base.json',
    },
  },

};
