import React from 'react';
import TextBox from './index';
import 'jest-styled-components';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import theme from '../../theme';
import { ThemeProvider } from 'styled-components';
const labels = {
  label: 'Write your comment:',
  placeholder: 'Remember, be nice!',
  submit: 'Submit'
};

const users = [
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

describe('TextBox.test', () => {
  it('TextBox is truthy', () => {
    expect(TextBox).toBeTruthy();
  });

  it('TextBox should render textarea field with prope label & id', () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <TextBox userObjects={users} labels={labels} />
      </ThemeProvider>
    );
    const textArea = getByLabelText(labels.label);
    expect(textArea.id).toBe('comment-field');
  });

  it('TestBox should render a UserWidget', () => {
    render(
      <ThemeProvider theme={theme}>
        <TextBox userObjects={users} labels={labels} />
      </ThemeProvider>
    );
    const textArea = screen.getByLabelText(labels.label);
    userEvent.type(textArea, '@jo');

    const UserWidget = screen.getByTitle('Tag User');
    expect(UserWidget).toBeTruthy();
  });

  it('TextBox should display user when typed @ within text and cancel on ESC keypress', () => {
    render(
      <ThemeProvider theme={theme}>
        <TextBox userObjects={users} labels={labels} />
      </ThemeProvider>
    );
    const textArea = screen.getByLabelText(labels.label);
    userEvent.type(textArea, 'Here is my comment, what do you think @jo');

    const UserWidget = screen.queryByTitle('Tag User');
    expect(UserWidget).toBeTruthy();

    userEvent.type(textArea, 'Escape');
    expect(screen.queryByTitle('Tag User')).toBe(null);
  });

  it('TextBox should display userList and cancel it on outh of focus', () => {
    render(
      <ThemeProvider theme={theme}>
        <TextBox userObjects={users} labels={labels} />
      </ThemeProvider>
    );
    const textArea = screen.getByLabelText(labels.label);
    userEvent.type(textArea, '@jo');

    const UserWidget = screen.queryByTitle('Tag User');
    expect(UserWidget).toBeTruthy();

    userEvent.click(document.body);
    expect(screen.queryByTitle('Tag User')).toBe(null);
  });
});
