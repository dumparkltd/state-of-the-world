import styled from 'styled-components';

// prettier-ignore
export default styled.button`
  display: inline-block;
  padding: 0;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')} !important;
  font-size: 1em;
  touch-action: manipulation;
  user-select: none;
  background-image: none;
  border: none;
  border-radius: 0;
  color: ${({ theme, disabled }) => disabled ? theme.global.colors.disabled : theme.global.colors.text.light};
  background-color: transparent;
  text-decoration: none;
  text-align: left;
  &:hover {
    color: ${({ theme, disabled }) => disabled ? theme.global.colors.disabled : theme.global.colors.text.light};
    background-color: transparent;
  }
  &:active {
    color: ${({ theme }) => theme.global.colors.text.light};
    background-color: transparent;
  }
  &:visited {
    color: ${({ theme }) => theme.global.colors.text.light};
    background-color: transparent;
  }
  &:focus {
    color: ${({ theme }) => theme.global.colors.brandDark};
    background-color: transparent;
    box-shadow: none;
    border-radius: 0;
    outline: none;
  }
`;
