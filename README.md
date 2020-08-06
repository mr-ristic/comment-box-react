# comment-box-react
> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/comment-box-react.svg)](https://www.npmjs.com/package/comment-box-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Comment-box-ract is package that you can easily import into your React app.
type @ to activate a user search so you can tag a user.
If you provide users they need to be in the following format:
```js
[
  {
    username: 'df-username',
    avatar_url:
      'https://secure.gravatar.com/avatar/f04241571d95d005e4a54f4278670718?d=mm',
    name: 'John Doe'
  },
  {
    username: 'df-username2',
    avatar_url:
      'https://secure.gravatar.com/avatar/f04241571d95d005e4a54f4278670718?d=mm',
    name: 'John Doe 2'
  },
  {
    username: 'df-username3',
    avatar_url:
      'https://secure.gravatar.com/avatar/f04241571d95d005e4a54f4278670718?d=mm',
    name: 'John Doe 3'
  }
];
```

You can also etit text values in calse of localization for example.
you need to pass the locals props in the given format:

```js
const labels = {
  label: 'Write your comment:',
  placeholder: 'Remember, be nice!',
  submit: 'Submit'
};
```
## Run
From the root
```bash
npm run start
```

then

```bash
cd example && npm run start
```

## Test

To run unit tests

```bash
npm run test:unit
```

To run lint test:

```bash
npm run test:lint
```

To run all and build:

```bash
npm run test
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

const labels = {
  label: 'Write your comment man:',
  placeholder: 'Remember, be nice!',
  submit: 'Submit'
};

const App = () => {
  const submitComment = (value: string) => {
    console.log({ value });
  };
  return (
    <CommentBox
      labels={labels}
      onSubmit={submitComment}
      themeOptions={themeOptions}
    />
  );
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

####### Invalid Hook Call Warning

Try this:

One possible fix is to run npm link example/node_modules/react from library root (~/ui-kit).

This should make the library use the application’s React copy.

## License

MIT © [mr-ristic](https://github.com/mr-ristic)
