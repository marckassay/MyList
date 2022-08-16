# MyList

A React demonstration with the objective of:

- CRUD commands for a collection
- Input validation: used simple JS conditions
- Styling: implemented Tailwind
- Indicate when user exceed budget of $30
- Tests: Jest + `@testing-library/react`, tests Zustand store too

In addition:

- State management: implemented Zustand with Redux middleware
- Git hooks: Husky + `@commitlint/config-conventional`
- VSCode settings: files included

![Demo](./docs/Animation.gif)


## Linters, Formatters and Extensions, Oh My!

Linting is performed by 'eslint':
https://eslint.org/
https://github.com/Microsoft/vscode-eslint

Formatting is performed by 'Prettier':
https://prettier.io/
https://github.com/prettier/prettier-vscode

typescript-eslint considers 'eslint-config-prettier' to be helpful as the sole formatter:
https://typescript-eslint.io/docs/linting/configs/#prettier

And Prettier does too:
https://prettier.io/docs/en/integrating-with-linters.html

But Prettier does not recommend 'eslint-plugin-prettier' and instead suggests 'prettier-eslint':
https://github.com/prettier/prettier-eslint/issues/699#issuecomment-1166373283

'prettier-eslint' has a companion project to so that it can be ran on multiple files:
https://github.com/prettier/prettier-eslint-cli

'prettier-eslint-cli' is used in the VSCode formatter 'vs-code-prettier-eslint':
https://github.com/idahogurl/vs-code-prettier-eslint

As mention in 'vs-code-prettier-eslint', VSCode Prettier and ESLint extensions are not required but
can be used.

The following are ESLint rules that are being used:
- "eslint-import-resolver-typescript"
- "eslint-plugin-import"
- "eslint-plugin-react"
- "eslint-plugin-react-hooks"
- "eslint-plugin-jest"

TODO:

Jest linting:
https://github.com/jest-community/eslint-plugin-jest
https://github.com/jest-community/jest-runner-eslint
https://github.com/jest-community/jest-extended

CSS + HTML + MD




// Vite and TypeScript
https://vitejs.dev/guide/features.html#typescript