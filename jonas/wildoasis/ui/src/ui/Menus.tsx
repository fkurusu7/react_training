import React, { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';
import useOutsideClick from '../hooks/useOutsideClick';

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

type ListPositionProps = {
  position: Positions;
  ref: React.RefObject<HTMLDivElement | null>;
};
const StyledList = styled.ul<ListPositionProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

type Positions = { x: number; y: number };

interface MenusContextProps {
  openId: string;
  onClose: () => void;
  onOpen: (id: string) => void;
  position: Positions;
  setPosition: (obj: Positions) => void;
}
const MenusContext = createContext<MenusContextProps>({
  openId: '',
  onClose: () => {},
  onOpen: () => {},
  position: { x: 0, y: 0 },
  setPosition: () => {},
});

function Menus({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState<string>('');
  const [position, setPosition] = useState<Positions>({
    x: 0,
    y: 0,
  });

  return (
    <MenusContext.Provider
      value={{
        openId,
        onClose: () => setOpenId(''),
        onOpen: setOpenId,
        position,
        setPosition,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: { id: string }) {
  const { openId, onClose, onOpen, setPosition } = useContext(MenusContext);

  function handleClick(ev: React.MouseEvent<HTMLElement>) {
    const target = ev.target as HTMLElement;
    const button = target?.closest('button');
    const rect = button?.getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect!.width - rect!.x,
      y: rect!.y + rect!.height,
    });

    if (openId === '' || openId !== id) {
      onOpen(id);
    } else {
      onClose();
    }
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }: { id: string; children: React.ReactNode }) {
  const { openId, position, onClose } = useContext(MenusContext);
  const ref = useOutsideClick(onClose);

  if (openId !== id) return null;

  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({
  icon,
  onClick,
  children,
}: {
  icon: React.ReactElement;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children: React.ReactElement | string;
}) {
  const { onClose } = useContext(MenusContext);

  function handleclick(ev: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(ev);
    onClose();
  }

  return (
    <li>
      <StyledButton onClick={handleclick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
