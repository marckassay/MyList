# MyList

A React demonstration with the objective of:

- CRUD commands for a collection
- Input validation: used simple JS conditions
- Styling: implemented Tailwind
- Indicate when user exceeds a budget of $30
- Tests: Jest + `@testing-library/react`, tests Zustand store too

With code source features of:

- State management: implemented using Zustand with Redux middleware

In addition, the following tooling configured:

- Git hooks: Husky + `@commitlint/config-conventional`
- VSCode friendly: contains .vscode folder
- Fast Jest runner: uses '@swc/jest' to run tests on code change
- Linting and formatters: ESLint and Prettier, along with a few others are setup

![Demo](./docs/Animation.gif)

## Compilers

This project is using [@swc/jest](https://swc.rs/docs/usage/jest), to run 'jest' instead of perhaps, 'ts-jest'. And [Vite](https://vitejs.dev/guide/features.html#typescript) is being used to compile TypeScript instead of 'tsc'.

## Linters, Formatters and Extensions, Oh My!

Linting is performed by [eslint](https://eslint.org/) configured for [typescript-eslint](https://github.com/Microsoft/vscode-eslint) to lint TypeScript files.


Formatting is performed by [Prettier](https://prettier.io/) with VSCode extension [prettier-vscode](https://github.com/prettier/prettier-vscode) along with a few other extensions mentioned below.

'typescript-eslint' [documentation](https://typescript-eslint.io/docs/linting/configs/#prettier) considers 'eslint-config-prettier' to be helpful as the sole formatter. And Prettier does [too](https://prettier.io/docs/en/integrating-with-linters.html). But Prettier does not recommend 'eslint-plugin-prettier' and instead [suggests 'prettier-eslint'](https://github.com/prettier/prettier-eslint/issues/699#issuecomment-1166373283). 'prettier-eslint' has a companion project, [prettier-eslint-cli](https://github.com/prettier/prettier-eslint-cli) so that it can run on multiple files. 'prettier-eslint-cli' is used in the VSCode formatter extension [vs-code-prettier-eslint](https://github.com/idahogurl/vs-code-prettier-eslint). As mention in 'vs-code-prettier-eslint' documentation, VSCode Prettier and ESLint extensions are not required but
can be used, which they are in this project that you're reading.

The following are ESLint rules/plugins that are being used:
- [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import): sorts import statements
- [eslint-import-resolver-typescript](https://github.com/import-js/eslint-import-resolver-typescript): sorts import statements
- "eslint-plugin-react"
- "eslint-plugin-react-hooks"
- "eslint-plugin-jest"

## TODO

Enable and add additional Jest linting:
- https://github.com/jest-community/eslint-plugin-jest
- https://github.com/jest-community/jest-runner-eslint
- https://github.com/jest-community/jest-extended
