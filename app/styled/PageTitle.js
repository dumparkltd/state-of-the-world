import React from 'react';
import { Heading } from 'grommet';
import styled from 'styled-components';

// prettier-ignore
const Styled = styled(Heading)`
  font-size: ${({ theme, level = 1 }) => theme.heading.level[level].small.size};
  line-height: ${({ theme, level = 1 }) => theme.heading.level[level].small.height};
  font-weight: 700;
  color: ${({ dark, theme }) => theme.global.colors.text[dark ? 'light' : 'dark']};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    font-size: ${({ theme, level = 1 }) => theme.heading.level[level].medium.size};
    line-height: ${({ theme, level = 1 }) => theme.heading.level[level].medium.height};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    font-size: ${({ theme, level = 1 }) => theme.heading.level[level].large.size};
    line-height: ${({ theme, level = 1 }) => theme.heading.level[level].large.height};
  }
`;
export default props => <Styled margin="none" responsive={false} {...props} />;
