const { resolve } = require('node:path');

module.exports = {
  extends: ['../../packages/config-eslint'], // 공통 설정 확장
  parserOptions: {
    project: resolve(__dirname, './tsconfig.json'), // 앱의 tsconfig 경로
  },
};
