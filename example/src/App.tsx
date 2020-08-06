import React from 'react';
import CommentBox from 'comment-box-react';
import 'comment-box-react/dist/index.css';

const themeOptions = {
  COLORS: {
    highlight: '#fff',
    background: '#faf2c7'
  }
};

const App = () => {
  return <CommentBox themeOptions={themeOptions} />;
};

export default App;
