import React from 'react';
import CommentBox from 'comment-box-react';
import 'comment-box-react/dist/index.css';
import userData from './UserData.json';

// TODO add redux and redux-saga with presist store examples
const themeOptions = {
  COLORS: {
    highlight: '#faf2c7',
    background: '#fff'
  }
};

const labels = {
  label: 'Write your comment please:',
  placeholder: 'Remember, be nice!',
  submit: 'Submit'
};

const App = () => {
  const submitComment = (comment: object) => {
    console.log({ comment });
  };

  return (
    <div className='wrapper'>
      Open console to see the submited comment & tagged user.
      <CommentBox
        userObjects={userData}
        labels={labels}
        onSubmit={submitComment}
        themeOptions={themeOptions}
      />
    </div>
  );
};

export default App;
