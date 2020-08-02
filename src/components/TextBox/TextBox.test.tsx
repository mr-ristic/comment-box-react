import React from 'react';
import TextBox from './index';
import 'jest-styled-components';
import { render, fireEvent, screen } from '@testing-library/react';

describe('TextBox.test', () => {
  it('TextBox is truthy - Component exists', () => {
    expect(TextBox).toBeTruthy();
  });

  it('TextBox renders textarea field with prope label & id', () => {
    const { getByLabelText } = render(<TextBox />);
    const textArea = getByLabelText('Write your comment:');
    expect(textArea.id).toBe('comment-field');
  });

  it('TestBox should render a UserWidget', () => {
    render(<TextBox />);
    const textArea = screen.getByLabelText('Write your comment:');
    fireEvent.change(textArea, { target: { value: '@' } });
    fireEvent.change(textArea, { target: { value: 'Joh' } });

    const UserWidget = screen.getByTitle('Tag User');
    expect(UserWidget).toBeTruthy();
  });
});
