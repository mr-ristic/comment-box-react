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

interface LabelsObject {
  label: string;
  placeholder: string;
  submit: string;
}

interface UserObject {
  username: string;
  avatar_url: string;
  name: string;
}
const defalutProps = {
  labels: {
    label: 'Write your comment:',
    placeholder: 'Remember, be nice!',
    submit: 'Submit'
  },
  userObjects: [
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
  ]
};

type Props = {
  themeOptions?: ThemeProps;
  onSubmit: (v: any) => void;
  labels?: LabelsObject;
  userObjects: UserObject[];
} & typeof defalutProps;

const CommentBox = ({ userObjects, themeOptions, onSubmit, labels }: Props) => {
  if (themeOptions && typeof themeOptions === 'object') {
    Object.keys(themeOptions).forEach((i) => {
      theme[i] = { ...theme[i], ...themeOptions[i] };
    });
  }

  console.log({ userObjects });

  return (
    <ThemeProvider theme={theme}>
      <TextBox
        userObjects={userObjects}
        labels={labels}
        onSubmitAction={onSubmit}
      />
    </ThemeProvider>
  );
};

CommentBox.defaultProps = defalutProps;

export default CommentBox;
