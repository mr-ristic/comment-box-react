import * as React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: red;
`;
interface Props {
  text: string;
  onClickAction?: () => void;
}

const CommentBox = ({ text, onClickAction }: Props) => {
  return (
    <div>
      Example Component: {text}
      <Button onClick={onClickAction}>Click me 2</Button>
    </div>
  );
};

CommentBox.defaultProps = {
  onClickAction: () => false
};
export default CommentBox;
