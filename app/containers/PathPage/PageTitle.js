import React from 'react';
import { Heading } from 'grommet';
import styled from 'styled-components';

// prettier-ignore
const Styled = styled(Heading)`
  font-size: 24px;
  line-height: 30px;
  font-weight: 700;
  color: ${({ theme }) => theme.global.colors.text.light};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    font-size: 36px;
    line-height: 40px;
  }
`;
export default props => <Styled margin="none" responsive={false} {...props} />;
