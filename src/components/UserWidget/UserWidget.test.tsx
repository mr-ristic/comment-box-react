import React, { useRef } from 'react';
import 'jest-styled-components';
import { render, screen, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import UserWidget from './UserWidget';

describe('UserWidget.test', () => {
  const selectUser = jest.fn((x) => x);
  const cancel = jest.fn();
  const OuterComponnt = () => {
    const ref = useRef(null);

    return (
      <div ref={ref} tabIndex={0}>
        <UserWidget
          wrapperRef={ref}
          cancelSearch={cancel}
          selectUser={selectUser}
          userList={[
            {
              username: 'df-username',
              avatar_url:
                'https://secure.gravatar.com/avatar/f04241571d95d005e4a54f4278670718?d=mm',
              name: 'John Doe'
            }
          ]}
          searchTerm='jo'
        />
      </div>
    );
  };
  it('UserWidget is truthy', () => {
    expect(UserWidget).toBeTruthy();
  });

  it('UserWidget should call selectUser and cancelUser', () => {
    render(<OuterComponnt />);
    const l = screen.getByRole('listitem');
    fireEvent.keyDown(l, { key: 'Tab', code: 'Tab' });

    expect(selectUser.mock.calls.length).toBe(1);
    expect(selectUser).toBeCalledWith('df-username');
  });

  it('UserWidget should call cancel User', () => {
    render(<OuterComponnt />);
    const l = screen.getByRole('listitem');
    fireEvent.keyDown(l, { key: 'Escape', code: 'Escape' });
    expect(cancel.mock.calls.length).toBe(1);
  });
});
