import styled from 'styled-components';
import Button from './Button';

// prettier-ignore
export default styled(Button)`
  color: ${({ theme }) => theme.global.colors.white};
  background-color: ${({ theme, color }) => theme.global.colors[color || 'dark-4']};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')} !important;
  &:hover {
    color: ${({ theme }) => theme.global.colors.white};
    background-color:
    ${({ theme, disabled, color }) => theme.global.colors[disabled ? color || 'dark-4' : color || 'dark-3']};
    opacity: ${({ color, disabled }) => (color && !disabled) ? 0.8 : 1};
}
  &:active {
    color: ${({ theme }) => theme.global.colors.white};
    background-color:
    ${({ theme, disabled, color }) => theme.global.colors[disabled ? color || 'dark-4' : color || 'dark-3']};
}
  &:focus {
    color: ${({ theme }) => theme.global.colors.white};
    background-color:
    ${({ theme, disabled, color }) => theme.global.colors[disabled ? color || 'dark-4' : color || 'dark-3']};
}
  &:visited {
    color: ${({ theme }) => theme.global.colors.white};
    background-color:
    ${({ theme }) => theme.global.colors['dark-3']};
}
`;
