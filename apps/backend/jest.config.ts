// eslint-disable-next-line @typescript-eslint/no-var-requires
const jest_base1 = require('../../jest-base.config');

module.exports = {
  ...jest_base1,
  preset: 'ts-jest',
  displayName: 'backend',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
