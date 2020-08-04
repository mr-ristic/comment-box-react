import React from 'react';
import TextBox from './index';
import 'jest-styled-components';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('TextBox.test', () => {
  it('TextBox is truthy', () => {
    expect(TextBox).toBeTruthy();
  });

  it('TextBox should render textarea field with prope label & id', () => {
    const { getByLabelText } = render(<TextBox />);
    const textArea = getByLabelText('Write your comment:');
    expect(textArea.id).toBe('comment-field');
  });

  it('TestBox should render a UserWidget', () => {
    render(<TextBox />);
    const textArea = screen.getByLabelText('Write your comment:');
    userEvent.type(textArea, '@jo');

    const UserWidget = screen.getByTitle('Tag User');
    expect(UserWidget).toBeTruthy();
  });

  it('TextBox should display user when typed @ within text and cancel on ESC keypress', () => {
    render(<TextBox />);
    const textArea = screen.getByLabelText('Write your comment:');
    userEvent.type(textArea, 'Here is my comment, what do you think @jo');

    const UserWidget = screen.queryByTitle('Tag User');
    expect(UserWidget).toBeTruthy();

    userEvent.type(textArea, 'Escape');
    expect(screen.queryByTitle('Tag User')).toBe(null);
  });

  it('TextBox should display userList and cancel it on outh of focus', () => {
    render(<TextBox />);
    const textArea = screen.getByLabelText('Write your comment:');
    userEvent.type(textArea, '@jo');

    const UserWidget = screen.queryByTitle('Tag User');
    expect(UserWidget).toBeTruthy();

    userEvent.click(document.body);
    expect(screen.queryByTitle('Tag User')).toBe(null);
  });
});
