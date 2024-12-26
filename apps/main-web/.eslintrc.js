const { resolve } = require('node:path');

module.exports = {
  extends: ['../../packages/config-eslint'],
  parserOptions: {
    project: resolve(__dirname, './tsconfig.json'),
  },
};
