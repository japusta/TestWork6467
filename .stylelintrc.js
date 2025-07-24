// .stylelintrc.js
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-sass-guidelines'],
  plugins: ['stylelint-scss'],
  overrides: [
    {
      files: ['styles/**/*.scss', '**/*.module.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    // отключилтребование к lower‑hyphen именам
    'selector-class-pattern': null,
    // разрешаем border: none
    'declaration-property-value-disallowed-list': {
      border: [],
    },
  },
};
