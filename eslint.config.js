import globals from 'globals';
import js from '@eslint/js';

export default [
    js.configs.recommended,
    {
        'ignores': [
            '**/node_modules/*'
        ],
        'languageOptions': {
            ecmaVersion: 2022,
            globals: {
                ...globals.builtin,
                ...globals.mocha,
                ...globals.node,
            },
        },
        'rules': {}
    }
];
