import * as React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  background: red;
`
interface Props {
  text: string
}

export const CommentBox = ({ text }: Props) => {
  return (
    <div>
      Example Component: {text} <Button>Click me</Button>
    </div>
  )
}
