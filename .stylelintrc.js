module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines'
  ],
  plugins: ['stylelint-scss'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true
  }
};