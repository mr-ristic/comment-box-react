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
  //  handle key press event like esc to cacnel the display of the list
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const keyInput = e.key;
    // if users hits ESC reset search
    if (keyInput === 'Escape') {
      setSearchStarted(false);
      setSearchTerm('');
    }
  };
  // handle typing so we can display filtered list with as few possible re-rendes
  // another implementation would be with useEffect
  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const userSearch = e.target.value;
    if (userSearch.indexOf('@') > -1) {
      setSearchStarted(true);
    }
    // if @ is delted cancel search
    if (userSearch.indexOf('@') === -1 && searchStarted) {
      setSearchStarted(false);
      setSearchTerm('');
    }
    // add search term to the state
    if (userSearch.indexOf('@') > -1) {
      setSearchTerm(userSearch.split('@')[1].toLowerCase());
    }
  };

  return (
    <label htmlFor='comment-field'>
      Write your comment:
      <textarea
        onChange={handleTyping}
        onKeyDown={handleKeyPress}
        id='comment-field'
      />
      {searchStarted && (
        <UserWidget searchTerm={searchTerm} userList={userObjects} />
      )}
    </label>
  );
};

TextBox.defaultProps = defalutProps;

export default TextBox;
