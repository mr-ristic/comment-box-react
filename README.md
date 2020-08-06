# comment-box-react

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/comment-box-react.svg)](https://www.npmjs.com/package/comment-box-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save comment-box-react
```

## Usage

```tsx
import React from 'react';
import CommentBox from 'comment-box-react';
import 'comment-box-react/dist/index.css';

const themeOptions = {
  COLORS: {
    highlight: '#fff',
    background: '#faf2c7'
  }
};

const App = () => {
  return <CommentBox themeOptions={themeOptions} />;
};

export default App;
```

## Theming

Set themeOptions props that will override default theme options set.
themeOptions structure is consisted of:

```ts
interface ThemeProps {
  COLORS?: Object;
  TYPO?: Object;
  SPACING?: Object;
  RADIUS?: Object;
}
```

Each of the objects has its values that you can override:

```js
// COLORS
const COLORS = {
  background: '#ffffff',
  highlight: '#D8DADF',
  submitButton: '#5004D9',
  fontPrimary: '#000',
  fontSecondary: 'gray',
  shadow: '#888'
};
// RADIUS
const RADIUS = {
  // ${({ theme }) => theme.RADIUS.rad*}
  rad4: '4px',
  rad6: '6px',
  rad8: '8px',
  rad25: '25px'
};
// SPACING
// Foundation of all dimensions - use to resize proprtionaly
const SPACING = {
  base: 5 // Usage -> ${({ theme }) => theme.SPACING.base * n}px
};
// TYPO

const TYPO = {
  fontFamilly: {
    primary: 'Arial, Helvetica, sans-serif'
  },
  size: {
    // ${({ theme }) => theme.TYPO.size.*}
    text5: '5px',
    text10: '10px',
    text12: '12px',
    text14: '14px',
    text16: '16px'
  },
  weight: {
    // ${({ theme }) => theme.TYPO.weight.*}
    light: 300,
    normal: 400,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900
  },
  transform: {
    // ${({ theme }) => theme.TYPO.transform.*}
    lowerCase: 'lowercase',
    none: 'none',
    upperCase: 'uppercase'
  }
};
```

## Troubleshooting

If the example app displays an error:

<i>Invalid Hook Call Warning</i>

Try this:

One possible fix is to run npm link example/node_modules/react from library root (~/ui-kit).

This should make the library use the application’s React copy.

## License

MIT © [mr-ristic](https://github.com/mr-ristic)
