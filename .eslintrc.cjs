module.exports = {
  root: true,
  extends: 'vuepress',
  globals: {
    __VUEPRESS_VERSION__: 'readonly',
    __VUEPRESS_DEV__: 'readonly',
    __VUEPRESS_SSR__: 'readonly',
    __VUE_HMR_RUNTIME__: 'readonly',
  },
  overrides: [
    {
      files: ['*.ts', '*.vue', '*.tsx'],
      extends: 'vuepress-typescript',
      parserOptions: {
        project: ['tsconfig.eslint.json'],
      },
      rules: {
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/dot-notation': 0,
        '@typescript-eslint/consistent-type-imports': 0,
        'vue/match-component-file-name': [
          'error',
          {
            extensions: ['tsx', 'vue'],
            shouldMatchCase: false,
          },
        ],
        // 要求组件名称始终为多字拼写
        'vue/multi-word-component-names': 0,
        // 属性必须是连字
        'vue/attribute-hyphenation': 0,
        // 自定义组件上强制实施 V-on/on-change的 事件命名样式
        'vue/v-on-event-hyphenation': 0,
        // 报告传递的解构导致值失去反应性
        'vue/no-setup-props-destructure': 0,
        // 禁止使用 V-HTML 来防止 XSS 攻击
        'vue/no-v-html': 0,
      },
    },
    {
      files: ['**/__tests__/**/*.ts'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
  rules: {},
}
