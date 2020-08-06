import React, { useState, useRef, useEffect } from 'react';
import UserWidget from '../UserWidget';
import useOuterClick from '../../helpers/hooks/useOuterClick';
import { TextBoxWrapper, TextLabel, TextArea, Submit } from './style';

interface UserObject {
  username: string;
  avatar_url: string;
  name: string;
}

interface LabelsObject {
  label: string;
  placeholder: string;
  submit: string;
}

type Props = {
  userObjects: UserObject[];
  onSubmitAction?: (v: { text: string; tagged: Array<any> }) => void;
  labels: LabelsObject;
};

const TextBox = ({ userObjects, onSubmitAction, labels }: Props) => {
  const [searchStarted, setSearchStarted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const innerRef = useRef(null);
  const { isOuter, setIsOuter } = useOuterClick(innerRef);
  const [selectedUser, setSelectedUser] = useState('');
  const [tagged, setTagged] = useState(['']);
  const { label, placeholder, submit } = labels;
  // resets state to default
  const cancelSearch = () => {
    setSearchStarted(false);
    setSearchTerm('');
  };
  const handleSubmit = () => {
    if (onSubmitAction) {
      onSubmitAction({
        text: textAreaValue,
        tagged: tagged.length > 1 ? tagged.filter((a) => a !== '') : tagged
      });
    }

    setTagged([]);
    setTextAreaValue('');
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
      const comment = textAreaValue.replace(regex, `${selectedUser}`);
      setTagged([...tagged, selectedUser]);
      setTextAreaValue(comment);
      setSelectedUser('');
      cancelSearch();
    }
  }, [
    selectedUser,
    setSelectedUser,
    textAreaValue,
    setTextAreaValue,
    searchTerm,
    tagged
  ]);

  return (
    <TextBoxWrapper ref={innerRef} tabIndex={0}>
      <TextLabel htmlFor='comment-field'>
        {label}
        <TextArea
          placeholder={placeholder}
          value={textAreaValue}
          onChange={handleTyping}
          id='comment-field'
        />
        {onSubmitAction && !searchStarted && (
          <Submit onClick={handleSubmit}>{submit}</Submit>
        )}
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

export default TextBox;
