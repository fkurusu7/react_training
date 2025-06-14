import styled, { css } from 'styled-components';

type RowType = 'horizontal' | 'vertical';

type RowProps = {
  type?: RowType;
};

const rowStyles = {
  horizontal: css`
    justify-content: space-between;
    align-items: center;
  `,

  vertical: css`
    flex-direction: column;
    gap: 1.6rem;
  `,
};

const Row = styled.div<RowProps>`
  display: flex;

  ${(props) => rowStyles[props.type || 'vertical']}
`;

export default Row;
