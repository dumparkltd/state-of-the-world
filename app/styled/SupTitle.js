import React from 'react';
import { Text } from 'grommet';
import styled from 'styled-components';

// prettier-ignore
const Styled = styled(p => <Text size="small" {...p} />)`
  color: ${({ dark, theme }) => theme.global.colors.text[dark ? 'light' : 'dark']};
  font-weight: 600;
  text-transform: uppercase;
`;
export default props => <Styled {...props} />;
