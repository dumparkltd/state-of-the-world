import React from 'react';
import styled from 'styled-components';
import { Button } from 'grommet';

const OptionButton = React.forwardRef((props, ref) => (
  <Button plain {...props} ref={ref} />
));
// prettier-ignore
export default styled(OptionButton)`
  border-top: 1px solid ${({ theme }) => theme.global.colors.border.light};
  border-bottom: 1px solid transparent;
  padding: 8px 12px;
  position: relative;
  background: transparent;
  font-weight: ${({ isActive }) => isActive ? 700 : 400};
  border-left: 4px solid
    ${({ theme, inFocus }) =>
    inFocus ? theme.global.colors.brandDarker : 'transparent'};
  cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')} !important;
  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.global.colors.border.light};
  }
  &:hover {
    /* font-weight: 600; */
    color: ${({ theme, isActive }) => isActive ? theme.global.colors.text.light : theme.global.colors.brand};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 10px 16px 10px 12px;
  }
`;
