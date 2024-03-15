# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',<img width="1680" alt="Screenshot 2024-03-15 at 1 31 17 PM" src="https://github.com/Kanekiken-Aj/Project-6/assets/146249879/7f1e2d50-3aec-4d35-af53-c15be8f9d09b">

    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },

}
```

Preview:---- 
<img width="1680" alt="Screenshot 2024-03-15 at 1 31 02 PM" src="https://github.com/Kanekiken-Aj/Project-6/assets/146249879/ad1645d4-c7ae-4044-8dbc-5c2961d09465">
<img width="1680" alt="Screenshot 2024-03-15 at 1 31 17 PM" src="https://github.com/Kanekiken-Aj/Project-6/assets/146249879/db831cfc-e747-41a8-bd13-afeed86254ac">
<img width="1680" alt="Screenshot 2024-03-15 at 1 30 52 PM" src="https://github.com/Kanekiken-Aj/Project-6/assets/146249879/89f38ac5-f7b9-41d7-af71-c61467ce5636">
<img width="1680" alt="Screenshot 2024-03-13 at 4 26 20 PM" src="https://github.com/Kanekiken-Aj/Project-6/assets/146249879/d2eeff44-4de7-45f3-85c8-9b2605c69967">




- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
