import styled, { css } from 'styled-components';

// Define a union type for valid heading types
type HeadingType = 'h1' | 'h2' | 'h3';

type HeadingProps = {
  // Using $ prefix for transient props
  // $type?: HeadingType;
  as?: HeadingType;
};

// Style definitions for each heading type
const headingStyles: Record<HeadingType, ReturnType<typeof css>> = {
  h1: css`
    font-size: 3rem;
    font-weight: 600;
  `,
  h2: css`
    font-size: 2rem;
    font-weight: 600;
  `,
  h3: css`
    font-size: 1.8rem;
    font-weight: 500;
  `,
};

const Heading = styled.h1<HeadingProps>`
  ${(props) => {
    const headingType = props.as as HeadingType;
    return headingStyles[headingType || 'h3'];
  }}
`;

export default Heading;
