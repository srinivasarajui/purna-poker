// eslint-disable-next-line @typescript-eslint/no-var-requires
const jest_base1 = require('../../jest-base.config');

module.exports = {
  ...jest_base1,
  preset: 'jest-expo',
  displayName: 'frontend',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
