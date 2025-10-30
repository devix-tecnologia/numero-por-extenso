import js from '@eslint/js'
import parser from '@typescript-eslint/parser'

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.ts', 'test/**/*.ts'],
    ignores: ['dist/**', '*.d.ts'],
    languageOptions: {
      parser,
      parserOptions: {
        project: './tsconfig.base.json',
      },
    },
    rules: {
      // Adicione regras personalizadas aqui se desejar
    },
  },
]
