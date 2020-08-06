import React, { useState, useRef, useEffect } from 'react';
import UserWidget from '../UserWidget';
import useOuterClick from '../../helpers/hooks/useOuterClick';
import { TextBoxWrapper, TextLabel, TextArea } from './style';

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
  ]
};

type Props = {
  userObjects?: [UserObject];
} & typeof defalutProps;

const TextBox = ({ userObjects }: Props) => {
  const [searchStarted, setSearchStarted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const innerRef = useRef(null);
  const { isOuter, setIsOuter } = useOuterClick(innerRef);
  const [selectedUser, setSelectedUser] = useState('');
  // resets state to default
  const cancelSearch = () => {
    setSearchStarted(false);
    setSearchTerm('');
  };
  // handle typing so we can display filtered list with as few possible re-rendes
  // another implementation would be with useEffect
  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const userSearch = e.target.value;
    setTextAreaValue(userSearch);
    if (userSearch.indexOf('@') > -1) {
      setSearchStarted(true);
    }
    // if @ is delted cancel search
    if (userSearch.indexOf('@') === -1 && searchStarted) {
      cancelSearch();
    }
    // add search term to the state
    if (userSearch.indexOf('@') > -1) {
      const searchArr = userSearch.split('@');
      setSearchTerm(
        searchArr[searchArr.length - 1]
          ? searchArr[searchArr.length - 1].toLowerCase()
          : searchArr[1].toLowerCase()
      );
    }
  };

  useEffect(() => {
    // if clicked outside of wrapper remove user list
    if (isOuter) {
      cancelSearch();
      setIsOuter(false);
    }
  }, [isOuter, setIsOuter]);

  useEffect(() => {
    if (selectedUser !== '') {
      const regex = new RegExp(`@${searchTerm}`, 'ig');
      const comment = textAreaValue.replace(regex, `@${selectedUser}`);
      setTextAreaValue(comment);
      setSelectedUser('');
      cancelSearch();
    }
  }, [
    selectedUser,
    setSelectedUser,
    textAreaValue,
    setTextAreaValue,
    searchTerm
  ]);

  return (
    <TextBoxWrapper ref={innerRef} tabIndex={0}>
      <TextLabel htmlFor='comment-field'>
        Write your comment:
        <TextArea
          placeholder='Remember, be nice!'
          value={textAreaValue}
          onChange={handleTyping}
          id='comment-field'
        />
        {searchStarted && (
          <UserWidget
            selectUser={setSelectedUser}
            wrapperRef={innerRef}
            searchTerm={searchTerm}
            userList={userObjects}
            cancelSearch={cancelSearch}
          />
        )}
      </TextLabel>
    </TextBoxWrapper>
  );
};

TextBox.defaultProps = defalutProps;

export default TextBox;
