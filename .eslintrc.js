/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['@icebreakers/eslint-config-ts'],
  globals: {
    __TEST__: true
  }
}
