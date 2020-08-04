import React, { useEffect } from 'react';
import { ListBox } from './style';

interface UserObject {
  username: string;
  avatar_url: string;
  name: string;
}

interface Props {
  userList: [UserObject];
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

  useEffect(() => {
    //  handle key press event like esc to cacnel the display of the list
    const handleKeyPress = (e: React.KeyboardEvent<any>) => {
      const keyInput = e.key;
      // if users hits ESC reset search
      if (keyInput === 'Escape') {
        cancelSearch();
      }
      if (keyInput === 'Tab') {
        // TODO select first user
        e.preventDefault();
        selectUser(filteredList[0].username);
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
  }, [wrapperRef, cancelSearch, filteredList, selectUser]);

  // If no results do not show the list
  if (!filteredList.length) {
    return null;
  }

  return (
    <ListBox>
      <ul title='Tag User'>
        {filteredList.map(({ username, avatar_url, name }) => (
          <li key={username}>
            <img src={avatar_url} alt={name} />
            <h3>{username}</h3>
          </li>
        ))}
      </ul>
    </ListBox>
  );
};

export default UserWidget;
