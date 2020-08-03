import * as React from 'react';
import { ListBox } from './style';

interface UserObject {
  username: string;
  avatar_url: string;
  name: string;
}

interface Props {
  userList: [UserObject];
  searchTerm: string;
}

const UserWidget = ({ userList, searchTerm }: Props) => {
  // Filter user list with the search term
  const filteredList = userList.filter(
    (item) =>
      (item.username.toLowerCase().indexOf(searchTerm) > -1 ||
        item.name.toLowerCase().indexOf(searchTerm) > -1) &&
      item
  );
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
