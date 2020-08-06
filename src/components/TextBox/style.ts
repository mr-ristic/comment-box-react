import styled from 'styled-components';

export const TextBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-family: ${({ theme }) => theme.TYPO.fontFamilly.primary};
`;

export const TextLabel = styled.label`
  color: ${({ theme }) => theme.COLORS.fontPrimary};
`;
export const TextArea = styled.textarea`
  font-family: inherit;
  display: block;
  resize: none;
  height: ${({ theme }) => theme.SPACING.base * 20}px;
  width: ${({ theme }) => theme.SPACING.base * 60}px;
  font-size: ${({ theme }) => theme.TYPO.size.text14};
  padding: ${({ theme }) => theme.SPACING.base}px;
  border-radius: ${({ theme }) => theme.SPACING.base}px;
  border: none;
  box-shadow: 0 0
    ${({ theme }) => theme.TYPO.size.text10 + ' ' + theme.COLORS.shadow};
  margin-top: ${({ theme }) => theme.SPACING.base * 2}px;
  &:focus {
    outline: none;
  }
`;
