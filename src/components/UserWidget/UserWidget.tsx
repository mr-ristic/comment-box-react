import * as React from 'react';

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
  const filteredList = userList.filter(
    (item) =>
      (item.username.indexOf(searchTerm) > -1 ||
        item.name.indexOf(searchTerm) > -1) &&
      item
  );
  if (!filteredList.length) {
    return null;
  }
  return (
    <>
      <ul title='Tag User'>
        {filteredList.map(({ username, avatar_url, name }) => (
          <li key={username}>
            <img src={avatar_url} alt={name} />
            <h3>{username}</h3>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserWidget;
