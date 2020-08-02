import React, { useState } from 'react';
import UserWidget from '../UserWidget';

interface UserObject {
  username: string;
  avatar_url: string;
  name: string;
}

const defalutProps = {
  userObjects: [
    {
      username: 'df-username',
      avatar_url:
        'https://secure.gravatar.com/avatar/f04241571d95d005e4a54f4278670718?d=mm',
      name: 'John Doe'
    }
  ]
};

type Props = {
  userObjects?: [UserObject];
} & typeof defalutProps;

const TextBox = ({ userObjects }: Props) => {
  const [searchStarted, setSearchStarted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const userSearch = e.target.value;
    // if user types @ search for users
    if (userSearch === '@') {
      setSearchStarted(true);
    }
    // add search term to the state
    if (searchStarted) {
      setSearchTerm(userSearch);
    }
  };

  return (
    <label htmlFor='comment-field'>
      Write your comment:
      <textarea onChange={handleTyping} id='comment-field' />
      {searchStarted && (
        <UserWidget searchTerm={searchTerm} userList={userObjects} />
      )}
    </label>
  );
};

TextBox.defaultProps = defalutProps;

export default TextBox;
