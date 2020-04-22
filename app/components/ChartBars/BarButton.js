import styled from 'styled-components';
import Button from 'styled/ButtonPlain';

// prettier-ignore
export default styled(Button)`
  color: ${({ color, theme }) => color
    ? theme.global.colors[color]
    : theme.global.colors['dark-1']};
  padding: 0;
  position: relative;
  &:hover {
  }
  &:focus {
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
  }
`;
