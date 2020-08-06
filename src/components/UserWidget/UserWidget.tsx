import React, { useEffect, useState } from 'react';
import { ListBox, UserList, UserListItem } from './style';

interface UserObject {
  username: string;
  avatar_url: string;
  name: string;
}

interface Props {
  userList: Array<UserObject>;
  searchTerm: string;
  wrapperRef: React.RefObject<any>;
  cancelSearch: () => void;
  selectUser: (v: string) => void;
}

const UserWidget = ({
  userList,
  searchTerm,
  wrapperRef,
  cancelSearch,
  selectUser
}: Props) => {
  // Filter user list with the search term
  const filteredList = userList.filter(
    (item) =>
      (item.username.toLowerCase().indexOf(searchTerm) > -1 ||
        item.name.toLowerCase().indexOf(searchTerm) > -1) &&
      item
  );

  const selectOnClick = (listIndex: number) => {
    selectUser(filteredList[listIndex].username);
  };

  const [highlighted, setHighlighted] = useState(-1);

  useEffect(() => {
    //  handle key press event like esc to cacnel the display of the list
    const handleKeyPress = (e: React.KeyboardEvent<any>) => {
      const keyInput = e.key;
      // if users hits ESC reset search
      if (keyInput === 'Escape') {
        cancelSearch();
      }
      // select highlighted user
      if (keyInput === 'Tab' || keyInput === 'Enter') {
        e.preventDefault();
        const selectIndex = highlighted < 0 ? 0 : highlighted;
        selectUser(filteredList[selectIndex].username);
      }
      const listLength = filteredList.length;
      // highliht users
      if (keyInput === 'ArrowDown') {
        e.preventDefault();
        const next = highlighted + 1;
        setHighlighted(next >= listLength ? next % listLength : next);
      }
      if (keyInput === 'ArrowUp') {
        e.preventDefault();
        const next = highlighted > -1 ? highlighted - 1 : listLength - 1;
        setHighlighted(next >= listLength ? next % listLength : next);
      }
    };

    const wrapper = wrapperRef;
    // bind event listener on key down
    wrapper.current.addEventListener('keydown', handleKeyPress);
    // Unbind the event listener on clean up
    return () => {
      if (wrapper.current) {
        wrapper.current.removeEventListener('keydown', handleKeyPress);
      }
    };
  }, [wrapperRef, cancelSearch, filteredList, selectUser, highlighted]);

  // If no results do not show the list
  if (!filteredList.length) {
    return null;
  }

  return (
    <ListBox>
      <UserList title='Tag User'>
        {filteredList.map(({ username, avatar_url, name }, key) => (
          <UserListItem
            selected={key === highlighted}
            key={key}
            onClick={() => selectOnClick(key)}
            onMouseOver={() => setHighlighted(key)}
          >
            <img src={avatar_url} alt={username} />
            <h3>{name}</h3>
            <h5>~@{username}</h5>
          </UserListItem>
        ))}
      </UserList>
    </ListBox>
  );
};

export default UserWidget;
