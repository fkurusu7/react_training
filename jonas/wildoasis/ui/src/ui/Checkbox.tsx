import type React from 'react';
import styled from 'styled-components';

const StyledCheckbox = styled.div`
  display: flex;
  gap: 1.6rem;

  & input[type='checkbox'] {
    height: 2.4rem;
    width: 2.4rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-brand-600);
  }

  & input[type='checkbox']:disabled {
    accent-color: var(--color-brand-600);
  }

  & label {
    flex: 1;

    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

interface CheckboxPropsI {
  checked: boolean;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  id: string;
  children: React.ReactNode;
}
// (ev: React.ChangeEvent<HTMLSelectElement>) => void;

function Checkbox({
  checked,
  onChange,
  disabled = false,
  id,
  children,
}: CheckboxPropsI) {
  return (
    <StyledCheckbox>
      <input
        type='checkbox'
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={!disabled ? id : ''}>{children}</label>
    </StyledCheckbox>
  );
}

export default Checkbox;
