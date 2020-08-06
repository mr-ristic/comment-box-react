import styled from 'styled-components';

export const ListBox = styled.div`
  border-radius: ${({ theme }) => theme.RADIUS.rad6};
  box-shadow: 0 0
    ${({ theme }) => theme.TYPO.size.text10 + ' ' + theme.COLORS.shadow};
  width: ${({ theme }) => theme.SPACING.base * 62}px;
`;

export const UserList = styled.ul`
  list-style: none;
  padding-inline-start: 0;
  margin: 0;
`;

interface ListProps {
  selected: boolean;
}

export const UserListItem = styled.li<ListProps>`
  display: flex;
  padding: ${({ theme }) => theme.SPACING.base * 2}px
    ${({ theme }) => theme.SPACING.base}px;
  background: ${({ selected, theme }) =>
    !selected ? theme.COLORS.background : theme.COLORS.highlight};
  img {
    height: ${({ theme }) => theme.SPACING.base * 8}px;
    border-radius: 50%;
    margin-right: ${({ theme }) => theme.TYPO.size.text10};
  }
  h3 {
    line-height: ${({ theme }) => theme.SPACING.base * 8}px;
    margin: 0;
    font-weight: ${({ theme }) => theme.TYPO.weight.semiBold};
    font-size: ${({ theme }) => theme.TYPO.size.text14};
  }
  h5 {
    font-weight: ${({ theme }) => theme.TYPO.weight.semiBold};
    margin: 0;
    font-size: ${({ theme }) => theme.TYPO.size.text12};
    line-height: ${({ theme }) => theme.SPACING.base * 8}px;
    color: ${({ theme }) => theme.COLORS.fontSecondary};
  }
`;
