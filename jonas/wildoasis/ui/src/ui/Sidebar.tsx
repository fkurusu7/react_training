import styled from 'styled-components';
import Logo from './Logo';
import MainNav from './MainNav';

const StyledAside = styled.aside`
  grid-row: 1 / -1;

  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
  padding: 3.2rem 2.4rem;

  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Sidebar() {
  return (
    <StyledAside>
      <Logo />
      <MainNav />
    </StyledAside>
  );
}

export default Sidebar;
