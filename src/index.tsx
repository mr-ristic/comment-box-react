import * as React from 'react';
import TextBox from './components/TextBox';
import { ThemeProvider } from 'styled-components';
import theme from './theme';

interface ThemeProps {
  COLORS?: Object;
  TYPO?: Object;
  SPACING?: Object;
  RADIUS?: Object;
}

interface Props {
  themeOptions?: ThemeProps;
}

const CommentBox = ({ themeOptions }: Props) => {
  if (themeOptions && typeof themeOptions === 'object') {
    Object.keys(themeOptions).forEach((i) => {
      theme[i] = { ...theme[i], ...themeOptions[i] };
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <TextBox />
    </ThemeProvider>
  );
};

export default CommentBox;
