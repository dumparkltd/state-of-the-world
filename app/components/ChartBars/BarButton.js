import styled from 'styled-components';
import Button from 'styled/ButtonPlain';

// prettier-ignore
export default styled(Button)`
  color: ${({ theme }) => theme.global.colors['dark-1']};
  padding: 0;
  position: relative;
  cursor: ${({ as }) => as === 'div' ? 'default !important' : 'pointer'};
  &:hover {
    color: ${({ theme }) => theme.global.colors['dark-1']};
  }
`;
