import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';
import useOutsideClick from '../hooks/useOutsideClick';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

interface ModalContextProps {
  openName: string;
  onClose: () => void;
  onOpen: (name: string) => void;
}
// 1. Create context
const ModalContext = createContext<ModalContextProps>({
  openName: '',
  onClose: () => {},
  onOpen: () => {},
});

interface ModalProps {
  children: React.ReactNode;
}
// 2. Create Parent Component
function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState<string>('');

  return (
    <ModalContext.Provider
      value={{ openName, onClose: () => setOpenName(''), onOpen: setOpenName }}
    >
      {children}
    </ModalContext.Provider>
  );
}

interface ModalOpenProps {
  opensWindowName: string;
  children: React.ReactElement;
}

// 3. Create Child Components
function Open({ opensWindowName, children }: ModalOpenProps) {
  const { onOpen } = useContext(ModalContext);

  // Clone the button to add the onClick prop
  return cloneElement(children, { onClick: () => onOpen(opensWindowName) } as {
    onClick: () => void;
  });
}

interface ModalWindowProps {
  name: string;
  children: React.ReactElement;
}

// 3. Create Child Components
function Window({ name, children }: ModalWindowProps) {
  const { openName, onClose } = useContext(ModalContext);

  const ref = useOutsideClick(onClose);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={onClose}>
          <HiXMark />
        </Button>
        <div>
          {cloneElement(children, { onCloseModal: onClose } as {
            onCloseModal: () => void;
          })}
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// 4. Add child components as properties
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
