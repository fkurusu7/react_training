import styled, { css } from 'styled-components';

// const Form_V1 = styled.form`
//   ${(props) =>
//     props.type !== 'modal' &&
//     css`
//       padding: 2.4rem 4rem;

//       /* Box */
//       background-color: var(--color-grey-0);
//       border: 1px solid var(--color-grey-100);
//       border-radius: var(--border-radius-md);
//     `}

//   ${(props) =>
//     props.type === 'modal' &&
//     css`
//       width: 80rem;
//     `}

//   overflow: hidden;
//   font-size: 1.4rem;
// `;

type ModalTypes = 'modal' | 'regular';
type ModalProps = { type?: ModalTypes };

const types = {
  modal: css`
    width: 80rem;
  `,
  regular: css`
    padding: 2.4rem 4rem;
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
  `,
};

const Form = styled.form<ModalProps>`
  overflow: hidden;
  font-size: 1.4rem;

  ${(props) => types[props.type || 'regular']}
`;

export default Form;
