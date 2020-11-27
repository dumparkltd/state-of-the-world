import styled from 'styled-components';
import Button from './Button';

// prettier-ignore
export default styled(Button)`
  color: ${({ theme }) => theme.global.colors.white};
  background-color: ${({ theme, color }) => theme.global.colors[color || 'dark-4']};
  &:hover {
    color: ${({ theme }) => theme.global.colors.white};
    background-color:
    ${({ theme, disabled }) => theme.global.colors[disabled ? 'dark' : 'buttonPrimaryHover']};
}
  &:active {
    color: ${({ theme }) => theme.global.colors.white};
    background-color:
    ${({ theme }) => theme.global.colors.buttonPrimaryHover};
}
  &:focus {
    color: ${({ theme }) => theme.global.colors.white};
    background-color: ${({ theme, color }) => theme.global.colors[color || 'buttonPrimaryHover']};
}
  &:visited {
    color: ${({ theme }) => theme.global.colors.white};
    background-color:
    ${({ theme }) => theme.global.colors.buttonPrimaryHover};
}
`;
