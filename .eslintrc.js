module.exports = {
    env: {
        browser: true,
        es6: true
    },
    root: true,
    extends: [
        'plugin:vue/essential',
        '@vue/prettier',
        '@vue/eslint-config-airbnb',
        'prettier/vue',
        'prettier'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        parser: 'babel-eslint'
    },
    plugins: ['vue', 'prettier'],
    rules: {
        'no-console': 1,
        'no-restricted-syntax': [1, 'for-in']
        // 'import/no-unresolved': 0
    },
    settings: {}
};
