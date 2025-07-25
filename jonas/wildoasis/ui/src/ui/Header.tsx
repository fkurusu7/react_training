import styled from 'styled-components';

const StyledHeader = styled.header`
  grid-column: 2 / -1;

  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
  padding: 1.2rem 4.8rem;
`;

function Header() {
  return <StyledHeader>Header</StyledHeader>;
}

export default Header;
